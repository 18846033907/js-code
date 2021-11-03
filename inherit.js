//原型链继承
//优点：父类方法可以复用；
//缺点：父类的所有引用属性（info）会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响
//子类型实例不能给父类型构造函数传参
// function Parent() {
//   this.isShow = true;
//   this.info = {
//     name: "yhd",
//     age: 18,
//   };
// }

// Parent.prototype.getInfo = function () {
//   console.log(this.info);
//   console.log(this.isShow);
// };

// function Child() {}
// Child.prototype = new Parent();
// console.log(Child.prototype.__proto__, Parent.prototype);

// let child1 = new Child();
// let child2 = new Child();
// console.log(child1.__proto__, Child.prototype);
// child1.info.gender = "男";
// child1.getInfo(); // {name: "yhd", age: 18, gender: "男"}

// child2.getInfo(); // {name: "yhd", age: 18, gender: "男"}
// child2.isShow = false;
// console.log(child1,child2)

//构造函数继承
//优点:可以在子类构造函数中向父类传参数,父类的引用属性不会被共享
//缺点:子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），
//因此所有方法属性都写在构造函数中，每次创建实例都会初始化
// function Parent(name) {
//   this.info = { name: name };
// }
// function Child(name) {
//   //继承自Parent，并传参
//   Parent.call(this, name);

//    //实例属性
//   this.age = 18
// }

// let child1 = new Child("yhd");
// console.log(child1.info.name); // "yhd"
// console.log(child1.age); // 18

// let child2 = new Child("wxb");
// console.log(child2.info.name); // "wxb"
// console.log(child2.age); // 18
// console.log(child1,child2)

//组合继承
// function Parent(name) {
//   this.name = name;
//   this.colors = ["red", "blue", "yellow"];
// }
// Parent.prototype.sayName = function () {
//   console.log(this.name);
// };

// function Child(name, age) {
//   // 继承父类属性
//   Parent.call(this, name);
//   this.age = age;
// }
// // 继承父类方法
// Child.prototype = new Parent();
// // Child.prototype.__proto__ = Parent.prototype;

// Child.prototype.sayAge = function () {
//   console.log(this.age);
// };

// let child1 = new Child("yhd", 19);
// // child1.__proto__=Child.prototype
// child1.colors.push("pink");
// console.log(child1.colors); // ["red", "blue", "yellow", "pink"]
// child1.sayAge(); // 19
// child1.sayName(); // "yhd"

// let child2 = new Child("wxb", 30);
// console.log(child2.colors); // ["red", "blue", "yellow"]
// child2.sayAge(); // 30
// child2.sayName(); // "wxb"

//原型链继承
// function objectCopy(obj) {
//   function Fun() { };
//   Fun.prototype = obj;
//   return new Fun()
// }

// let person = {
//   name: "yhd",
//   age: 18,
//   friends: ["jack", "tom", "rose"],
//   sayName:function() {
//     console.log(this.name);
//   }
// }

// let person1 = objectCopy(person);
// person1.name = "wxb";
// person1.friends.push("lily");
// person1.sayName(); // wxb

// let person2 = objectCopy(person);
// person2.name = "gsr";
// person2.friends.push("kobe");
// person2.sayName(); // "gsr"

// console.log(person.friends); // ["jack", "tom", "rose", "lily", "kobe"]

//寄生式继承

// function objectCopy(obj) {
//   function Fun() { };
//   Fun.prototype = obj;
//   return new Fun();
// }

// function createAnother(original) {
//   let clone = objectCopy(original);
//   clone.getName = function () {
//     console.log(this.name);
//   };
//   return clone;
// }

// let person = {
//      name: "yhd",
//      friends: ["rose", "tom", "jack"]
// }

// let person1 = createAnother(person);
// person1.friends.push("lily");
// console.log(person1.friends);
// person1.getName(); // yhd

// let person2 = createAnother(person);
// console.log(person2.friends); // ["rose", "tom", "jack", "lily"]

//寄生式组合继承
// 只调用一次父类构造函数
// Child可以向Parent传参
// 父类方法可以复用
// 父类的引用属性不会被共享

// function objectCopy(obj) {
//     function Fun() { };
//     Fun.prototype = obj;
//     return new Fun();
//     //Fun.prototype=prototype.__proto__
//     //Fun.prototype=Parent.prototype
//   }

