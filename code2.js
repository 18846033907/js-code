//数据类型判断
const arrPro = [
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Object",
  "Error",
  "Symbol",
];
function factory(arr) {
  const class2type = {};
  arr.forEach((name) => {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  return class2type;
}
const toString = Object.prototype.toString;
function getType(param) {
  if (typeof param !== "object") return typeof param;
  return factory(arrPro)[toString.call(param)];
}
// console.log(type(function(){}));

//数组去重
// function uniq(arr) {
//   let result = [];
//   for (let key of arr) {
//     if (result.indexOf(key) === -1) {
//       result.push(key);
//     }
//   }
//   return result
// }
// function uniq(arr) {
//   const result=arr.filter((item,index)=>{
//       return arr.indexOf(item)===index
//   })
//   return result
// }
// const arr = [2, 3, 2, 3, 23, 4];
// console.log(uniq(arr));

//原型链继承
// function Parent() {
//   this.color = ["red", "blue"];
//   this.name='hhh'
// }
// Parent.sayName = function () {
//   console.log("prototype");
// };
// function Child() {}
// Child.prototype=new Parent();
// const child1=new Child();
// child1.name='child1'
// child1.color.push('yellow')
// const child2=new Child();
// console.log(child1,child2)

//寄生式组合继承
// function Parent() {
//   this.color = ["red", "blue"];
//   this.name = "ss";
// }
// Parent.prototype.sayName = function () {
//   console.log("prototype");
// };
// function Child() {
//   Parent.call(this);
// }
// Child.prototype = Object.create(Parent);
// const child1 = new Child();
// child1.name = "child1";
// child1.color.push("yellow");
// const child2 = new Child();
// console.log(child1, child2);

//数组扁平化
// function flatten(arr){
//    while(arr.some(item=>{
//        return Array.isArray(item)
//    })) {
//        arr=[].concat(...arr)
//    }
//    return arr
// }
// function flatten(arr) {
//   return arr.reduce((pre, cur) => {
//     return Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur];
//   },[]);
// }
// const arr = [1, 2, 3, [3, 4, 2, [4, 3, 2]], [3, 4, 5, [3, 4]]];
// console.log(flatten(arr));

//深浅拷贝 for...in 无法识别Symbol键
// function shallowCopy(obj) {
//   if (getType(obj) !== "object") throw new Error("this is not an object");
//   let newObj = {};
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       newObj[key] = obj[key];
//     }
//   }
//   return newObj;
// }
// const obj = {
//   l: "ooo",
//   w: [1, 1, 2],
// };
// const o1 = shallowCopy(obj);
// o1.w.push('iii')
// const o2 = shallowCopy(obj);
// console.log(o1, o2);
// function deepCopy(obj) {
//   if (getType(obj) !== "object") throw new Error("this is not an object");
//   let result = {};
//   const dns = (obj) => {
//     if (typeof obj !== "object") return obj;
//     let newObj = Array.isArray(obj) ? [] : {};
//     for (let key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         const cur = obj[key];
//         if (typeof obj === "object") {
//           newObj[key] = dns(cur);
//         } else {
//           newObj[key] = cur;
//         }
//       }
//     }
//     return newObj;
//   };
//   result = dns(obj);
//   return result;
// }
// const o1 = deepCopy(obj);
// o1.w.push("iii");
// const o2 = deepCopy(obj);
// console.log(o1, o2);

//事件总线(发布订阅模式)
// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }
//   on(eventName, cb) {
//     if (this.events[eventName]) {
//       this.events[eventName].push(cb);
//     } else {
//       this.events[eventName] = [cb];
//     }
//   }
//   off(eventName, cb) {
//     this.events[eventName].filter((fn) => {
//       return fn !== cb;
//     });
//   }
//   once(eventName, cb) {
//     const fn = (...args) => {
//       cb(...args);
//       this.off(eventName, cb);
//     };
//     this.on(eventName, fn);
//   }
//   emit(eventName, ...args) {
//     if (this.events[eventName]) {
//       const tasks = this.events[eventName];
//       tasks.forEach((fn) => {
//         fn(...args);
//       });
//     }
//   }
// }

// let eventBus = new EventEmitter();
// let fn1 = function (name, age) {
//   console.log(`${name} ${age}`);
// };
// let fn2 = function (name, age) {
//   console.log(`hello, ${name} ${age}`);
// };
// eventBus.on("aaa", fn1);
// eventBus.on("aaa", fn2);
// eventBus.once("once", fn1);
// eventBus.emit("aaa", "布兰", 12);

//解析URL参数为对象
// function url2obj(url) {
//   let str = url.split("?")[1];
//   let strArr = str.split("&");
//   let obj = {};
//   for (let cur of strArr) {
//     if (/=/.test(cur)) {
//       const item = cur.split("=");
//       let key = item[0];
//       let value = item[1];
//       obj[key] = value;
//     } else {
//       obj[cur] = undefined;
//     }
//   }
//   return obj
// }
// const url =
//   "https://www.baidu.com/s?wd=MDN&rsv_spt=1&rsv_iqid=0xd20e78fd0000be64&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_dl=tb&rsv_enter=1&oq=jquery%2520%25E6%2595%25B0%25E6%258D%25AE%25E7%25B1%25BB%25E5%259E%258B%25E5%2588%25A4%25E6%2596%25AD%25E6%25BA%2590%25E7%25A0%2581&rsv_btype=t&inputT=1456&rsv_t=814am%2BjkIbePh1gjkYpLZMIQCjYAaGv%2F04fuWwXuBVVr5PR217lPqxIPt%2BHbYALqtSSW&rsv_pq=bcb07092002bd3f3&rsv_sug3=54&rsv_sug1=38&rsv_sug7=100&rsv_sug2=0&rsv_sug4=1456";
// console.log(url2obj(url))

//字符串模板
// function render(str, obj) {
//   const reg = /\{\{(\w+)\}\}/g;
//   return str.replace(reg, function (match, key) {
//     console.log(match, key);
//     return obj[key];
//   });
// }
// const obj = {
//   name: "pp",
//   age: 9,
//   sex: "nan",
// };
// const str = `我是{{name}},年龄{{age}},性别{{sex}}`;
// console.log(render(str, obj));

//函数防抖
// function debounce(fn, delay) {
//   let timer = null;
//   return function () {
//     clearTimeout(timer);
//     const ctx = this;
//     const args = arguments;
//     timer = setTimeout(function () {
//       fn.call(ctx, args);
//     }, delay);
//   };
// }

//函数节流
// function throttle(fn, delay) {
//   let pre = new Date().getTime();
//   return function () {
//     const now = new Date().getTime();
//     const ctx = this;
//     const args = arguments;
//     if (now - pre >= delay) {
//       fn.call(ctx, args);
//       pre = now;
//     }
//   };
// }

//函数柯里化
// function curry(fn) {
//   const judge = function (...args) {
//     if (args.length === fn.length) return fn(...args);
//     return (...arg) => judge(...args, ...arg);
//   };
//   return judge;
// }
// function add(x, y, z) {
//   return x + y + z;
// }
// const _add = curry(add);
// console.log(_add(1, 2)(3));

//偏函数
// function partial(fn, ...args) {
//   const judge = function (...arg) {
//     return fn(...args, ...arg);
//   };
//   return judge;
// }
// function add(x, y, z) {
//   return x + y + z;
// }
// const _add = partial(add, 1, 2);
// console.log(_add(3));

//JSONP
function jsonp({ url, params, callbackName }) {
  const generateURL = () => {
    let dataUrl = "";
    let endUrl = "";
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataUrl += `${key}=${params[key]}&`;
      }
    }
    endUrl = `${url}?${dataUrl}callback=${callbackName}`;
    return endUrl;
  };

  return new Promise((resolve, reject) => {
    const scrEl = document.createElement("script");
    scrEl.src = generateURL();
    document.body.appendChild(scrEl);
    window[callbackName] = (data) => {
      resolve(data);
      document.body.removeChild(scrEl);
    };
  });
}

