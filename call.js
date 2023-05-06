function _call(fn, context, ...args) {
  context.fn = fn;
  let result = context.fn(...args);
  delete context.fn;

  return result;
}
