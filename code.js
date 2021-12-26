//数据类型的判断
// function typeOf(obj) {
//   return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
// }
//数组去重
// function uniq(arr) {
// if(!typeOf(arr)==='array') return
//   const newArr = [];
//   arr.map((item) => {
//     if (newArr.includes(item)) return;
//     newArr.push(item);
//   });
//   return newArr;
// }

//ES5实现
// function uniq(arr) {
// if(!typeOf(arr)==='array') return
//   var res = arr.filter(function (item, index, array) {
//     console.log(item, index, array);
//     return array.indexOf(item) === index;
//   });
//   return res;
// }

//ES6实现
// function uniq(arr) {
//   return [...new Set(arr)];
// }

// const aR = [1, 2, 3, 2, 1, 3, 4, 5];
// console.log(uniq(aR));

//数组扁平化
// function flatten(arr) {
//   if (!typeOf(arr) === "array") return;
//   const result = arr.reduce(function (pre, cur) {
//     console.log(pre, cur);
//     return typeOf(cur) === "array" ? [...pre, ...flatten(cur)] : [...pre, cur];
//   }, []);
//   return result;
// }

//ES6实现
// function flatten(arr) {
//   if (!typeOf(arr) === "array") return;
//   while (
//     arr.some((item) => {
//       return typeOf(item) === "array";
//     })
//   ) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }

// const aR = [1, 2, [3, 4, 4, [4, 3]]];
// console.log(flatten(aR));

//深浅拷贝
//浅拷贝
// function shallowCopy(obj) {
//   if (typeOf(obj) !== "object") return;
//   var newObj = obj instanceof Array ? [] : {};
//   for (let prop in obj) {
//     if (obj.hasOwnProperty(prop)) {
//       newObj[prop] = obj[prop];
//     }
//   }
//   return newObj;
// }

// function shallowCopy(obj) {
//   if (typeof obj === "object" && obj !== null) {
//    let res = Array.isArray(obj) ? [] : {};
//     for (let key in obj) {
//       res[key] = obj[key];
//     }
//     return res
//   }else{
//   return obj
// }
// }

//深拷贝

// function deepCopy(obj) {
//   if (typeof obj === "object" && obj !== null) {
//    let res = Array.isArray(obj) ? [] : {};
//     for (let key in obj) {
//       res[key] = deepCopy(obj[key]);
//     }
//     return res;
//   } else {
//     return obj;
//   }
// }
// function deepCopy(obj) {
//   if (obj === null) return obj;
//   if (obj instanceof Date) return new Date(obj);
//   if (obj instanceof RegExp) return new RegExp(obj);
//   if (typeOf(obj) !== "object" && typeOf(obj) !== "array") return obj;
//   const newObj = obj instanceof Array ? [] : {};
//   for (let prop in obj) {
//     if (obj.hasOwnProperty(prop)) {
//       newObj[prop] = deepCopy(obj[prop]);
//     }
//   }
//   return newObj;
// }

// function cloneCopy(obj) {
//   if (obj === null) return obj;
//   if (obj instanceof Date) return new Date(obj);
//   if (obj instanceof RegExp) return new RegExp(obj);
//   if (typeof obj !== "object") return obj;
//   let cloneObj = new obj.constructor();
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       // 实现一个递归拷贝
//       cloneObj[key] = cloneCopy(obj[key]);
//     }
//   }
//   return cloneObj;
// }

// const obj = {
//   name: "浪里行舟",
//   arr: [1, [2, 3], 4],
// };

// console.log(shallowCopy(obj), deepCopy(obj));
// const obj1 = shallowCopy(obj);
// const obj2 = shallowCopy(obj);
// obj1.arr[1] = [5,6,7]
// console.log(obj1, obj);

// const obj1 = deepCopy(obj);
// const obj2 = deepCopy(obj);
// obj1.arr[1] = [5, 6, 7];
// console.log(obj1, obj2);

//解析URL参数为对象
// function parseUrl(url) {
//   const endArr = url.split("?")[1].split("&");
//   const newObj = {};
//   for (let i in endArr) {
//     if (/=/.test(endArr[i])) {
//       const curArr = endArr[i].split("=");
//       const key = curArr[0];
//       let value = curArr[1];
//       newObj[key] = value;
//     } else {
//       newObj[endArr[i]] = true;
//     }
//   }
//   return newObj;
// }