// jsonp({
//   url: "http://127.0.0.1:3000/",
//   params: { a: "1", b: "2" },
//   callbackName: "cb",
// }).then((data) => {
//   console.log(data);
// });

//AJAX
function getJson(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader("Content-header", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
}

//数组原型方法 forEach map filter some reduce
Array.prototype.forEach2 = function (cb, thisArg) {
  if (getType(this) !== "array") throw new Error("this is not an array");
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }
  let self = this,
    len = self.length;
  for (let i = 0; i < len; i++) {
    const cur = self[i];
    cb.call(thisArg, cur, i, self);
  }
};
// const arr = [1, 2, 3, 4].forEach2(function (item) {
//   return item*2
// });
// console.log(arr);

Array.prototype.map2 = function (cb, thisArg) {
  if (getType(this) !== "array") throw new Error("this is not an array");
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }
  let self = this,
    len = self.length,
    arr = [];
  for (let i = 0; i < len; i++) {
    const cur = self[i];
    arr.push(cb.call(thisArg, cur, i, self));
  }
  return arr;
};
// const arr = [1, 2, 3, 4].map2(function (item) {
//    return item*2
// });
// console.log(arr);

Array.prototype.filter2 = function (cb, thisArg) {
  if (getType(this) !== "array") throw new Error("this is not an array");
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }
  let self = this,
    len = self.length,
    arr = [];
  for (let i = 0; i < len; i++) {
    const cur = self[i];
    const res = cb.call(thisArg, cur, i, self);
    if (res) {
      arr.push(cur);
    }
  }
  return arr;
};
// const arr = [1, 2, 3, 4].filter2(function (item) {
//   return item===2;
// });
// console.log(arr);

