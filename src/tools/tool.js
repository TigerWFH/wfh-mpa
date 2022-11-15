// import { v4 as uuidv4 } from 'uuid';
const interceptEvent = ['click', 'dbclick'];

const mm = new Map();

// 拦截XMLHttpRequest
const nativeOpen = XMLHttpRequest.prototype.open;
const nativeSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function (...args) {
  const { method, url } = args;
  console.log('请求方法和地址======>', args);
  nativeOpen.call(this, ...args);
};
XMLHttpRequest.prototype.send = function (body) {
  console.log('请求body======>', body);
  nativeSend.apply(this, body);
};

if (window.addEventListener) {
  const nativeAddEventListener = EventTarget.prototype.addEventListener;
  //   intercept
  EventTarget.prototype.addEventListener = function (event, handler, options) {
    console.log('add========>', event, handler, options, this);
    let fn = null;
    if (typeof handler !== 'function') {
      throw new Error('callback is not function');
    }
    // 改写handler
    if (interceptEvent.includes(event)) {
      fn = function (...args) {
        // 自定义函数
        // const uuid = uuidv4();
        // let capture = false;
        // if (typeof options === 'boolean') {
        //   capture = options;
        // } else if (Object.prototype.toString(options) === '[object Object]') {
        //   capture = options.capture;
        // }
        // if (!capture) {
        // sessionStorage.setItem('uuid', uuid);
        // handler.yanpin = fn;
        // console.log(`触发了${event}, uuid=`, uuid, event);
        // }

        handler.call(this, ...args);
      };
    } else {
      fn = handler;
    }
    // 存储改写的handler
    mm.set(handler, fn);
    // 注册
    nativeAddEventListener.call(this, event, fn, options);
  };

  // 卸载函数
  const nativeRemoveEventLisener = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.removeEventListener = function (
    event,
    handler,
    options
  ) {
    const fn = mm.get(handler);
    mm.delete(handler);
    console.log('remove=====>', mm.size);
    nativeRemoveEventLisener(event, fn, options);
  };
}
