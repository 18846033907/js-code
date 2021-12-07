// 实现 Promise 需要完全读懂 Promise A+ 规范，不过从总体的实现上看，有如下几个点需要考虑到：

// then 需要支持链式调用，所以得返回一个新的 Promise；
// 处理异步问题，所以得先用 onResolvedCallbacks 和 onRejectedCallbacks 分别把成功和失败的回调存起来；
// 为了让链式调用正常进行下去，需要判断 onFulfilled 和 onRejected 的类型；
// onFulfilled 和 onRejected 需要被异步调用，这里用 setTimeout 模拟异步；
// 处理 Promise 的 resolve；
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise1 {
  constructor(executor) {
    // this = this;
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    // 存储成功回调函数
    this.onFulfilledCallback = [];
    // 存储失败回调函数
    this.onRejectedCallback = [];

    const resolve = (val) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = val;
        this.onFulfilledCallback.forEach((fn) => {
          fn(val);
          this.onFulfilledCallback.shift();
        });
      }
    };
    const reject = (val) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = val;
        this.onRejectedCallback.forEach((fn) => {
          fn(val);
          this.onRejectedCallback.shift();
        });
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  static resolve(parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    return new MyPromise((resolve) => resolve(parameter));
  }

  static reject(reason) {
    if (reason instanceof MyPromise) {
      return parameter;
    }
    return new MyPromise(resolve, (reject) => reject(reason));
  }

  static all(pArr) {
    if (Object.prototype.toString.call(pArr) !== "[object Array]") {
      throw new TypeError("this is not an array");
    }
    let result = [],
      index = 0;
    return new MyPromise((resolve, reject) => {
      pArr.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (val) => {
            index++;
            result[i] = val;
            if (index === pArr.length) {
              resolve(result);
            }
          },
          (err) => reject(err)
        );
      });
    });
  }

  static race(pArr) {
    if (Object.prototype.toString.call(pArr) !== "[object Array]") {
      throw new TypeError("this is not an array");
    }
    return new MyPromise((resolve, reject) => {
      pArr.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (val) => {
            resolve(val);
          },
          (err) => reject(err)
        );
      });
    });
  }

  static allSettled(pArr) {
    if (Object.prototype.toString.call(pArr) !== "[object Array]") {
      throw new TypeError("this is not an array");
    }
    let result = [];
    return new MyPromise((resolve, reject) => {
      pArr.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (val) => {
            result.push({ status: "fulfilled", value: val });
          },
          (err) => {
            result.push({ status: "rejected", reason: err })
          }
        );
      });
      console.log(result)
    });
  }

  static any(pArr) {
    if (Object.prototype.toString.call(pArr) !== "[object Array]") {
      throw new TypeError("this is not an array");
    }
    let index = 0,
      result = [];
    return new MyPromise((resolve, reject) => {
      pArr.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (val) => {
            resolve(val);
          },
          (err) => {
            index++;
            result[i] = err;
            if (index === pArr.length) {
              reject(new AggregateError("All promises were rejected"));
            }
          }
        );
      });
    });
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function" ? onRejected : (reason) => reason;

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallback.push(() => {
          try {
            const x = onRejected(thist.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(
      new TypeError("The promise and the return value are the same")
    );
  }

  if (typeof x === "object" || typeof x === "function") {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}
