/**
 * 基础版本
 *
 * 参考链接：https://www.zhihu.com/tardis/zm/art/144058361?source_id=1003
 * 
 * Promise有一些基本的规则和特点:
1. 一个promise的状态只能从pending变为fulfilled或rejected,不能逆转。
2. then方法的回调函数会在promise状态变为fulfilled或rejected后被调用。
3. then方法接受的两个回调函数的名字是then(onFulfilled, onRejected),第一个回调在fulfilled状态下调用,第二个回调在rejected状态下调用。
4. 如果没有输入onFulfilled或onRejected回调函数,promise的状态变为fulfilled时then返回的新promise状态也变为fulfilled,返回值同样变为fulfilled的值;如果输入的不是函数,忽略,同样返回fulfilled状态和值。
5. 如果onFulfilled或onRejected抛出异常,返回的新promise会变为rejected状态,并抛出相同的错误。
6. then方法是异步的,回调函数要等到executor函数执行完,promise的状态发生变化时才会被调用。
7. 同一个promise可被多次then,并且会注册多个回调函数,这些回调函数会按照promise状态改变的顺序执行。
8. promise的then方法返回一个promise,方便链式调用,每个then都会返回一个新的promise,并且产生的新promise的fulfilled状态是由上一个promise的回调返回的值决定的。
9. 如果返回值x是一个promise,会等待这个promise状态变为fulfilled,并将resolve的值作为这个then返回的新promise的fulfilled状态。
10. 如果返回值x是一个对象或者函数,会尝试获取它的then方法。如果有就当作promise来对待,并调用它的then方法。如果没有就当作普通值来对待。
11. catch方法是.then(null, onRejected)的别名,用于指定promise的失败回调。
12. finally方法用于指定不管promise最后状态如何都会执行的操作。
13. promise.all方法用于将多个promise实例包装成一个新的promise实例。
这些规则和特点构成了Promise强大而又灵活的功能。熟练掌握Promise有助于编写异步代码和编写基于Promise的库。
 * */
class funPromise {
  // pending fulfilled rejected
  status = "pending";
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];
  val = "";
  error = "";

  constructor(executor) {
    // TODO: executor 的this指向问题
    executor.call(this, this.resolve, this.reject);
  }

  resolve(val) {
    if (this.status !== "pending") return;
    this.status = "fulfilled";
    this.val = val;
    // Q: resolve 的callback 和 reject的callback 是否相同
    // resolve 中执行队列中回调
    this.onFulfilledCallbacks.forEach((cb) => cb());
  }

  reject(err) {
    if (this.status !== "pending") return;
    this.status = "rejected";
    this.error = err;
    this.onRejectedCallbacks.forEach((cb) => cb());
  }

  // onFulfilled 函数
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let nextPromise = new funPromise((resolve, reject) => {
      if (this.status === "pending") {
        this.onFulfilledCallbacks.push(() => {
          const x = onFulfilled(this.val);
          resolvePromise(nextPromise, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          reject(onRejected(this.error));
        });
      }

      if (this.status === "fulfilled") {
        try {
          resolve(onFulfilled(this.val));
        } catch (e) {
          reject(e);
        }
        return;
      }

      if (this.status === "rejected") {
        try {
          reject(onRejected(this.error));
        } catch (e) {}
      }
    });

    return nextPromise;
  }
}

function resolvePromise(nextPromise, x, resolve, reject) {
  if (nextPromise === x) {
    reject(new Error("infinity loops there"));
  }

  if (x && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      then.call(
        x,
        (val) => {
          resolvePromise(nextPromise, val, resolve, reject);
        },
        (err) => {
          reject(err);
        }
      );
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}
