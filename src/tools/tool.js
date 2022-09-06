import { v4 as uuidv4 } from 'uuid';
const interceptEvent = ['click', 'dbclick'];

const mm = new Map();

if (window.addEventListener) {
  const nativeAddEventListener = EventTarget.prototype.addEventListener;
  //   intercept
  EventTarget.prototype.addEventListener = function (event, handler, options) {
    console.log('add========>', event, handler, options);
    let fn = handler;
    if (typeof handler !== 'function') {
      throw new Error('callback is not function');
    }
    if (interceptEvent.includes(event)) {
      fn = function (...args) {
        // 自定义函数
        const uuid = uuidv4();
        let capture = false;
        if (typeof options === 'boolean') {
          capture = options;
        } else if (Object.prototype.toString(options) === '[object Object]') {
          capture = options.capture;
        }
        if (!capture) {
          sessionStorage.setItem('uuid', uuid);
          handler.yanpin = fn;
          console.log(`触发了${event}, uuid=`, uuid, event);
        }

        handler.call(this, ...args);
      };
    }
    mm.set(handler, fn);
    nativeAddEventListener(event, fn, options);
  };

  // 卸载函数
  const nativeRemoveEventLisener = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.removeEventListener = function (
    event,
    handler,
    options
  ) {
    // const fn = mm.get(handler);
    // console.log('remove=====>', mm.size);
    // nativeRemoveEventLisener(event, handler.yanpin, options);
  };
}