// function parseParam(url) {
//   const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
//   const paramsArr = paramsStr.split("&"); // 将字符串以 & 分割后存到数组中
//   let paramsObj = {};
//   // 将 params 存到对象中
//   paramsArr.forEach((param) => {
//     if (/=/.test(param)) {
//       // 处理有 value 的参数
//       let [key, val] = param.split("="); // 分割 key 和 value
//       val = decodeURIComponent(val); // 解码
//       val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

//       if (paramsObj.hasOwnProperty(key)) {
//         // 如果对象有 key，则添加一个值
//         paramsObj[key] = [].concat(paramsObj[key], val);
//       } else {
//         // 如果对象没有这个 key，创建 key 并设置值
//         paramsObj[key] = val;
//       }
//     } else {
//       // 处理没有 value 的参数
//       paramsObj[param] = true;
//     }
//   });

//   return paramsObj;
// }

// const url =
//   "https://www.baidu.com/s?wd=%E6%8E%98%E9%87%91&rsv_spt=1&rsv_iqid=0x9cf3a59200051058&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_dl=tb&rsv_enter=1&oq=Function%2520components%2520cannot%2520be%2520given%2520refs.%2520Attempts%2520to%2520access%2520this%2520ref%2520will%2520f&rsv_t=dcd4DeZAIo%2F5CkEFrDhISAL3wnvicMHZJbDFXELat0t9EsHRdtW7wjoM8VXeRRnob1FB&rsv_btype=t&inputT=3553&rsv_pq=90222ffe00046b09&rsv_sug3=54&rsv_sug1=36&rsv_sug7=100&rsv_sug2=0&prefixsug=%25E6%258E%2598%25E9%2587%2591&rsp=5&rsv_sug4=6430";
// console.log(parseUrl(url));

//字符串模板
// function render(template, obj) {
//   const reg = /\{\{(\w+)\}\}/;
//   let str = template;
//   while (reg.test(str)) {
//     //exec第一个
//     const arr = reg.exec(str);
//     const key = arr[1];
//     //replace第一个
//     str=str.replace(reg, obj[key]);
//   }
//   return str;
// }
// function render(template, data) {
//   const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
//   if (reg.test(template)) { // 判断模板里是否有模板字符串
//       const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
//       template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
//       return render(template, data); // 递归的渲染并返回渲染后的结构
//   }
//   return template; // 如果模板没有模板字符串直接返回
// }

// let template = "年龄{{age}},性别{{sex}},我是{{name}}";
// let person = {
//   name: "布兰",
//   age: 12,
// };
// console.log(render(template, person)); // 我是布兰，年龄12，性别undefined

//函数防抖:触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。
//简单版:支持this和传参
// function debounce(fn, delay) {
//   let timer = null;
//   return function () {
//     clearTimeout(timer);
//     var context = this;
//     var args = arguments;
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//     }, delay);
//   };
// }

// //复杂版:支持立即执行；函数可能有返回值；支持取消功能；
// function debounce(func, wait, immediate) {
//   var timeout, result;
//   var debounced = function () {
//     var context = this;
//     var args = arguments;
//     if (timeout) clearTimeout(timeout);
//     if (immediate) {
//       // 如果已经执行过，不再执行
//       var callNow = !timeout;
//       timeout = setTimeout(function () {
//         timeout = null;//有点问题，可改成result = func.apply(context, args)
//       }, wait);
//       if (callNow) result = func.apply(context, args);
//     } else {
//       timeout = setTimeout(function () {
//         func.apply(context, args);
//       }, wait);
//     }
//     return result;
//   };

//   debounced.cancel = function () {
//     clearTimeout(timeout);
//     timeout = null;
//   };

//   return debounced;
// }

