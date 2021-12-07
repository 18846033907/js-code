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
function jsonp({ url, params, callbackName }) {}
