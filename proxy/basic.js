{
  // Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。
  var obj = new Proxy(
    {},
    {
      get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}`);
        return Reflect.get(target, propKey, receiver);
      },
      set: function (target, propKey, receiver) {
        console.log(`setting ${propKey}`);
        return Reflect.set(target, propKey, receiver);
      },
    }
  );

  obj.count = 1;

  ++obj.count;
  console.log(obj.count);
}

{
  var proxy = new Proxy(
    {},
    {
      get: function (target, propKey) {
        return 35;
      },
    }
  );

  console.log(proxy.time);
  console.log(proxy.name);

  //   var object = {
  //     proxy: new Proxy(
  //       {},
  //       {
  //         get: function (target, propKey) {
  //           return 35;
  //         },
  //       }
  //     ),
  //   };

  //   console.log(object.name);
  // proxy 作为原型对象
  const proxy4Prototype = new Proxy(
    {},
    {
      get: function (target, propKey) {
        return 35;
      },
    }
  );

  let obj = Object.create(proxy4Prototype);
  console.log(obj.name);
  console.log(obj.age);

  obj.info = "我不是35";
  console.log(obj.info);

  // proxy的拦截器函数
  var handler = {
    get: function (target, name) {
      if (name === "prototype") {
        return Object.prototype;
      }

      return "Hello, " + name;
    },

    apply: function (target, thisBinding, args) {
      return args[1];
    },

    // 只有apply的属性  没有call属性
    // call: function (target, thisBinding, args) {
    //   return args[1];
    // },

    construct: function (target, args) {
      return { value: args[1] };
    },
  };

  var fProxy = new Proxy(function (x, y) {
    return x + y;
  }, handler);

  //   console.log(fProxy(1, 2));
}

{
  /**
   * proxy 实例方法
   */
  // get()
  var person = {
    name: "张三",
  };

  var proxy = new Proxy(person, {
    get: function (target, propKey) {
      if (propKey in target) {
        return target[propKey];
      } else {
        throw new ReferenceError(`Prop name ${propKey} does not exist `);
      }
    },
  });

  //   console.log(proxy.name);
  //   console.log(proxy.age);

  // 可以被继承
  const obj = Object.create(proxy);
  console.log(obj.foo);

  // 具体案例 通过读取 数组负数的索引
  function createArray(...elements) {
    let handler = {
      get(target, propKey, receiver) {
        let index = Number(propKey);
        if (index < 0) {
          propKey = String(target.length + index);
        }

        return Reflect.get(target, propKey, receiver);
      },
    };

    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
  }

  let arr = createArray("a", "b", "c", "d");
  console.log(arr[-1]);

  // 属性
  var pipe = function (value) {
    var funcStack = [];
    var oProxy = new Proxy(
      {},
      {
        get: function (pipeObject, fnName) {
          if (fnName === "get") {
            return funcStack.reduce((val, cur) => {
              return cur(val);
            }, value);
          }
          funcStack.push(obj[fnName]);
          return oProxy;
        },
      }
    );

    return oProxy;
  };
  let obj = {};
  obj.double = (n) => n * 2;
  obj.pow = (n) => n * n;
  obj.reverseInt = (n) => n.toString().split("").reverse().join("");

  console.log(
    pipe(3).double.pow.reverseInt.get,
    "pipe(3).double.pow.reverseInt.get;"
  );

  // get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例
  const proxy = new Proxy(
    {},
    {
      get: function (target, key, receiver) {
        return receiver;
      },
    }
  );

  console.log(proxy.info === proxy, "proxy.info === proxy");

  // receiver 发生读取属性的那个对象
  const proxy = new Proxy(
    {},
    {
      get: function (target, key, receiver) {
        return receiver;
      },
    }
  );

  const d = Object.create(proxy);
  console.log(d.a === d);
}

{
  // set
  // 设置属性为不大于200的整数
  let validator = {
    set: function (obj, prop, value) {
      if (prop === "age") {
        if (!Number.isInteger(value)) {
          throw new TypeError("the age is not an integer");
        }

        if (value > 200) {
          throw new RangeError("the age seems invalid");
        }
      }

      obj[prop] = value;
      return true;
    },
  };

  let person = new Proxy({}, validator);
  person.age = 100;
  //   person.age = "yellres";
  person.age = 2000;

  // set的第三个参数
  const handler = {
    set: function (obj, prop, value, receiver) {
      obj[prop] = receiver;
      return true;
    },
  };

  const proxy = new Proxy({}, handler);
  const myObj = {
    name: "nameless",
  };
  Object.setPrototypeOf(myObj, proxy);
  myObj.name = "yellres";
  console.log(myObj.name === myObj);

  myObj.ghost = "korha";
  console.log(myObj.ghost === myObj);
}

{
  // apply()
  //   var handler = {
  //     apply(target, ctx, args) {
  //       return Reflect.apply(...arguments);
  //     },
  //   };

  const target = function () {
    return "i am the target";
  };

  var handler = {
    apply: function () {
      return "i am the proxy";
    },
  };

  var p = new Proxy(target, handler);
  console.log(p());

  const twice = {
    apply(target, ctx, args) {
      return Reflect.apply(...arguments) * 2;
    },
  };
}