// function debounce(fn, delay, immediate) {
//   let timer = null;
//   const debounced = function () {
//     clearTimeout(timer);
//     var context = this;
//     var args = arguments;
//     if (immediate) {
//       const callNow = !timer;
//       timer = setTimeout(function () {
//         timer = null;
//       }, delay);
//       if (callNow) {
//         fn.apply(context, args);
//       }
//     } else {
//       timer = setTimeout(function () {
//         fn.apply(context, args);
//       }, delay);
//     }
//   };
//   debounced.cancel = function () {
//     clearTimeout(timer);
//     timer = null;
//   };
//   return debounced;
// }

//测试防抖
// const node = document.getElementById("btn");
// function getUserAction() {
//   console.log("hhahah");
// }
// node.onclick = debounce(getUserAction, 2000, true);

// //函数节流:触发高频事件，且 N 秒内只执行一次
// //简单版:定时器版
// function throttle(fn, delay) {
//   let timer = null;
//   return function () {
//     var context = this;
//     var args = arguments;
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//       clearTimeout(timer);
//     }, delay);
//   };
// }
// //时间戳版
// function throttle(fn, delay) {
//   let pre = "";
//   return function () {
//     const now = new Data().getTime();
//     var context = this;
//     var args = arguments;
//     if (now - pre > delay) {
//       fn.apply(context, args);
//       pre = now;
//     }
//   };
// }
// //支持取消节流
// function throttle(fn, delay) {
//   let timer = null;
//   const throttled = function () {
//     var context = this;
//     var args = arguments;
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//       clearTimeout(timer);
//     }, delay);
//   };
//   throttled.cancel = function () {
//     clearTimeout(timer);
//   };
//   return throttled;
// }

// const node = document.getElementById("btn");
// function getUserAction() {
//   console.log("hhahah");
// }
// node.onclick = throttle(getUserAction, 2000);
//函数柯里化:举个例子
// function add(a, b, c) {
//   return a + b + c;
// }
// add(1, 2, 3);
// let addCurry = curry(add);
// const res = addCurry(1)(2)(3);
// console.log(32, res);

//函数柯里化实现
// function curry(fn) {
//   const judge = function (...args) {
//     if (args.length === fn.length) return fn(...args);
//     return (...arg) => judge(...args, ...arg);
//   };
//   return judge
// }
// let addCurry = curry(add);
// console.log(addCurry(1, 2)(3));

//偏函数:举个例子
// function add(a, b, c) {
//   return a + b + c;
// }
//偏函数实现

// function partial(fn, ...args) {
//   return function (...arg) {
//     return fn(...args, ...arg);
//   };
// }

// let partialAdd = partial(add, 1);
// console.log(partialAdd(2, 3));

//JSONP
// const jsonp = ({ url, params, callbackName }) => {
//   const generateUrl = () => {
//       let dataSrc = ''
//       for (let key in params) {
//           if (params.hasOwnProperty(key)) {
//               dataSrc += `${key}=${params[key]}&`
//           }
//       }
//       dataSrc += `callback=${callbackName}`
//       return `${url}?${dataSrc}`
//   }
//   return new Promise((resolve, reject) => {
//       const scriptEle = document.createElement('script')
//       scriptEle.src = generateUrl()
//       document.body.appendChild(scriptEle)
//       window[callbackName] = data => {
//           resolve(data)
//           document.removeChild(scriptEle)
//       }
//   })
// }

//ajax
// const getJSON = function(url) {
//   return new Promise((resolve, reject) => {
//       const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
//       xhr.open('GET', url, false);
//       xhr.setRequestHeader('Accept', 'application/json');
//       xhr.onreadystatechange = function() {
//           if (xhr.readyState !== 4) return;
//           if (xhr.status === 200 || xhr.status === 304) {
//               resolve(xhr.responseText);
//           } else {
//               reject(new Error(xhr.responseText));
//           }
//       }
//       xhr.send();
//   })
// }

//实现数组原型方法
//forEach:方法对数组的每个元素执行一次给定的函数。

// Array.prototype.forEach2 = function (callback) {
//   const _this = this;
//   if (typeOf(_this) !== "array") throw new TypeError("this is not an array");
//   const l = _this.length;
//   let i=0;
//   while (i < l) {
//     callback(_this[i], i, _this);
//     i++;
//   }
// };

// const arr = [1, 2, 3, 4];
// arr.forEach2((item) => {
//   console.log(item);
// });

