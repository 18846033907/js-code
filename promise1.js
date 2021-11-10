// const FULFILLED = "fulfilled";
// const REJECTED = "rejected";
// const PENDING = "pending";

// class MyPromise {
//   constructor(excutor) {
//     this.status = PENDING;
//     this.value = null;
//     this.reason = null;
//     this.onFulfilledCallbacks = [];
//     this.onRejectedCallbacks = [];
//     const resolve = (val) => {
//         debugger
//       if (this.status === PENDING) {
//         this.status = FULFILLED;
//         this.value = val;
//         this.onFulfilledCallbacks.forEach((fn) => {
//           fn(val);
//         });
//       }
//     };
//     const reject = (res) => {
//       if (this.status === PENDING) {
//         this.status = REJECTED;
//         this.reason = res;
//         this.onRejectedCallbacks.forEach((fn) => {
//           fn(res);
//         });
//       }
//     };
//     try {
//       excutor(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     onFulfilled =
//       typeof onFulfilled === "function" ? onFulfilled : (val) => val;
//     onRejected = typeof onRejected === "function" ? onRejected : (res) => res;
//     const promise2 = new MyPromise((resolve, reject) => {
//       if (this.status === FULFILLED) {
//           debugger
//         const x = onFulfilled(this.value);
//         resolvePromise(x, resolve, reject);
//       }
//       if (this.status === REJECTED) {
//         onRejected(this.reason);
//       }
//       if (this.status === PENDING) {
//         this.onFulfilledCallbacks.push(onFulfilled);
//         this.onRejectedCallbacks.push(onRejected);
//       }
//     });
//     return promise2;
//   }
// }

// const resolvePromise = (x, resolve, reject) => {
//   if (x instanceof MyPromise) {
//       debugger
//     x.then(resolve, reject);
//   } else {
//       debugger
//     resolve(x);
//   }
// };

// const promise = new MyPromise((resolve, reject) => {
//   // 目前这里只处理同步的问题
//   resolve("success");
// });

// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve("other");
//   });
// }
// promise
//   .then((value) => {
//     console.log(1);
//     console.log("resolve", value);
//     return other();
//   })
//   .then((value) => {
//     console.log(2);
//     console.log("resolve", value);
//   });
