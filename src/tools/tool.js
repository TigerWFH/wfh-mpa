import { v4 as uuidv4 } from 'uuid';
const interceptEvent = ['click', 'dbclick'];

if (window.addEventListener) {
  const old = EventTarget.prototype.addEventListener;
  //   intercept
  EventTarget.prototype.addEventListener = function (event, handler, options) {
    let fn = handler;
    if (typeof handler !== 'function') {
      return null;
    }
    if (interceptEvent.includes(event)) {
      fn = function (...args) {
        // 自定义函数
        const uuid = uuidv4();
        sessionStorage.setItem('uuid', uuid);
        console.log(`触发了${event}, uuid=`, uuid, event);
        handler(...args);
      };
    }

    old(event, fn, options);
  };
}