//map:方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

// Array.prototype.map2 = function (callback) {
//   const _this = this;
//   if (typeOf(_this) !== "array") throw new TypeError("this is not an array");
//   const newArr = [];
//   const l = _this.length;
//   let i = 0;
//   while (i < l) {
//     newArr.push(callback(_this[i], i, _this));
//     i++;
//   }
//   return newArr;
// };

// const arr = [1, 2, 3, 4];
// const mapArr = arr.map2((item) => {
//   return item *2;
// });
// console.log(mapArr);

//filter: 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
// Array.prototype.filter2 = function (callback) {
//   const _this = this;
//   if (typeOf(_this) !== "array") throw new TypeError("this is not an array");
//   const newArr=[]
//   const l = _this.length;
//   let i=0;
//   while (i < l) {
//     if(callback(_this[i], i, _this)){
//       newArr.push(_this[i])
//     }
//     i++;
//   }
//   return newArr
// };

// const arr = [1, 2, 3, 4];
// const mapArr=arr.filter2((item) => {
//   return item===1
// });
// console.log(mapArr)

//some:方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的
// Array.prototype.some2 = function (callback) {
//   const _this = this;
//   if (typeOf(_this) !== "array") throw new TypeError("this is not an array");
//   let bool = false;
//   const l = _this.length;
//   let i = 0;
//   while (i < l) {
//     if (callback(_this[i], i, _this)) {
//       bool = true;
//     }
//     i++;
//   }
//   return bool;
// };

// const arr = [1, 2, 3, 4];
// const mapArr = arr.some2((item) => {
//   return item < 1;
// });
// console.log(mapArr);

//reduce: 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
// Array.prototype.reduce2 = function (callback, init) {
//   if (typeOf(callback) !== "function")
//     throw new Error("This is not a function!");
//   const _this = this;
//   const l = _this.length;
//   let i = 1;
//   let res = _this[0];
//   if (arguments.length > 1) {
//     i = 0;
//     res = init;
//   }
//   while (i < l) {
//     const cur = _this[i];
//     res = callback(res, cur);
//     i++;
//   }
//   return res;
// };

// var flattened = [
//   [0, 1],
//   [2, 3],
//   [4, 5],
// ].reduce(function (a, b) {
//   return a.concat(b);
// }, []);

// const arr = [1, 2, 3, 4];
// const mapArr = arr.reduce2((pre, cur) => {
//   return pre + cur;
// }, 0);
// console.log(mapArr);

//实现函数原型方法
//call:方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数

// Function.prototype.call2 = function (context) {
//   var context = context || window;
//   context.fn = this;

//   const args = [];
//   for (var i = 1, len = arguments.length; i < len; i++) {
//     args.push("arguments[" + i + "]");
//   }
//   const result = eval("context.fn(" + args + ")");

//   delete context.fn;
//   return result;
// };
// Function.prototype.call2 = function (ctx, ...args) {
//   ctx = ctx || window;
//   args = args ? args : [];
//   let fn = Symbol();
//   ctx[fn] = this;
//   const result = ctx[fn](...args);
//   delete ctx[fn];
//   return result;
// };

// function mySymbol(obj) {
//   // 不要问我为什么这么写，我也不知道就感觉这样nb
//   let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8);
//   // 牛逼也要严谨
//   if (obj.hasOwnProperty(unique)) {
//     return mySymbol(obj); //递归调用
//   } else {
//     return unique;
//   }
// }

// function Product(name, price) {
//   this.name = name;
//   this.price = price;
// }

// function Food(name, price) {
//   Product.call2(this, name, price);
//   this.category = "food";
// }

// console.log(new Food("cheese", 5).name);

//apply:方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

// Function.prototype.apply2 = function (context, args) {
//   context = context || window;
//   args ? args : [];
//   let fn = Symbol();
//   const result = context[fn](...args);
//   delete context[fn];
//   return result;
// };
// Function.prototype.apply2 = function (context, arr) {
//   var context = context || window;
//   context.fn = this;
//   let result;
//   let args = [];
//   const l = arr.length;
//   if (l > 0) {
//     for (let i = 0; i < l; i++) {
//       args.push("arr[" + i + "]");
//     }
//     console.log("context.fn(" + args + ")",args)
//     result = eval("context.fn(" + args + ")");
//   } else {
//     result = context.fn();
//   }
//   delete context.fn;
//   return result;
// };

