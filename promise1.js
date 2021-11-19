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

// Function.prototype.bind2 = function (ctx, ...args) {
//   const self = this;
//   //校验this是否是function
//   if (typeof self !== "function")
//     throw new TypeError("bind must be caaled by a function");
//   ctx = ctx || window;
//   args = args.length > 0 ? args : [];
//   const bound = function (...arg) {
//     const params = args.concat(arg);
//     if (this instanceof bound) {
//       return self.apply(this, params);
//     } else {
//       return self.apply(ctx, params);
//     }
//   };
//   return bound;
// };

// function Parent(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const Child = Parent.bind2(this, "aaa");
// const child1 = new Child(3);
// console.log(child1.name);

Promise.all = function (pAll) {
  if (Object.prototype.toString.call(pAll) !== "[object Array]")
    throw new TypeError("param is not an array");
  let index;
  let result = [];
  return new Promise((resolve, reject) => {
    pAll.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => {
          result[i] = val;
          index++;
          if (index === result.length) {
            resolve(result);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};

Promise.race = function (pAll) {
  if (Object.prototype.toString.call(pAll) !== "[object Array]")
    throw new TypeError("param is not an array");
  return new Promise((resolve, reject) => {
    pAll.forEach((p) => {
      Promise.resolve(p).then(
        (val) => {
          resolve(val);
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};

function new2(fn, ...args) {
  const obj = new Object();
  obj.__proto__ = fn.prototype;
  const res = fn.apply(obj, args);
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}

function mySetInterval(fn, time = 1000) {
  let timer = null,
    isClear = false;
  const interval = function () {
    if (isClear === true) {
      clearTimeout(timer);
      timer = null;
      isClear = false;
      return;
    }
    fn();
    timer = setTimeout(() => {
      interval();
    }, time);
  };
  timer = setTimeout(() => {
    interval();
  }, time);
  return () => {
    isClear = true;
  };
}

function debounce(fn, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    const ctx = this;
    const args = arguments;
    timer = setTimeout(() => {
      fn.call(ctx, ...args);
    }, delay);
  };
}

// document.addEventListener(
//   "scroll",
//   debounce(function () {
//     console.log("scroll");
//   }, 1000)
// );

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    const ctx = this;
    const args = arguments;
    timer = setTimeout(() => {
      fn.call(ctx, ...args);
      timer = null;
    }, delay);
  };
}
// document.addEventListener(
//   "scroll",
//   throttle(function () {
//     console.log("scroll");
//   }, 1000)
// );
// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: { e: 5 },
//   },
//   b: [1, 3, { a: 2, b: 3 }],
//   c: 3,
// };
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
// function isObject(val) {
//   return typeof val === "object" && val !== null;
// }
// function flattenObj(obj) {
//   if (!isObject(obj)) throw new TypeError("param is not an object");
//   for (let key in obj) {
//       const item=obj[key]
//       Array.isArray(item)
//   }
// }

// function flattenArr(arr) {
// if (Object.prototype.toString.call(arr) !== "[object Array]")
//     throw new TypeError("this is not an array");
// return arr.reduce((pre, cur) => {
//     return Array.isArray(cur) ? [...pre, ...flattenArr(cur)] : [...pre, cur];
// }, []);
// }

function flattenArr(arr) {
  if (Object.prototype.toString.call(arr) !== "[object Array]")
    throw new TypeError("this is not an array");
  while (
    arr.some((item) => {
      return Array.isArray(item);
    })
  ) {
    arr = [].concat(...arr);
  }
  return arr;
}
// const arr = [1, 2, [3, 4, 2, [4, 3, 2]]];

// console.log(flattenArr(arr));

function isValid(s) {
  if (s.length % 2 !== 0) {
    return false;
  }
  const obj = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const stack = [];
  for (let key in s) {
    const item = s[key];
    if (item === "(" || item === "{" || item === "[") {
      stack.push(item);
    } else {
      cur = stack.pop();
      if (obj[cur] !== item) {
        return false;
      }
    }
  }
  if (stack.length) {
    return false;
  }
  return true;
}

// const str = "({[]{}})";
// console.log(isValid(str));

// const strs = ["flower", "flow", "flight"];

function pubFront(strs) {
  if (Object.prototype.toString.call(strs) !== "[object Array]")
    throw new TypeError("this is not an array");
  let str = strs.length > 0 ? strs[0] : "";
  for (let key in strs) {
    if (str === "") break;
    const item = strs[key];
    while (!item.includes(str)) {
      if (str === "") break;
      str = str.substring(0, str.length - 1);
    }
  }
  return str;
}
// const strs = ["dog","racecar","car"]
// console.log(pubFront(strs));

const jsonp = ({ url, params, callbackName }) => {
  const generateURL = () => {
    let dataStr = "";
    for (let key in params) {
      dataStr += `${key}=${params[key]}&`;
    }
    dataStr += `callback=${callbackName}`;
    return `${url}?${dataStr}`;
  };
  return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName;
    // 创建 script 元素并加入到当前文档中
    let scriptEle = document.createElement("script");
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);
    window[callbackName] = (data) => {
      console.log(55, data);
    };
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle);
    };
  });
};

// jsonp({
//   url: 'http://localhost:3000',
//   params: {
//     a: 1,
//     b: 2
//   },
//   callbackName:'callbackName'
// })
// .then(data => {
//   // 拿到数据进行处理
//   console.log(data); // 数据包
// })

function compose(...args) {
  let result;
  return function (x) {
    result = x;
    while (args.length > 0) {
      result = args.pop()(result);
    }
    return result;
  };
}

// // 用法如下:
// function fn1(x) {
//   return x + 1;
// }
// function fn2(x) {
//   return x + 2;
// }
// function fn3(x) {
//   return x + 3;
// }
// function fn4(x) {
//   return x + 4;
// }
// const a = compose(fn1, fn2, fn3, fn4);
// console.log(a(1)); // 1+4+3+2+1=11

// //组合继承
// function Parent(name, age) {
//   this.name = name;
//   this.age = {
//     jj: 4,
//     age,
//   };
// }
// Parent.prototype.sayname = function () {
//   console.log(this.name);
// };
// Parent.prototype.sayage = function () {
//   console.log(this.age);
// };

// function Child() {
//   Parent.apply(this, arguments);
//   this.sex = "女";
// }

// function generateObj(obj) {
//   let F = function () {};
//   F.prototype = obj.prototype;
//   return new F();
// }

// function inherit(Child, Parent) {
//   const prototype = generateObj(Parent);
//   // Child.prototype.__proto__=Parent.prototype
//   prototype.constructor = Child;
//   Child.prototype = prototype;
//   return Child;
// }
// const child = inherit(Child, Parent);
// // Child.prototype = Object.create(Parent.prototype);
// // Child.prototype.constructor = Child;

// const child1 = new child("kkk", 9);
// const child2 = new child("jjj", 3);
// child1.age.jj = 8;
// child1.sayage();
// child2.sayage();

//数组去重
// function uniqArr(arr) {
//   const newArr=[]
//   for (let key in arr) {
//     const item = arr[key];
//     if (arr.indexOf(item) === Number(key)) {
//      newArr.push(item)
//     }
//   }
//   return newArr
// }

// function uniqArr(arr) {
//   const newArr=[]
//   for (let key in arr) {
//     const item = arr[key];
//     if (!newArr.includes(item)) {
//      newArr.push(item)
//     }
//   }
//   return newArr
// }

// const arr=[1,2,3,1,2,3,4,5,2,3,4]
// console.log(uniqArr(arr))

// //数组扁平化
// function flatten(arr) {
//   //校验是否维数组
//   let result = arr.reduce(function (pre, cur) {
//     return Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur];
//   }, []);
//   return result;
// }

// function flatten(arr) {
//   while (
//     arr.some((item) => {
//       return Array.isArray(item);
//     })
//   ) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }

// const arr = [2, 4, [3, 2, 2, [4, 5, 9]], [0, 4, 5, 6]];
// console.log(flatten(arr));

//浅拷贝
// function shallowCopy(obj) {
//   const newObj = {};
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       newObj[key] = obj[key];
//     }
//   }
//   return newObj;
// }
// const obj = {
//   name: "lihan",
//   age: 40,
//   sex: {
//     one: "nv",
//     two: "nan",
//   },
// };
// const obj1 = shallowCopy(obj);
// obj1.name = "ooo";
// const obj2 = shallowCopy(obj);
// obj2.sex.one = "ppp";
// console.log(obj1, obj2);

//深拷贝
function deepCopy(obj) {
  const newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj
}

const obj = {
  name: "lihan",
  age: 40,
  sex: {
    one: "nv",
    two: "nan",
  },
};
const obj1 = deepCopy(obj);
obj1.name = "ooo";
const obj2 = deepCopy(obj);
obj2.sex.one = "ppp";
console.log(obj1, obj2);