/**
 * 实现类的继承
 */
function _extend(childFn, parentFn) {
  childFn.prototype = new parentFn();
}