// function Product(name, price) {
//   this.name = name;
//   this.price = price;
// }

// function Food(name, price) {
//   Product.apply2(this, [name, price]);
//   this.category = "food";
// }

// console.log(new Food("cheese", 5).name);

//bind:方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
// Function.prototype.bind2 = function (ctx, ...args) {
//   ctx = ctx || window;
//   args = args || [];
//   let fn = Symbol();
//   ctx[fn] = this;
//   return function (...arg) {
//     return ctx[fn](...args, ...arg);
//   };
// };

// Function.prototype.bind2 = function (thisArg) {
//   if (typeof this !== "function") {
//     throw TypeError("Bind must be called on a function");
//   }
//   const args = Array.prototype.slice.call(arguments, 1),
//     self = this,
//     // 构建一个干净的函数，用于保存原函数的原型
//     nop = function () {},
//     // 绑定的函数
//     bound = function () {
//       // this instanceof nop, 判断是否使用 new 来调用 bound
//       // 如果是 new 来调用的话，this的指向就是其实例，
//       // 如果不是 new 调用的话，就改变 this 指向到指定的对象 o
//       return self.apply(
//         this instanceof nop ? this : thisArg,
//         args.concat(Array.prototype.slice.call(arguments))
//       );
//     };
//   // 箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
//   console.log(662,this.prototype);
//   if (this.prototype) {
//     nop.prototype = this.prototype;
//   }
//   // 修改绑定函数的原型指向
//   bound.prototype = new nop();
//   console.log(1212, bound.prototype.__proto__, nop.prototype);

//   return bound;
// };

// let obj = { name: "ciel" };
// function Test(x, y, z) {
//   console.log(this.name); // ciel
//   console.log(x + y + z); // 6
// }
// Test.prototype.say = function () {
//   console.log("hello");
// };
// let Bound = Test.bind2(obj, 1, 2);
// Bound(3); // 6
// const bound1 = new Bound(); // bound {}
// console.log(bound1.__proto__.__proto__, Bound.prototype.__proto__);

// Function.prototype.bind2 = function (thisArg) {
//   //判断this是否为function
//   if (typeof this !== "function")
//     throw new TypeError("bind must be called by a function");
//   const self = this;
//   // function F() {}
//   const args = Array.prototype.slice.call(arguments, 1);
//   const bound = function () {
//     const arg = Array.prototype.slice.call(arguments);
//     const params = args.concat(arg);
//     if (this instanceof bound) {
//       const result = self.apply(this, params);
//       const isObject = typeof result === "object" && result !== null;
//       const isFunction = typeof result === "function";
//       if (isObject || isFunction) {
//         return result;
//       }
//       return this;
//     } else {
//       return self.apply(thisArg, params);
//     }
//   };

//   if (self.prototype) {
//     // F.prototype = self.prototype;
//     // bound.prototype = new F();
//     bound.prototype=Object.create(self.prototype)
//     //bound.prototype.__proto__=self.prototype;F函数的this指向bound
//   }

//   return bound;
// };

// var obj = {
//   name: "若川",
// };
// function original(a, b){
//   console.log(this)
//   console.log(this.name);
//   console.log([a, b]);
// }
// var bound = original.bind2(obj, 1);
// bound(2); // '若川', [1, 2]

// function original(a, b) {
//   console.log("this", this); // original {}
//   console.log("typeof this", typeof this); // object
//   this.name = b;
//   console.log("name", this.name); // 2
//   console.log("this", this); // original {name: 2}
//   console.log([a, b]); // 1, 2
//   // return function(){
//   //   console.log('function')
//   // }
// }
// original.prototype.sayHi = function () {
//   console.log("hi");
// };
// var Bound = original.bind2(obj, 1);
// var newBoundResult = new Bound(2);
// // console.log(newBoundResult.sayHi());
// console.log(newBoundResult.__proto__, Bound.prototype); // original {name: 2}

