//数据类型的判断
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
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
//深拷贝
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
// const obj2 = cloneCopy(obj);
// obj1.arr[1] = [5, 6, 7];
// console.log(obj1, obj);

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
//     const arr = reg.exec(str);
//     const key = arr[1];
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

//图片懒加载

// let imgList = [...document.querySelectorAll("img")];
// let length = imgList.length;

// // 修正错误，需要加上自执行
// const imgLazyLoad = (function () {
//   let count = 0;
//   return function () {
//     let deleteIndexList = [];
//     imgList.forEach((img, index) => {
//       let rect = img.getBoundingClientRect();
//       if (rect.top < window.innerHeight) {
//         img.src = img.dataset.src;
//         deleteIndexList.push(index);
//         count++;
//         if (count === length) {
//           document.removeEventListener("scroll", imgLazyLoad);
//         }
//       }
//     });
//     imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
//   };
// })();

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
//         timeout = null;
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

//函数柯里化:举个例子
// function add(a, b, c) {
//   return a + b + c
// }
// add(1, 2, 3)
// let addCurry = curry(add)
// addCurry(1)(2)(3)

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
// //偏函数实现

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
//   let i = init ? 0 : 1;
//   let res = init ? init : _this[i];
//   if (typeOf(init) === "number") {
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

// const arr = [1, 2, 3, 4];
// const mapArr = arr.reduce2((pre, cur) => {
//   return pre + cur;
// }, 9);
// console.log(mapArr);
