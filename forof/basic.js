// let colors = ["red", "green", "blue"];

// for (let i = 0, len = colors.length; i < len; i++) {
//   console.log(colors[i]);
// }

/**
 * 所谓迭代器，其实就是一个具有 next() 方法的对象，
 * 每次调用 next() 都会返回一个结果对象，该结果对象有两个属性，
 * value 表示当前的值，done 表示遍历是否结束。
 *
 * next() 方法中是个闭包 保留了对原数据结构的引用。
 */
function createIterator(items) {
  let i = 0;
  return {
    next: function () {
      let done = i >= items.length;
      const value = !done ? items[i++] : undefined;

      return {
        done,
        value,
      };
    },
  };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

/**
 * 其实一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
 * 数组 类数组对象 字符串 Set Map generator对象
 *
 * map 对象的迭代器对象
 * map.keys()
 * map.values()
 * map.entries()
 *
 */
const obj = {
  value: 1,
};

obj[Symbol.iterator] = function () {
  return createIterator([4, 5, 6]);
};

// for (value of obj) {
//   console.log(value);
// }

/**
 * 模拟实现forOf
 */
function forOf(obj, cb) {
  if (typeof obj[Symbol.iterator] !== "function")
    throw new TypeError(obj + "is not iterable");
  if (typeof cb !== "function") throw new TypeError("cb must be callable");

  // 获取obj的Symbol.iterator属性 获取迭代器对象
  const iterator = obj[Symbol.iterator]();
  let result = iterator.next();
  while (!result.done) {
    cb(result.value);
    result = iterator.next();
  }
}

forOf(obj, (e) => console.log(e));
