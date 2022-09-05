import { v4 as uuidv4 } from 'uuid';

const interceptEvent = ['click', 'dbclick'];

function getGlobalObject() {
  return typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {};
}

const _window = getGlobalObject();
const EventTargetProto = _window.EventTarget.prototype;
class EventListener {
  constructor(fn) {
    this.reWriteAddEventListener(fn);
    this.reWriteRemoveEventListener();
    return this;
  }

  // 重写addEventListener
  reWriteAddEventListener(fn) {
    const oAdd = EventTargetProto.addEventListener;
    const nAdd = function () {
      const listener = arguments[1];
      const newListener = function (e) {
        fn.call(this, e, listener);
        return listener.call(this, e);
      };

      // 原函数关联新函数
      listener._catchFunction = newListener;
      return newListener;
    };
    EventTargetProto.addEventListener = function (type) {
      if (!interceptEvent.includes(type)) {
        return oAdd.call(this, ...arguments);
      }
      return oAdd.call(this, type, nAdd.call(this, ...arguments));
    };
  }
  // 重写removeEventListener
  reWriteRemoveEventListener() {
    const oRemove = EventTargetProto.removeEventListener;
    const nRemove = function () {
      const listener = arguments[1];
      return (listener && listener._catchFunction) || listener;
    };

    EventTargetProto.removeEventListener = function (type) {
      if (!interceptEvent.includes(type)) {
        return oRemove.call(this, ...arguments);
      }
      return oRemove.call(this, type, nRemove.call(this, ...arguments));
    };
  }
}

_window._EventListener = EventListener;

const ins = new window._EventListener(function () {
  const uuid = uuidv4();
  sessionStorage.setItem('uuid', uuid);
  console.log('uuid=====>', uuid);
});

// // script脚本
// window.onload = function () {
//   function reWriteEventListener() {
//     if (window._EventListener) {
//       return new window._EventListener(function (event, listener) {
//         const { type } = event;
//         console.log('在事件触发之前先捕捉');
//         console.log(type, event, listener);
//       });
//     }
//   }

//   reWriteEventListener();
//   const btn = document.querySelector('#btn');
//   const handler = function (e) {
//     console.log('注册click回调', e);
//     setTimeout(() => {
//       console.log('开始移除监听器');
//       btn.removeEventListener('click', handler);
//     }, 200);
//   };
//   btn.addEventListener('click', handler);
// };
