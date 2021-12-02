//数据类型检测
//typeof
// console.log(typeof null, typeof NaN); //object,number
//instanceof 检测当前实例是否属于这个类,只要出现在当前被检测的数据原型链上，则为true，但是肆意修改原型指向会导致结果不准确，不能检测基本类型
// const arr = [];
// console.log(arr instanceof Array, arr instanceof RegExp);

// function Fn(){
//     this.x=100
// }
// Fn.prototype=Object.create(Array.prototype);
// let f=new Fn;
// console.log(f.__proto__.__proto__,Array.prototype)

function instanceof2(left, right) {
  const prototype = right.prototype;
  proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
// console.log(instanceof2([], Object));
//constructor可检测基本类型，但是constructor可任意修改
// console.log(arr.constructor===Array)
// console.log(arr.constructor===Object)

//双等号==  null==undifiend  null==null 二者都为true;三等号===
// console.log(null==undefined,null==null)//true,true
// console.log(NaN===NaN,+0===-0)//false,true

//Object.prototype.toString返回实例所属类的信息，相对靠谱的检测方式。[object Array]
// Object.prototype.toString.call();

//循环性能

// const arr = new Array(99999).fill(0);
// console.time('for~~~')
// for (let i=0; i<arr.length;i++){}
// console.timeEnd('for~~~')
// console.time('while~~~')
// let i=0;
// while(i<arr.length){i++}
// console.timeEnd('while~~~')

// console.time('foreach')
// arr.forEach(function(){})
// console.timeEnd('foreach')

//for...in  性能最差，迭代当前对象所有可枚举属性，遍历顺序以数字优先，不遍历Symbol类型，遍历公有属性（hasOwnProperty方法可判断是否为私有属性)
// console.time('forin~~')
// for(let i in arr){}
// console.timeEnd('forin~~')

// const obj = {
//   w: "o",
//   c: "2",
//   [Symbol("AA")]: "ppp",
//   1: 9,
//   0: 6,
// };
// Object.getOwnPropertySymbols(obj)//获取所有Symbol属性，Es5不兼容ie678
// for (let key in obj) {
//   console.log(key);
// }

//for...of 按照迭代器原理实现，不能遍历对象
// console.time('forof~~')
// for(let i of arr){}
// console.timeEnd('forof~~')

// const arr = [10, 20, 30];
// arr[Symbol.iterator] = function () {
//   let self = this,
//     index = 0;
//   return {
//     next() {
//       if (index > self.length - 1) {
//         return {
//           done: true,
//           value: undefined,
//         };
//       }
//       //   index+=2
//       return {
//         done: false,
//         value: self[index++],
//       };
//     },
//   };
// };
// for (let i of arr) {
//   console.log(i);
// }
// const obj={
//     1:3,
//     2:300,
//     3:900,
//     length:3
// }
// obj[Symbol.iterator]=Array.prototype[Symbol.iterator]
// for(let i of obj){
//     console.log(i)
// }

Array.prototype.forEach2 = function (callback, context) {
  const self = this;
  if (Object.prototype.toString.call(self) !== "[object Array]")
    return new TypeError("this is not an array");
  const len = self.length;
  context = context == null ? window : context;
  for (let i = 0; i < len; i++) {
    const item = self[i];
    typeof callback === "function" ? callback.call(context, item, i) : null;
  }
};

// const arr=[1,2]

// arr.forEach2(function(item){console.log(this)},10)

function compose(...args) {
  return args.reduceRight(function (pre, cur) {
    return (...arg) => cur(pre(...arg));
  });
}

// 用法如下:
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

//setTimeout实现setInterval
function myInterval(fn, delay) {
  let timer = null;
  fn(); //立即执行一次
  const interval = function () {
    timer = setTimeout(function () {
      fn();
      interval();
    }, delay);
  };
  interval();
  return {
    cancel: function () {
      clearTimeout(timer);
      timer = null;
    },
  };
}
// let a=myInterval(function () {
//   console.log(222);
// }, 1000);
// a.cancel()
function myTimeout(fn, delay) {
  let timer = null;
  timer = setInterval(function () {
    fn();
    clearInterval(timer);
    timer = null;
  });
  return {
    cancel: function () {
      clearInterval(timer);
      timer = null;
    },
  };
}

// let a=myTimeout(function () {
//   console.log(222);
// }, 1000);
// a.cancel()

//发布订阅模式
class EventEmittier {
  constructor() {
    this.events = {};
  }
  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback];
    } else {
      this.events[type].push(callback);
    }
  }
  off(type, callback) {
    this.events[type].filter(function (item) {
      return item !== callback;
    });
  }
  once(type, callback) {
    function fn() {
      callback();
      this.off(type, callback);
    }
    this.on(type, fn);
  }
  emit(type, ...rest) {
    this.events[type].forEach(function (cd) {
      cd.apply(this, rest);
    });
  }
}