//   function inheritPrototype(child, parent) {
//     let prototype = objectCopy(parent.prototype); // 创建对象
//     prototype.constructor = child; // 增强对象
//     Child.prototype = prototype; // 赋值对象
//   }

//   function Parent(name) {
//     this.name = name;
//     this.friends = ["rose", "lily", "tom"]
//   }

//   Parent.prototype.sayName = function () {
//     console.log(this.name);
//   }

//   function Child(name, age) {
//     Parent.call(this, name);
//     this.age = age;
//   }

//   inheritPrototype(Child, Parent);
//   Child.prototype.sayAge = function () {
//     console.log(this.age);
//   }
//   let child1 = new Child("yhd", 23);
//   console.log(185,child1)
//   child1.sayAge(); // 23
//   child1.sayName(); // yhd
//   child1.friends.push("jack");
//   console.log(child1.friends); // ["rose", "lily", "tom", "jack"]

//   let child2 = new Child("yl", 22)
//   child2.sayAge(); // 22
//   child2.sayName(); // yl
//   console.log(child2.friends); // ["rose", "lily", "tom"]

//apply bind call
// let obj = {
//     name: "一个"
// }

// function allName(firstName, lastName, flag) {
//     console.log(this)
//     console.log(`我的全名是"${firstName}${this.name}${lastName}"我的座右铭是"${flag}"`)
// }
// allName.bind(obj) //不会执行
// let fn = allName.bind(obj)
// fn('我是', '前端', '好好学习天天向上')

// // 也可以这样用，参数可以分开传。bind后的函数参数默认排列在原函数参数后边
// fn = allName.bind(obj, "你是")
// fn('前端', '好好学习天天向上')

// var obj1 = {
//   a: 10,
//   fn: function (x, y) {
//     console.log(x, y);
//     console.log(this.a + x);
//   },
// };

// var obj2 = {
//   a: 20,
//   fn: function (y) {
//     console.log(this.a - y);
//   },
// };

// obj1.fn.call(obj2, 20, 30); //40

// obj1.fn.apply(obj2, [20, 30]); //40

// const bind1=obj1.fn.bind(obj2);
// bind1(20,30)

// Function.prototype.myCall = function (context, ...args) {
//     const self=this
//   const ctx = context || window;
//   ctx.fn = self;
//   console.log(212,ctx.fn,self)
//   ctx.fn(...args);
//   delete ctx.fn;
//   return;
// };
// obj1.fn.myCall(obj2, 20, 30);

// Function.prototype.myApply = function (context, args) {
//   const ctx = context || window;
//   ctx.fn = this;
//   ctx.fn(...args);
//   delete ctx.fn;
//   return;
// };

// obj1.fn.myApply(obj2, [20, 30]);

// Function.prototype.myBind = function (context) {
//   //先判断this是否是函数
//   if (typeof this !== "function") {
//     throw new Error(
//       "Function.prototype.bind - what is trying to be bound is not callable"
//     );
//   }
//   var self = this;
//   //将传递的参数列表置为数组,首位删除？
//   var args = Array.prototype.slice.call(arguments, 1);

//   var fNOP = function () {};

//   var fBound = function () {
//     //将传递的参数列表置为数组
//     var bindArgs = Array.prototype.slice.call(arguments);
//     return self.apply(
//       this instanceof fNOP ? this : context,
//       args.concat(bindArgs)
//     );
//   };

//   fNOP.prototype = this.prototype;
//   fBound.prototype = new fNOP();
//   return fBound;
// };

// const bind1 = obj1.fn.myBind(obj2, 20, 30);

//求数组中的最大值和最小值
// let arr = [12, 45, 65, 3, 23, 11, 76, 8, 9, 56, 70];
// Math.max(...arr);
// Math.min(...arr);
// console.log(Math.max.apply(null,arr));
// console.log(Math.min.apply(null,arr));

// const list = arr.sort(function (a, b) {
//   return a - b;
// });
// console.log(list[0], list[list.length - 1]);

//如何判断一个数组
// function isArray(arr) {
//   return Object.prototype.toString.call(arr) === "[object Array]";
// }

