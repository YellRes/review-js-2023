function objectCreate(obj) {
  function tool() {}
  tool.prototype = obj;

  let createdObj = new tool();

  return createdObj;
}
