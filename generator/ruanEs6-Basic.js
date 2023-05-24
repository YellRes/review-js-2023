/**
 * 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
 * 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
 */
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

let hw = helloWorldGenerator();

function* demo() {
  console.log("Hello" + (yield)); // OK
  console.log("Hello" + (yield 123)); // OK
}

let d = demo();
d.next();
d.next();
d.next();

function foo(str1, str2) {
  console.log(str1 + str2);
}
function* demo1() {
  foo(yield "a", yield "b");
  let input = yield;
}

{
  var myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  // Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

  function* gen() {
    // some code
  }

  var g = gen();

  g[Symbol.iterator]() === g;
}

{
  // yield 后面的表达式的值会 传入到迭代器生成值中
  // next() 方法传参 会被yield表达式的左边
  // next() 第一次调用传参会被忽略
  function* foo(x) {
    let y = 2 * (yield x + 1);
    let z = yield y / 3;
    return x + y + z;
  }

  var a = foo(5);
  console.log(a.next());
  console.log(a.next(10));
  console.log(a.next(10));
  console.log(a.next());

  //  next() 第一次传参就能使用
  function wrapper(g) {
    return function (...args) {
      let generatorObj = g(...args);
      generatorObj.next();
      return generatorObj;
    };
  }

  function* g() {
    console.log("hello, yield this", yield 8);
  }

  const obj = wrapper(g)();
  obj.next("first init");
}

{
  // for...of 循环
  // 可以自动遍历出 generator 中函数中yield中所有的值
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }

  for (let v of foo()) {
    console.log(v);
  }
  // 1, 2, 3, 4, 5

  // 这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

  // 斐波拉契数列
  function* fibonacci() {
    let [pre, cur] = [0, 1];

    while (true) {
      yield pre;
      [pre, cur] = [cur, pre + cur];
    }
  }

  function getValue() {
    for (let key of fibonacci()) {
      if (key > 1000) break;
      console.log(key);
    }
  }

  getValue();

  // 对象上面部署iterator接口

  function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
      yield [propKey, this[propKey]];
    }
  }

  let person = {
    name: "yellres",
    age: 18,
  };

  person[Symbol.iterator] = objectEntries;

  for (let [key, value] of person) {
    console.log(`${key}: ${value}`);
  }

  // 其他迭代器接口的案例
  function* numbers() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
  }

  // 扩展运算符
  [...numbers()]; // [1,2]

  // Array.from()
  Array.from(numbers()); // [1,2]

  // 解构赋值
  let [x, y] = numbers();

  // for ... of 循环
  for (let n of numbers()) {
    console.log(n);
  }
  // 1
  // 2
}

{
  // generator 中错误处理
  const g = function* () {
    try {
      yield;
    } catch (e) {
      console.log("内部捕获", e);
    }
  };

  const i = g();
  i.next();
  //   i.next();
  //   i.next();
  //   i.next();

  try {
    i.throw("a");
    i.throw("b");
  } catch (e) {
    console.log("外部捕获", e);
  }

  // 当遍历器没有执行 完成的时候 调用throw()方法 则会触发报错机制。
  // 此时若生成器内部有捕获机制则会被捕获

  {
    function* errorGen() {
      try {
        yield;
      } catch (e) {
        console.log("内部捕获", e);
      }
    }

    const e = errorGen();
    e.next();
    try {
      e.throw("inner"); // ==> 内部捕获 inner
      e.throw("inner"); // ==> 外部捕获 inner
      e.throw("inner"); // 从此向下 不会执行
      e.throw("inner"); //
    } catch (e) {
      console.log("外部捕获", e);
    }
  }

  // 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
  {
    const g = function* () {
      while (true) {
        yield;
        console.log("内部捕获", e);
      }
    };

    var i = g();
    i.next();

    try {
      i.throw("a");
      i.throw("b");
    } catch (e) {
      console.log("外部捕获", e);
    }
  }

  {
  }
}
