// 用setInterval实现setTimeout
// const mySetTimeout = (fn, delay) => {
//   let timer = null;
//   timer = setInterval(() => {
//     clearInterval(timer);
//     fn();
//   }, delay);
// };
// mySetTimeout(() => {
//   console.log("setTimeout");
// }, 1000);

//用setTimeout实现setInterval
// const mySetInterval = (fn, delay) => {
//   let timer = null;
//   const interval = () => {
//     fn();
//     timer = setTimeout(interval, delay);
//   };
//   interval();
// };
// mySetInterval(() => {
//   console.log("setInterval");
// }, 2000);

//数组扁平化
// function flatter(arr) {
//   if (!arr.length) return;
//   return arr.reduce(
//     (pre, cur) =>
//       Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur],
//     []
//   );
// }
// function flatter(arr) {
//   if (!arr.length) return;
//   while (arr.some((item) => Array.isArray(item))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }
// console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

// const res = [
//   {
//     code: 1,
//     name: "湖北省",
//     children: [
//       {
//         code: 1,
//         name: "武汉市",
//         children: [
//           {
//             code: 1,
//             name: "汉阳区",
//             children: [
//               {
//                 code: 1,
//                 name: "水上分局1",
//               },
//             ],
//           },
//           {
//             code: 1,
//             name: "武昌区",
//             children: [
//               {
//                 code: 1,
//                 name: "水上分局2",
//               },
//             ],
//           },
//           {
//             code: 1,
//             name: "汉口区",
//             children: [
//               {
//                 code: 1,
//                 name: "水上分局3",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         code: 1,
//         name: "十堰市",
//         children: [
//           {
//             code: 1,
//             name: "郧阳区",
//             children: [
//               {
//                 code: 1,
//                 name: "安阳镇",
//               },
//             ],
//           },
//           {
//             code: 1,
//             name: "茅箭区",
//             children: [
//               {
//                 code: 1,
//                 name: "小川乡",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
// //递归获取当前子节点的所有父节点
// const getPath = (tree, id) => {
//   const path = [];
//   const forFn = (tree) => {
//     for (const item of tree) {
//       const { name, children } = item;
//       path.push(name);
//       if (name === id) return path;
//       if (children) {
//         forFn(children);
//       }
//       if (path.includes(id)) return path;
//       path.pop();
//     }
//   };
//   forFn(tree);
//   return path;
// };
// console.log(getPath(res, "小川乡"));

// //防抖,一定时间只执行最后一次
// function debounce(fn, delay) {
//   let timer=null;
//   return function () {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn();
//     }, delay);
//   };
// }

// //节流，一定时间内执行一次
// function throttle(fn,delay) {
//   let timer=null;
//   return function () {
//     if (timer) return;
//     timer = setTimeout(() => {
//       fn();
//       timer=null;
//     }, delay);
//   };
// }

// window.onload=function(){
//   function addNum() {
//   console.log("1");
// }
// const btn=document.getElementById('btn');
// btn.addEventListener('click',throttle(addNum,2000));
// }

//实现对象的flatten
// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: { e: 5 },
//   },
//   b: [1, 3, { a: 2, b: 3 }],
//   c: 3,
// };
// const isObject = (obj) => {
//   return typeof obj === "object" && obj !== null;
// };

// const flattenObj = (obj) => {
//   if (!isObject(obj)) return;
//   let res = {};
//   const dfs = (cur, prefix) => {
//     if (isObject(cur)) {
//       if (Array.isArray(cur)) {
//         //obj为数组时
//         cur.map((item, index) => {
//           dfs(item, prefix + "[" + index + "]");
//         });
//       } else {
//         //obj为对象时
//         for (const prop in cur) {
//           if (prefix) {
//             dfs(cur[prop], prefix + "." + prop);
//           } else {
//             dfs(cur[prop], prop);
//           }
//         }
//       }
//     } else {
//       res[prefix] = cur;
//     }
//   };
//   dfs(obj, "");
//   return res;
// };

// console.log(flattenObj(obj));

//虚拟dom转成真实dom
// const domObj = {
//   tag: "DIV",
//   attrs: {
//     id: "app",
//   },
//   children: [
//     {
//       tag: "SPAN",
//       children: [{ tag: "A", children: [] }],
//     },
//     {
//       tag: "SPAN",
//       children: [
//         { tag: "A", children: [] },
//         { tag: "A", children: [] },
//       ],
//     },
//   ],
// };

// const isObject = (domObj) => {
//   return Object.prototype.toString.call(domObj) === "[object Object]";
// };

// const convertToDom = (domObj) => {
//   if (!isObject(domObj)) return;
//   const { tag, attrs, children } = domObj;
//   //创建标签
//   const curTag = document.createElement(tag.toLowerCase());
//   //标签加属性
//   if (isObject(attrs)) {
//     for (const prop in attrs) {
//       curTag.setAttribute(prop, attrs[prop]);
//     }
//   }
//   //若有children，先遍历，然后每个再执行以下当前函数
//   if (Array.isArray(children) && children.length > 0) {
//     for (const item of children) {
//       curTag.append(convertToDom(item));
//     }
//   }
//   return curTag;
// };

// document.body.append(convertToDom(domObj));

//实现new操作符
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// const children = new Person('sad');

// const myNew = (fn,...args) => {
//   let obj = Object.create(fn.prototype);
//   let res = fn.call(obj,...args);
//   if (res && (typeof res === "object" || typeof res === "function")) {
//     return res;
//   }
//   return obj;
// };
// const children = myNew(Person, "hah", 2);

// console.log(children.name, Person);

//实现bind、apply和call

// Function.prototype.call2=(...args)=>{

// }
