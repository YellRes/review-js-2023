function _instanceof(instance, constructorF) {
  let result = false;

  while (Object.getPrototypeOf(instance) !== Object.prototype) {
    if (Object.getPrototypeOf(instance) === constructorF.prototype) {
      result = true;
      break;
    }
    instance = Object.getPrototypeOf(instance);
  }

  return result;
}

function C() {}
function D() {}
function E() {}

var c = new C();
D.prototype = new C();
var d = new D();
console.log(d instanceof C);

console.log(_instanceof(d, E));

/**
 * 对象A的 __proto__ == Object.getPrototypeOf(对象A)
 * 对象A hasOwnPrototype  A中自身的所有属性
 */
