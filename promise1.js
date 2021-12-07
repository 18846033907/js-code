const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  constructor(excutor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    const resolve = (val) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = val;
        this.onFulfilledCallback.forEach((fn) => {
          fn(this.value);
        });
        // while (this.onFulfilledCallback.length>0) {
        //   this.onFulfilledCallback.shift()(this.value);
        // }
      }
    };
    const reject = (res) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = res;
        this.onRejectedCallback.forEach((fn) => {
          fn(this.reason);
        });
        // while (this.onRejectedCallback.length>0) {
        //   this.onRejectedCallback.shift()(this.reason);
        // }
      }
    };
    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  static resolve(param) {
    if (param instanceof MyPromise) {
      return param;
    }
    return new Promise((resolve, reject) => {
      resolve(param);
    });
  }
  static reject(param) {
    return new Promise((resolve, reject) => {
      reject(param);
    });
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
            result.push({ status: "rejected", reason: err });
          }
        );
      });
      resolve(result);
    });
  }
  static any(pArr) {
    if (Object.prototype.toString.call(pArr) !== "[object Array]") {
      throw new TypeError("this is not an array");
    }
    let index = 0;
    return new MyPromise((resolve, reject) => {
      pArr.forEach((p) => {
        MyPromise.resolve(p).then(
          (val) => {
            return resolve(val);
          },
          (err) => {
            index++;
            if (pArr.length === index) {
              reject(
                new Error(
                  "AggregateError: No Promise in Promise.any was resolved"
                )
              );
            }
          }
        );
      });
    });
  }
  static race(pArr) {
    if (Object.prototype.toString.call(pArr) !== "[object Array]") {
      throw new TypeError("this is not an array");
    }
    return new MyPromise((resolve, reject) => {
      pArr.forEach((p) => {
        MyPromise.resolve(p).then(
          (val) => {
            resolve(val);
          },
          (res) => {
            reject(res);
          }
        );
      });
    });
  }
  // catch(cb) {
  //   cb =
  //     typeof cb === "function"
  //       ? cb
  //       : (res) => {
  //           throw res;
  //         };
  //         return new MyPromise((resolve,reject)=>{

  //         })
  // }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (res) => {
            throw res;
          };
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        );
        this.onRejectedCallback.push(
          setTimeout(() => {
            try {
              const x = onRejected(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        );
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

const promise1 = new MyPromise((resolve, reject) => {
  // setTimeout(resolve, 500, 'one');
  resolve('one')
});

const promise2 = new MyPromise((resolve, reject) => {
  // setTimeout(resolve, 100, 'two');
  resolve('two')
});
MyPromise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// const pErr = new MyPromise((resolve, reject) => {
//   reject("总是失败");
// });

// MyPromise.any([pErr]).catch((err) => {
//   console.log(err);
// });
// 期望输出: "AggregateError: No Promise in Promise.any was resolved"