Array.prototype.some2 = function (cb, thisArg) {
  if (getType(this) !== "array") throw new Error("this is not an array");
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }
  let self = this,
    len = self.length,
    result = false;
  for (let i = 0; i < len; i++) {
    const cur = self[i];
    const res = cb.call(thisArg, cur, i, self);
    if (res) {
      result = true;
    }
  }
  return result;
};
// const arr = [1, 2, 3, 4].some2(function (item) {
//   return item===2;
// });
// console.log(arr);

Array.prototype.reduce2 = function (cb, initialValue) {
  if (getType(this) !== "array") throw new Error("this is not an array");
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }
  let self = this,
    len = self.length,
    pre = self[0],
    init = 1;
  if (arguments.length > 1) {
    pre = initialValue;
    init = 0;
  }
  for (let i = init; i < len; i++) {
    const cur = self[i];
    pre = cb(pre, cur, i, self);
  }
  return pre;
};

// const arr = [1, 2, 3, 4].reduce2(function (pre, cur) {
//   return pre + cur;
// }, 10);
// console.log(arr);

//实现函数原型方法 call apply bind

Function.prototype.call2 = function (ctx, ...args) {
  ctx = window || ctx;
  if (typeof this !== "function")
    throw new Error("this is not be called by a function");
  const fn = Symbol();
  ctx[fn] = this;
  const result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};

Function.prototype.apply2 = function (ctx, args) {
  ctx = window || ctx;
  if (typeof this !== "function")
    throw new Error("this is not be called by a function");
  const fn = Symbol();
  ctx[fn] = this;
  const result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};

Function.prototype.bind2 = function (ctx, ...args) {
  ctx = ctx || window;
  if (typeof this !== "function")
    throw new Error("this is not be called by a function");
  let self = this;
  const bound = function (...arg) {
    if (this instanceof bound) {
      return self.call(this, ...args, ...arg);
    } else {
      return self.call(ctx, ...args, ...arg);
    }
  };
  if (self.prototype) {
    bound.prototype = Object.create(self.prototype);
  }
  return bound;
};
// function parent(a, b) {
//   console.log(this.name, this.age, a, b);
// }
// const obj = { name: "hh", age: "tt" };
// const fn = parent.bind2(obj, "a", "b");
// function Parent(a, b) {
//   console.log(this.name, this.age, a, b);
// }
// Parent.prototype.sayName = function () {
//   console.log("sayName");
// };
// const obj = { name: "hh", age: "tt" };
// const Child = Parent.bind2(obj, "a", "b");
// const c1 = new Child();
// console.log(c1.sayName());

//实现new关键字
function myNew(cur, ...args) {
  const obj = new Object();
  obj.__proto__ = cur.prototype;
  const res = cur.apply(obj, args);
  if (typeof res === "object" || typeof res === "function") return res;
  return obj;
}
//实现instanceof关键字
function instansof2(left, right) {
  const prototype = right.prototype;
  while (true) {
    const proto = Object.getPrototypeOf(left);
    if (proto === null) return false;
    if (proto === prototype) return true;
    left = proto;
  }
}
// console.log(instansof2([], Function));
//实现Object.create
Object.create2 = function (proto, propertiesObject) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object or null.");
  }
  if (propertyObject == null) {
    //双等号
    new TypeError("Cannot convert undefined or null to object");
  }
  let obj = new Object();
  obj.__proto__ = proto;
  if (propertiesObject) {
    obj = Object.defineProperties(obj, propertiesObject);
  }
  return obj;
};
// const person = {
//   isHuman: false,
//   printIntroduction: function() {
//     console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//   }
// };

// const me = Object.create2(person);

// me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
// me.isHuman = true; // inherited properties can be overwritten

// me.printIntroduction();
//实现Object.assign
Object.assign2 = function (target, ...sources) {
  let obj = target;
  let len = sources.length;
  for (let i = 0; i < len; i++) {
    const cur = sources[i];
    if (getType(cur) === "object") {
      for (let key in cur) {
        if (cur.hasOwnProperty(key)) {
          obj[key] = cur[key];
        }
      }
    } else {
      throw new Error();
    }
  }
  return obj;
};
// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };

// const returnedTarget = Object.assign(target, source);

// console.log(target);
// // expected output: Object { a: 1, b: 4, c: 5 }

// console.log(returnedTarget);
// // expected output: Object { a: 1, b: 4, c: 5 }
