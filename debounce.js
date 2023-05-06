/**
 *
 * immediate 是否立即执行一次
 */
const _debounce = (fn, timeout, immediate) => {
  let timer = null;
  let that = this;

  return function (...args) {
    if (timer) clearTimeout(timer);

    if (immediate) {
      if (!timer) fn.call(that, ...args);
      timer = setTimeout(() => {
        timer = null;
        fn.call(that, ...args);
      }, timeout);
    } else {
      timer = setTimeout(() => {
        fn.call(that, ...args);
      }, timeout);
    }
  };
};