//数组去重
// function uniq(arr) {
//   return [...new Set(arr)];
// }

function uniq(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }
  return result;
}

// const arr=[1,2,3,2,1,2,3,3,4,3,5]
// console.log(uniq(arr))

//数组扁平化
// function flatten(arr) {
//   return arr.reduce(function (pre, cur) {
//     return Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur];
//   }, []);
// }

function flatten(arr) {
  while (
    arr.some(function (item) {
      return Array.isArray(item);
    })
  ) {
    arr = [].concat(...arr);
  }
  return arr;
}
// const arr = [1, 2, [2, 1, 3, [4, 5]]];
// console.log(flatten(arr));

// //寄生组合继承
// function Parent(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Parent.prototype.sayName = function () {
//   console.log(264, this.name);
// };

// function Child(name) {
//   Parent.call(this);
//   this.name = name+'1';
// }

// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;

// const child1 = new Child("child1", 1);
// const child2 = new Child("child2", 2);
// console.log(child1, child2);

//实现有并行限制的 Promise 调度器
class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.limitCount = limit;
  }
  add(time, order) {
    const fn = () => {
      return new Promise((resolve) => {
        setTimeout(function () {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(fn);
  }
  taskStart() {
    for (let i = 0; i < this.limitCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCount >= this.limitCount) {
      return;
    }
    this.runCount++;
    this.queue
      .shift()()
      .then(() => {
        this.runCount--;
        this.request();
      });
  }
}

// const scheduler = new Scheduler(2);
// function addTask(time, order) {
//   scheduler.add(time, order);
// }
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");

// scheduler.taskStart();

function myNew(P, ...args) {
  const F = Object.create(P.prototype); //F.__proto__=P.prototype
  const res = P.apply(F, args);
  //若返回结果为object和function则直接返回
  if (typeof res === "object" || typeof res === "function") {
    return res;
  }
  return F;
}

// function Child(name, age) {
//   this.name = name;
//   this.age = age;
//   return function () {};
// }

// Child.prototype.sayName = function () {
//   console.log(264, this.name);
// };

// // function Child(...args) {
// //   Parent.apply(this,args);
// // }

// const child1 = new Child("kkk", 7);
// console.log(child1);
// const child2 = myNew(Child, "kkk", 7);
// console.log(child2);

//call/apply/bind

Function.prototype.myCall = function (ctx, ...args) {
  //this校验是否为function (typeof)
  const self = this;
  ctx = ctx || windows;
  const fn = Symbol();
  ctx[fn] = self;
  ctx[fn](...args);
  delete ctx[fn];
};
Function.prototype.myApply = function (ctx, args) {
  //this校验是否为function (typeof)
  const self = this;
  ctx = ctx || windows;
  const fn = Symbol();
  ctx[fn] = self;
  ctx[fn](...args);
  delete ctx[fn];
};

Function.prototype.myBind = function (ctx, ...args) {
  //this校验是否为function (typeof)
  const self = this;
  ctx = ctx || windows;
  const fn = Symbol();
  ctx[fn] = self;
  let bound = function (...arg) {
    if (this instanceof bound) {
      return ctx[fn].call(this, ...args, ...arg);
    } else {
      return ctx[fn](...args, ...arg);
    }
  };
  if (self.prototype) {
    // function F() {}
    // F.prototype = self.prototype;
    // bound.prototype = F.prototype;
    bound.prototype = self.prototype;
  }
  // bound.prototype= Object.create(self.prototype);
  return bound;
};

// function parent(a,b) {
//   console.log(this.name, this.age,a,b);
// }
// const obj={
//   name:'lll',
//   age:7
// }

// const obj = { name: "yy", age: 5 };
// function Parent(name, age) {
//   this.name = name;
//   this.age = age;
// }
// Parent.prototype.sayName = function () {
//   console.log(this.name);
// };
// const Child1 = Parent.bind(obj);
// const Child2 = Parent.myBind(obj);
// const child1 = new Child1("qq");
// console.log(child1);
// const child2 = new Child2("qq");
// console.log(child2);

// const p1 = parent.myCall(this, "ii", 9);
// const p2 = parent.call(this, "ii", 9);

// const p1 = parent.myApply(this, ["ii", 9]);
// const p2 = parent.apply(this, ["ii", 9]);

// const p1 = parent.bind(obj, 2);
// p1(6);
// const p2 = parent.myBind(obj, 2);
// p2(6);
//深拷贝、浅拷贝
function shallowCopy(obj) {
  // Object.getOwnPropertySymbols(obj)//获取所有Symbol属性，Es5不兼容ie678
  let newObj = {};
  const arr = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
  for (let key in arr) {
    const prop = arr[key];
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

// const obj = {
//   name: "pp",
//   3: "fff",
//   [Symbol("f")]: 4,
//   2: [3,4,5],
//   pp: {age:4},
// };

// const o1=shallowCopy(obj);
// o1.pp.age=9
// const o2=shallowCopy(obj);
// console.log(o1,o2)

function deepCopy(obj) {
  if (typeof obj !== "object") throw new Error();
  let newObj = Array.isArray(obj) ? [] : {};
  const arr = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
  for (let key in arr) {
    const prop = arr[key];
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === "object") {
        newObj[prop] = deepCopy(obj[prop]);
      } else {
        newObj[prop] = obj[prop];
      }
    }
  }
  return newObj;
}
// const obj = {
//   name: "pp",
//   3: "fff",
//   [Symbol("f")]: 4,
//   2: [3, 4, 5],
//   pp: { age: 4 },
// };

// const o1 = deepCopy(obj);
// o1.pp.age = 9;
// o1['2'].push(6)
// const o2 = deepCopy(obj);
// console.log(o1, o2);
// function instanceof2(left, right) {
//   const proto = left.__proto__,
//     prototype = right.prototype;
//   if (proto === null) return false;
//   if (proto === prototype) {
//     return true;
//   }
//   return instanceof2(proto, right);
// }

// function instanceof2(left, right) {
//   const prototype = right.prototype;
//   while (true) {
//     const proto = left.__proto__;
//     if (proto === null) return false;
//     if (proto === prototype) return true;
//     left = proto;
//   }
// }

// console.log(instanceof2([], Function));

//柯里化
function curry(fn, ...args) {
  const fnc = function (...arg) {
    if (fn.length === arg.length) return fn(...arg);
    return fnc(...args, ...arg);
  };
  return fnc;
}
// function add(x, y, z) {
//   return x + y + z;
// }
// const cu = curry(add, 1);
// const res = cu(2,3);
// console.log(res);
//冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const cur = arr[j],
        next = arr[j + 1];
      if (cur > next) {
        arr[j] = next;
        arr[j + 1] = cur;
      }
    }
  }
  return arr;
}
//选择排序
function selectSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const cur = arr[i],
        item = arr[j];
      if (cur > item) {
        arr[i] = item;
        arr[j] = cur;
      }
    }
  }
  return arr;
}

//插入排序
function insertSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const cur = arr[i];
    let perIndex = i - 1;
    while (perIndex >= 0 && arr[perIndex] > cur) {
      arr[perIndex + 1] = arr[perIndex];
      perIndex--;
    }
    arr[perIndex + 1] = cur;
  }
  return arr;
}

//归并排序
function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  const middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());
  return result;
}

//快速排序
function quickSort(arr, left, right) {
  var len = arr.length,
    partitionIndex,
    left = typeof left != "number" ? 0 : left,
    right = typeof right != "number" ? len - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  // 分区操作
  var pivot = left, // 设定基准值（pivot）
    index = pivot + 1;
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [3, 4, 2, 1, 7, 8, 95, 5];
console.log(mergeSort(arr));
