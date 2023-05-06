/**
 *
 * 1. 创建一个对象obj
 * 2. obj 的原型链指向 fn的 prototype
 * 3. fn中的this 指向obj 执行fn
 * 4. fn 的返回值是否为对象 若是对象 直接返回 若不是对象返回 obj
 */

function _new(fn, ...args) {
  let obj = Object.create(fn.prototype || {});
  let res = fn.apply(obj, args);

  return res && typeof res === "object" ? res : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p = new Person("yellres", 26);
const p1 = _new(Person, "yellres", 30);

console.log(p, "ppppppppppp");
console.log(p1, "p1p1p1pp1p1p");
