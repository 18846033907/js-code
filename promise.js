// 实现 Promise 需要完全读懂 Promise A+ 规范，不过从总体的实现上看，有如下几个点需要考虑到：

// then 需要支持链式调用，所以得返回一个新的 Promise；
// 处理异步问题，所以得先用 onResolvedCallbacks 和 onRejectedCallbacks 分别把成功和失败的回调存起来；
// 为了让链式调用正常进行下去，需要判断 onFulfilled 和 onRejected 的类型；
// onFulfilled 和 onRejected 需要被异步调用，这里用 setTimeout 模拟异步；
// 处理 Promise 的 resolve；
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
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

  then(onFulfilled, onRejected) {
      console.log( typeof onFulfilled)
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
            onFulfilled;
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallback.push(() => {
          try {
            onRejected;
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
};

const promise = new MyPromise((resolve, reject) => {
  resolve('succ')
})
 
promise.then().then().then(value => console.log(value))

