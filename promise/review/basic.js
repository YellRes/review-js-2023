class promiseFree {
  static PENDING = "PENDING";
  static FULFILLED = "FULFILLED";
  static REJECTED = "REJECTED";

  status = PENDING;
  val = "";
  err = "";
  onfulfilledCallBack = [];
  onRejectedCallBack = [];

  constructor(executor) {
    const resolve = (res) => {
      if (this.status === promiseFree.PENDING) {
        this.status = promiseFree.FULFILLED;
        this.val = res;
        this.onfulfilledCallBack.forEach((cb) => cb());
      }
    };
    const reject = (err) => {
      if (this.status === promiseFree.PENDING) {
        this.status = promiseFree.REJECTED;
        this.err = err;
        this.onRejectedCallBack.forEach((cb) => cb());
      }
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let nextPromise = new promiseFree((nextResolve, nextReject) => {
      if (this.status === promiseFree.PENDING) {
        this.onfulfilledCallBack.push(() => {
          try {
            let x = onFulfilled(this.val);
            resolveThenCallback(nextPromise, x, nextResolve, nextReject);
          } catch (e) {
            nextReject(e);
          }
        });

        this.onRejectedCallBack.push(() => {
          try {
            let x = onRejected(this.err);
            resolveThenCallback(nextPromise, x, nextResolve, nextReject);
          } catch (e) {
            nextReject(e);
          }
        });
      }

      if (this.status === promiseFree.FULFILLED) {
        try {
          let x = onFulfilled(this.val);
          resolveThenCallback(nextPromise, x, nextResolve, nextReject);
        } catch (e) {
          nextReject(e);
        }
      }

      if (this.status === promiseFree.REJECTED) {
        try {
          let x = onRejected(this.err);
          resolveThenCallback(nextPromise, x, nextResolve, nextReject);
        } catch (e) {
          nextReject(e);
        }
      }
    });

    return nextPromise;
  }

  static resolve() {}

  static reject() {}

  static all() {}

  static race() {}
}

const resolveThenCallback = (nextPromise, x, nextResolve, nextReject) => {
  // 返回值是当前promise 导致 promise 内部状态永远不会变化
  if (nextPromise === x) {
    nextReject(new Error("loop promise"));
  }

  if (x && x.then && (typeof x === "function" || typeof x === "object")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (res) => {
            // 返回的promise的状态和  x的状态一致
            resolveThenCallback(nextPromise, res, nextPromise, nextReject);
          },
          (err) => {
            nextReject(err);
          }
        );
      } else {
        nextResolve(x);
      }
    } catch (e) {
      nextReject(e);
    }
  } else {
    nextResolve(x);
  }
};

let p = new Promise((res, rej) => {
  setTimeout(() => {
    rej("first level");
  }, 3000);
});

p.then(
  (res) => {},
  (err) => {
    // TODO: think twice
    let p = new Promise((res, rej) => {
      setTimeout(() => {
        rej("second level");
      }, 3000);
    });

    return p;
  }
).then((res) => {
  console.log(res);
});
