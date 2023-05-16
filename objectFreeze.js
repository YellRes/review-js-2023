// 对象不可拓展 无法添加新的属性
// 属性无法修改
// setter 方法失效
// 对象的属性值为对象 属性值指向的对象不受影响
// freeze() 返回冻结的对象
function objectFreeze(obj) {
  if (typeof obj !== "object") throw new Error(obj + "类型必须要是一个object");
  // 不可拓展 属性不可以删除 但是可以修改
  Object.seal(obj);
  for (let key of Object.keys(obj)) {
    Object.defineProperty(obj, key, {
      writable: false,
    });
  }
}

{
  let obj = {
    name: "yellRes",
    info: {
      age: 18,
    },
  };
  objectFreeze(obj);
  console.log(obj);
}

/**
 * 第二版
 * obj 上面的原型属性也不能修改
 */

{
  /**
   * Thinking:
   * Q: Object.keys() 能获取到对象的symbol属性吗
   * A: 获取不到  Object.keys() 获取对象上面可枚举的属性(对象自身上面的属性)  使用 Object.getOwnPropertySymbols() 获取所有的symbol属性。
   * for in 中会获取到对象自身和对象继承的属性 通过Object.hasOwnProperty()来过滤掉继承的属性
   *
   * Q: Object.getOwnPropertySymbols() 原理是什么？
   * A: TODO:
   */
  const textSymbol = Symbol("text");
  const obj = {
    [textSymbol]: "text",
    name: "yellRes",
  };

  // console.log(Object.keys(obj));
  console.log(Object.getOwnPropertySymbols(obj)[0] === textSymbol); // the same symbol
  // => true

  /**
   * Q:Object.preventExtensions()  Object.seal() Object.freeze()
   * A: Object.preventExtensions(obj)
   * obj不可以添加新属性
   *
   * Object.seal(obj)
   * obj不可以添加新属性
   * obj原有属性不可以配置
   * 但obj原有属性可以写就可以改变
   *
   * 但是你不能将属性重新定义成为访问器属性
   * Object.defineProperty(obj, 'foo', {
   *  get: function() { return 'g'; }
   * }); // throws a TypeError
   *
   * Object.freeze(obj)
   * obj不可以添加新属性
   * obj原有属性不可以配置
   */

  /**
   * Object.defineProperty(obj, propertyA)
   * Q: 当propertyA不在obj上，在obj的原型上面时候，会把obj的原型上属性配置给修改了吗
   * A: 不会  此时propertyA会被赋值到obj上面
   */

  {
    let fun1 = function () {};
    fun1.prototype.functionName = "function1";

    let person = new fun1();
    // let personDescriptor = Object.getOwnPropertyDescriptor(person.functionName);
    // personDescriptor.writable = false;
    Object.defineProperty(person, "functionName", {});

    person.functionName = "yellRes";
    console.log(person, "person");
  }

  {
    //Q: 此外，冻结一个对象后该对象的原型也不能被修改
    let func1 = function () {};
    func1.prototype.name = "func1";

    let person = new func1();
    let personF = Object.freeze(person);
    // personF.name   ==> func1

    // TODO: ? 此外，冻结一个对象后该对象的原型也不能被修改 如何理解？
    // func1.prototype.name = 'func2' 成功执行
  }
}
