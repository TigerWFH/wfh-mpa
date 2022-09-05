import { v4 as uuidv4 } from 'uuid';
const interceptEvent = ['click', 'dbclick'];

const mm = new Map();

if (window.addEventListener) {
  const nativeAddEventListener = EventTarget.prototype.addEventListener;
  //   intercept
  EventTarget.prototype.addEventListener = function (event, handler, options) {
    let fn = handler;
    if (typeof handler !== 'function') {
      throw new Error('callback is not function');
    }
    if (interceptEvent.includes(event)) {
      fn = function (...args) {
        // 自定义函数
        const uuid = uuidv4();
        sessionStorage.setItem('uuid', uuid);
        handler.yanpin = fn;
        handler.call(this, ...args);
        console.log(`触发了${event}, uuid=`, uuid, event);
      };
    }
    let config = {};
    if (typeof options === 'boolean') {
      config.capture = options;
    } else if (Object.prototype.toString(options) === '[object Object]') {
      config = { ...options };
    }
    mm.set(handler, fn);
    nativeAddEventListener(event, fn, {
      capture: false
    });
  };

  // 卸载函数
  const nativeRemoveEventLisener = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.removeEventListener = function (
    event,
    handler,
    options
  ) {
    const fn = mm.get(handler);
    console.log('remove=====>', mm.size);
    nativeRemoveEventLisener(event, handler.yanpin, options);
  };
}