//es5-shim源码
// var $Array = Array;
// var ArrayPrototype = $Array.prototype;
// var $Object = Object;
// var array_push = ArrayPrototype.push;
// var array_slice = ArrayPrototype.slice;
// var array_join = ArrayPrototype.join;
// var array_concat = ArrayPrototype.concat;
// var $Function = Function;
// var FunctionPrototype = $Function.prototype;
// var apply = FunctionPrototype.apply;
// var max = Math.max;
// // 简版 源码更复杂些。
// var isCallable = function isCallable(value){
//     if(typeof value !== 'function'){
//         return false;
//     }
//     return true;
// };
// var Empty = function Empty() {};
// // 源码是 defineProperties
// // 源码是bind笔者改成bindFn便于测试
// FunctionPrototype.bind2 = function bind(that) {
//     var target = this;
//     if (!isCallable(target)) {
//         throw new TypeError('Function.prototype.bind called on incompatible ' + target);
//     }
//     var args = array_slice.call(arguments, 1);
//     var bound;
//     var binder = function () {
//         if (this instanceof bound) {
//             var result = apply.call(
//                 target,
//                 this,
//                 array_concat.call(args, array_slice.call(arguments))
//             );
//             if ($Object(result) === result) {
//                 return result;
//             }
//             return this;
//         } else {
//             return apply.call(
//                 target,
//                 that,
//                 array_concat.call(args, array_slice.call(arguments))
//             );
//         }
//     };
//     var boundLength = max(0, target.length - args.length);
//     var boundArgs = [];
//     for (var i = 0; i < boundLength; i++) {
//         array_push.call(boundArgs, '$' + i);
//     }
//     // 这里是Function构造方式生成形参length $1, $2, $3...
//     bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

//     if (target.prototype) {
//         Empty.prototype = target.prototype;
//         bound.prototype = new Empty();
//         Empty.prototype = null;
//     }
//     return bound;
// };

//实现new关键字：运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
//es6
// function myNew(fn, ...args) {
//   //判断是不是function的实例
//   if (!(fn instanceof Function)) throw Error("this is not a function");
//   // 创建一个空的简单JavaScript对象（即{}）；
//   const obj = {};
//   // 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
//   obj.__proto__ = fn.prototype;
//   // 将步骤1新创建的对象作为this的上下文 ；
//   const ret = fn.apply(obj, args);
//   // 如果该函数没有返回对象，则返回this。
//     return typeof ret === 'object'||typeof ret==='function' ? ret || obj : obj;
// }
//es5
// function myNew() {
//   var obj = {}
// // shift删除第一个元素并返回，改变原数组
//   Constructor = [].shift.call(arguments);
//   obj.__proto__ = Constructor.prototype;
//   var ret = Constructor.apply(obj, arguments);
//   // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况(原生new操作符返回object，array和function时不能继承prototype)
//   return typeof ret === 'object'||typeof ret==='function' ? ret || obj : obj;
// };

// 测试
// function foo() {
//   this.name = "ciel";
//   this.arg = arguments[0];
//   return function(){};
// }
// foo.prototype.callName = function () {
//   console.log(this.name);
// };

// let test = myNew(foo, "hhh", "123", "saf");
// // let test = new foo("hhh", "123", "saf");
// test.callName();
// console.log(test);

//instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

// function instanceof2(left, right) {
//   const proto = left.__proto__;
//   if (proto === null) return false;
//   if (proto === right.prototype) return true;
//   return instanceof2(proto, right);
// }

// function instanceof2(left, right) {
//   let proto = left.__proto__;
//   while (true) {
//     if (proto === null) return false;
//     if (proto === right.prototype) {
//       return true;
//     }
//     proto = proto.__proto__;
//   }
// }

// function instanceof2(left, right) {
//   const prototype = right.prototype;
//   let flag = false;
//   while (left.__proto__ !== prototype) {
//     if (left.__proto__ === null) return flag = false
//     left = left.__proto__;
//   }
//   if (left.__proto__ === prototype) flag = true;
//   return flag;
// }

// function Car(make, model, year) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
// }
// const auto = new Car("Honda", "Accord", 1998);

// console.log(instanceof2(auto, Function));
// console.log(auto instanceof Function);

