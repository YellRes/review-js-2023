/**
 * 操作开始后 会立马执行
 */
const _throttle = (fn, timeout) => {
  let timer = 0;
  let that = this;

  return function (...args) {
    if (new Date().getTime() - timer.getTime() >= timeout) {
      fn.call(that, ...args);
      timer = new Date();
    }
  };
};

/**
 * 操作结束后 依旧会执行一次
 */
const _throttleSetTimeout = (fn, timeout) => {
  let timer = null;
  let that = this;
  return function (...args) {
    if (timer) return;

    timer = setTimeout(() => {
      timer = null;
      fn.call(that, args);
    }, timeout);
  };
};

const throttleSetTimeoutAndInfo = (fn, timeout) => {
  let timer = null;
  let that = this;

  let triggerTime = 0;

  return function (...args) {
    if (+new Date() - triggerTime > timeout) {
      fn.call(that, ...args);
    }
    triggerTime = +new Date();
    if (timer) return;
    // 点击时间大于 触发事件
    timer = setTimeout(() => {
      timer = null;
      fn.call(that, ...args);
    }, timeout);
  };
};

const _throttleLT = (fn, timeout, { leading, trailing }) => {
  let that = this;
  let timer = null;
  let lastTriggerTime = 0;
  let isLeadingTrigger = false;

  return function (...args) {
    // 开始触发事件
    if (leading) {
      if (+new Date() - lastTriggerTime >= timeout) {
        fn.call(that, ...args);
        isLeadingTrigger = true;
      } else {
        isLeadingTrigger = false;
      }
      lastTriggerTime = +new Date();
    }

    // 最后一次要触发事件
    if (trailing) {
      if (timer) return;

      timer = setTimeout(() => {
        timer = null;
        fn.call(that, ...args);
      }, timeout);
    } else {
      if (!timer) timer = +new Date();
      if (+new Date() - timer >= timeout) {
        if (!isLeadingTrigger) fn.call(that, ...args);
        timer = +new Date();
      }
    }
  };
};