// console.log(isArray(arr));

//使用 call() 实现将类数组转化成数组

// const args = "1,2,3,4,3,2,8,3,0";

// console.log(args.length);
// const newArgs = Array.prototype.slice.myCall(args);
// console.log(newArgs);

//实现compose函数
// const compose = function (...funcs) {
//   const arrFns = Array.prototype.slice.call(funcs);
//   return function (x) {
//     return arrFns.reduceRight((pre, cur) => cur(pre), x);
//   };
// }

// const compose = function (...funcs) {
//   let result;
//   const arrFns = Array.prototype.slice.call(funcs);
//   let l = arrFns.length - 1;
//   const inner = function (x) {
//     result = arrFns[l](x);
//     if (l === 0) {
//       return result;
//     } else {
//       l--;
//       return inner(result);
//     }
//   };
//   return inner;
// };

// const add = (x) => 10 + x;
// const multi = (x) => 10 * x;

// console.log(compose(multi, multi, add, add)(2));

//查找数组公共前缀

// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。

// const strs = ["flower", "flow", "flight"];
// 输出："fl"

// const strs = ["dog", "dar", "dcar"];
// 输出：""
// 解释：输入不存在公共前缀。

// const getPubFront = (arr) => {
//   let str = arr[0];
//   let l = str.length - 1;
//   arr.map((item) => {
//     if (str.length === 0) {
//       return str;
//     }
//     const isCan = () => {
//       if (!item.startsWith(str)) {
//         console.log(str.length);
//         if (str.length === 1) {
//           str = "";
//           return;
//         }
//         str = str.slice(0, l);
//         l = str.length - 1;
//         isCan();
//       }
//     };
//     isCan();
//   });
//   return str;
// };

// const longestCommonPrefix = function (strs) {
//   const str = strs[0];
//   let index = 0;
//   while (index < str.length) {
//     const strCur = str.slice(0, index + 1);
//     for (let i = 0; i < strs.length; i++) {
//       if (!strs[i] || !strs[i].startsWith(strCur)) {
//         return str.slice(0, index);
//       }
//     }
//     index++;
//   }
//   return str;
// };

// const longestCommonPrefix = function (strs) {
//   let str = strs[0];
//   let index = 1;
//   const l = strs.length;
//   while (index < l) {
//     const curStr = strs[index];
//     while (!curStr.startsWith(str)) {
//       str = str.substr(0,str.length-1);
//     }
//     index++;
//   }
//   return str
// };

// console.log(longestCommonPrefix(strs));

// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// const s = "abcabcbb";
// 输出: 3

// const s = "bbbbb"
// 输出: 1

// const s = "pwwkew";
// 输出: 3

// const s = "";
// 输出: 0

// const longestUniq = (str) => {
//   let s = "";
//   let result = 0;
//   for (let i = 0; i < str.length; i++) {
//     const curStr = str.charAt(i);
//     while (s.includes(curStr)) {
//       s = s.substr(1);
//     }
//     s = s.concat(curStr);
//     if (s.length > result) {
//       result = s.length;
//     }
//   }
//   return result;
// };

// const longestUniq = (str) => {
//   if (str === "") {
//     return 0;
//   }
//   let left = 0;
//   let right = 1;
//   const arr = [];
//   while (right < str.length) {
//     const curStr = str.charAt(right);
//     let s = str.slice(left, right);
//     while (s.includes(curStr)) {
//       left++;
//       s = s.substr(1);
//     }
//     const num = s.concat(curStr).length;
//     arr.push(num);
//     right++;
//   }
//   return Math.max.apply(null, arr);
// };

// console.log(longestUniq(s));

//事件循环

// setTimeout(function () {
//   console.log("1");
// }, 0);
// async function async1() {
//   console.log("2");
//   const data = await async2();
//   console.log("3");
//   return data;
// }
// async function async2() {
//   return new Promise((resolve) => {
//     console.log("4");
//     resolve("async2的结果");
//   }).then((data) => {
//     console.log("5");
//     return data;
//   });
// }
// async1().then((data) => {
//   console.log("6");
//   console.log(data);
// });
// new Promise(function (resolve) {
//   console.log("7");
//   //   resolve()
// }).then(function () {
//   console.log("8");
// });

