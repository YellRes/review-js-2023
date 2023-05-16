{
  class FunSet {
    keyObj = {};
    arr = [];
    constructor() {}

    add(val) {
      if (!this.keyObj[val]) {
        this.keyObj[val] = true;
        this.arr.push(val);
      }
    }

    delete(val) {
      this.forEach((item, index) => {
        if (item === val) {
          delete this.keyObj[val];
          this.arr.splice(index, 1);
        }
      });
    }

    has(val) {
      return this.keyObj[val];
    }

    clear() {
      this.arr = [];
      this.keyObj = {};
    }

    forEach(cb) {
      this.arr.forEach((item, index) => cb(item, index));
    }
  }
}

// 第一版
{
  class FunSet {
    _values = [];
    size = 0;

    constructor(data) {
      data &&
        data.forEach((item) => {
          this.add(item);
        });
    }

    add(value) {
      if (this._values.indexOf(val) === -1) {
        this._values.push(value);
        ++this.size;
      }

      return this;
    }

    has(value) {
      return this._values.indexOf(value) !== -1;
    }

    delete(value) {
      let targetIndex = this._values.indexOf(value);

      if (targetIndex !== -1) {
        let res = this._values[targetIndex];
        this._values.splice(targetIndex, 1);
        this.size--;

        return res;
      }
    }

    clear() {
      this._values = [];
      this.size = 0;
    }

    forEach(cbFn) {
      for (let i = 0; i < this._values.length; i++) {
        cbFn(this._values[i], this._values[i]);
      }
    }
  }
}

/**
 * 第二版
 * 1. 处理NaN字段
 * */
{
  class FunSet {
    _values = [];
    size = 0;

    static NaNSymbol = Symbol("NaN");
    static encodeVal = function (val) {
      return val !== val ? FunSet.NaNSymbol : val;
    };
    static decodeVal = function (val) {
      return val === FunSet.NaNSymbol ? NaN : val;
    };

    constructor(data) {
      data &&
        data.forEach((item) => {
          this.add(item);
        });
    }

    add(value) {
      if (this._values.indexOf(FunSet.encodeVal(value)) === -1) {
        this._values.push(FunSet.encodeVal(value));
        ++this.size;
      }

      return this;
    }

    has(value) {
      return this._values.indexOf(FunSet.encodeVal(value)) !== -1;
    }

    delete(value) {
      let targetIndex = this._values.indexOf(FunSet.encodeVal(value));

      if (targetIndex !== -1) {
        let res = this._values[targetIndex];
        this._values.splice(targetIndex, 1);
        this.size--;

        return res;
      }
    }

    clear() {
      this._values = [];
      this.size = 0;
    }

    forEach(cbFn) {
      for (let i = 0; i < this._values.length; i++) {
        cbFn(this._values[i], this._values[i]);
      }
    }
  }
  let set = new FunSet([1, 2, 3]);

  set.add(NaN);
  console.log(set.size); // 3

  set.add(NaN);
  console.log(set.size); // 3
}

/**
 * 第三版  迭代器
 * keys()
 * values()
 * entries()
 */

{
  function forOf(obj, cb) {
    if (typeof obj === "object" && typeof obj[Symbol.iterator] !== "function")
      throw new TypeError(obj + "is not iterable");

    if (typeof cb !== "function") throw new TypeError(cb + "is not callable");

    const iterator = obj[Symbol.iterator]();

    let result = iterator.next();
    while (!result.done) {
      cb(result.value);
      result = iterator.next();
    }
  }

  class FunSet {
    _values = [];
    size = 0;

    static NaNSymbol = Symbol("NaN");
    static encodeVal = function (val) {
      return val !== val ? FunSet.NaNSymbol : val;
    };
    static decodeVal = function (val) {
      return val === FunSet.NaNSymbol ? NaN : val;
    };

    constructor(data) {
      data &&
        forOf(data, (val) => {
          this.add(FunSet.encodeVal(val));
        });
    }

    add(value) {
      if (this._values.indexOf(FunSet.encodeVal(value)) === -1) {
        this._values.push(FunSet.encodeVal(value));
        ++this.size;
      }

      return this;
    }

    has(value) {
      return this._values.indexOf(FunSet.encodeVal(value)) !== -1;
    }

    delete(value) {
      let targetIndex = this._values.indexOf(FunSet.encodeVal(value));

      if (targetIndex !== -1) {
        let res = this._values[targetIndex];
        this._values.splice(targetIndex, 1);
        this.size--;

        return res;
      }
    }

    clear() {
      this._values = [];
      this.size = 0;
    }

    forEach(cbFn) {
      for (let i = 0; i < this._values.length; i++) {
        cbFn(this._values[i], this._values[i]);
      }
    }

    keys() {
      let createIterator = () => {
        let i = 0;

        return {
          next: () => {
            let value = i < this._values.length ? this._values[i] : undefined;
            let done = i < this._values.length ? false : true;
            i++;
            return {
              value,
              done,
            };
          },
        };
      };

      return {
        [Symbol.iterator]: createIterator,
      };
    }

    values() {}

    entries() {}
  }

  let ns = new FunSet(new Set([1, 2, 3, 4]));
  forOf(ns.keys(), (val) => console.log(val));
}
// const fs = new FunSet();