// console.log(instanceof2(auto, Object));

//Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
//Object.defineProperties() 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
// Object.create2 = function (proto, propertiesObject) {
//   if (typeof proto !== "object" && typeof proto !== "function") {
//     throw new TypeError("Object prototype may only be an Object: " + proto);
//   }
//   if (proto === null) {
//     throw new Error(
//       "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
//     );
//   }
//   //obj.__proto__=F.prototype=proto
//   // function F() {}
//   // F.prototype = proto;
//   // const obj = new F();

//   const obj = new Object();
//   obj.__proto__ = proto;
//   //obj.__proto__=Object.prototype;
//   //obj.__proto__=proto
//   if (propertiesObject !== undefined) {
//     Object.defineProperties(obj, propertyObject);
//   }
//   return obj;
// };
// // Shape - 父类(superclass)
// function Shape() {
//   this.x = 0;
//   this.y = 0;
// }

// // 父类的方法
// Shape.prototype.move = function (x, y) {
//   this.x += x;
//   this.y += y;
//   console.info("Shape moved.");
// };

// // Rectangle - 子类(subclass)
// function Rectangle() {
//   Shape.call(this); // call super constructor.
// }

// // 子类续承父类
// Rectangle.prototype = Object.create2(Shape.prototype); //Rectangle.prototype=new Shape

// //Rectangle.prototype.__proto__=Shape.prototype
// Rectangle.prototype.constructor = Rectangle;

// var rect = new Rectangle();
// console.log(rect.__proto__, Rectangle.prototype);

// console.log("Is rect an instance of Rectangle?", rect instanceof Rectangle); // true
// console.log("Is rect an instance of Shape?", rect instanceof Shape); // true
// rect.move(1, 1); // Outputs, 'Shape moved.'

// const person = {
//   isHuman: false,
//   printIntroduction: function () {
//     console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//   },
// };

// const me = Object.create2(person);
// // console.log(me.__proto__=== person);

// me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
// me.isHuman = true; // inherited properties can be overwritten

// me.printIntroduction();
// // expected output: "My name is Matthew. Am I human? true"

//Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
// Object.assign2 = function (target, ...source) {
//   if (Object.prototype.toString.call(target) !== "[object Object]") {
//     throw new TypeError("this is not an object!");
//   }
//   // if (target === null) {
//   //   throw new TypeError("Cannot convert undefined or null to object");
//   // }
//   let ret = target
//   source.forEach(function (item) {
//     //for...in只会遍历可枚举属性
//     for (let prop in item) {
//       if (item.hasOwnProperty(prop)) {
//         ret[prop] = item[prop];
//       }
//     }
//   });
//   return ret;
// };

//promise并行调度器

// class Scheduler {
//   constructor(limit) {
//     this.queue = [];
//     this.maxCount = limit;
//     this.runCounts = 0;
//   }
//   add(time, order) {
//     const promiseCreator = () => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log(order);
//           resolve();
//         }, time);
//       });
//     };
//     this.queue.push(promiseCreator);
//   }
//   taskStart() {
//     for (let i = 0; i < this.maxCount; i++) {
//       this.request();
//     }
//   }
//   request() {
//     if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
//       return;
//     }
//     this.runCounts++;
//     this.queue
//       .shift()()
//       .then(() => {
//         this.runCounts--;
//         this.request();
//       });
//   }
// }
// const scheduler = new Scheduler(2);
// const addTask = (time, order) => {
//   scheduler.add(time, order);
// };
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
// addTask(1000, "5");
// addTask(500, "6");
// addTask(300, "7");
// addTask(400, "8");
// scheduler.taskStart();

// 一开始1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4


function noneMatch(str){    
    let set=new Set();
    let obj={')':'(',']':'[','}':'{'}
    for(let i=0;i<str.length;i++){
        if(str[i]==='('||str[i]==='['||str[i]==='{'){
          set.add(str[i])
        }else{
            console.log(set,str[i])
            if(set.has(obj[str[i]])){
                set.delete(obj[str[i]])
            }else{
                set.add(str[i])
            }
        }
    }
    console.log(...set)
}

noneMatch('({})(]]{[]')
