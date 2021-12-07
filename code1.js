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

// function compose(...args) {
//   let result;
//   return function (x) {
//     result = x;
//     while (args.length > 0) {
//       result = args.pop()(result);
//     }
//     return result;
//   };
// }


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

// const arr = [3, 4, 2, 1, 7, 8, 95, 5];
// console.log(mergeSort(arr));

//二分查找

function search(arr, target, start, end) {
  let targetIndex = -1;
  let mid = Math.floor((start + end) / 2);
  const middle = arr[mid];
  if (middle === target) {
    targetIndex = mid;
    return targetIndex;
  }
  if (start >= end) {
    return targetIndex;
  }
  if (middle > target) {
    return search(arr, target, start, mid - 1);
  } else {
    return search(arr, target, mid + 1, end);
  }
}

// const dataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const position = search(dataArr, 6, 0, dataArr.length - 1);
// if (position !== -1) {
//   console.log(`目标元素在数组中的位置:${position}`);
// } else {
//   console.log("目标元素不在数组中");
// }

// 实现一个LazyMan
class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      // 把 this.next() 放到调用栈清空之后执行
      this.next();
    }, 0);
  }
  next = () => {
    const task = this.tasks.shift();
    task && task();
  };
  sleep = (time) => {
    this._sleepWrapper(time, false);
    return this;
  };

  sleepFirst = (time) => {
    this._sleepWrapper(time, true);
    return this;
  };

  _sleepWrapper = (time, bool) => {
    const task = () => {
      setTimeout(() => {
        console.log("Wake up after " + time);
        this.next();
      }, time * 1000);
    };
    if (bool) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  };

  eat = (name) => {
    this.tasks.push(() => {
      console.log("Eat " + name + "~");
      this.next();
    });
    return this;
  };
}

function LazyMan(name) {
  return new _LazyMan(name);
}
// LazyMan("Hank");
// Hi! This is Hank!

// LazyMan("Hank").sleep(10).eat("dinner");
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan("Hank").eat("dinner").eat("supper");
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan("Hank").eat("supper").sleepFirst(5);
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

//版本号排序：
// 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。
// 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

function versionSort(arr) {
  const newArr = arr.sort(function (left, right) {
    let index = 0;
    const arr1 = left.split(".");
    const arr2 = right.split(".");
    while (true) {
      const s1 = arr1[index];
      const s2 = arr2[index];
      index++;
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
  return newArr;
}

// const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];
// console.log(versionSort(arr));

//LRU算法
//  一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看
class LRUCache {
  constructor(limit) {
    this.cache = new Map();
    this.limit = limit;
  }
  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    } else {
      return -1;
    }
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    } else if (this.cache.size < this.limit) {
      this.cache.set(key, value);
    } else {
      this.cache.set(key, value);
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}
// let cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// console.log("cache.get(1)", cache.get(1))// 返回  1
// cache.put(3, 3);// 该操作会使得密钥 2 作废
// console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
// cache.put(4, 4);// 该操作会使得密钥 1 作废
// console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
// console.log("cache.get(3)", cache.get(3))// 返回  3
// console.log("cache.get(4)", cache.get(4))// 返回  4

// 实现一个 add 方法 使计算结果能够满足如下预期： add(1)(2)(3)()=6 add(1,2,3)(4)()=10
function _add(x, y) {
  return x + y;
}
function add(...args) {
  let allArgs = [...args];
  function fn(...newArgs) {
    if (newArgs.length === 0) {
      return allArgs.reduce(_add);
    } else {
      allArgs = [...allArgs, ...newArgs];
      return fn;
    }
  }
  return fn;
}

// console.dir(add(1)(2, 3)());
// add(1,2,3)(4)()
function getN(num, target) {
  let n = 2;
  while (num * n < target) {
    n++;
  }
  return n - 1;
}

// function coinsChange(arr, target) {
//   let result = [],
//     ret = target;
//   const newArr = arr.sort(function (a, b) {
//     return b - a;
//   });
//   for (let key of newArr) {
//     const cur = key;
//     if (ret <=0) return;
//     if (cur <= ret) {
//       const n = getN(cur, ret);
//       let tempArr = Array(n).fill(cur, 0, n);
//       result = result.concat(tempArr);
//       ret = ret - cur*n;
//     }
//   }
//   if (ret !== 0) return -1;
//   return result;
// }

// const coinChange = function (coins, amount) {
//   // 用于保存每个目标总额对应的最小硬币个数
//   const f = [];
//   // 提前定义已知情况
//   f[0] = 0;
//   // 遍历 [1, amount] 这个区间的硬币总额
//   for (let i = 1; i <= amount; i++) {
//     // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
//     f[i] = Infinity;
//     // 循环遍历每个可用硬币的面额
//     for (let j = 0; j < coins.length; j++) {
//       // 若硬币面额小于目标总额，则问题成立
//       if (i - coins[j] >= 0) {
//         // 状态转移方程
//         f[i] = Math.min(f[i], f[i - coins[j]] + 1);
//       }
//     }
//   }
//   // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
//   if (f[amount] === Infinity) {
//     return -1;
//   }
//   // 若有解，直接返回解的内容
//   return f[amount];
// };

// const arr = [1,3,5],
//   target = 11;
// console.log(coinsChange(arr, target));

function dom2Json(domTree) {
  let obj = {};
  obj.tag = domTree.tagName;
  obj.children = [];
  if (domTree.childNodes) {
    domTree.childNodes.forEach((child) => {
      return obj.children.push(dom2Json(child));
    });
  }
  return obj;
}

// const domtree = document.getElementById("domtree");

// console.log(dom2Json(domtree));

// {
//   tag: 'DIV',
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }

//类数组转化为数组
// const arrayLike=document.querySelectorAll('div')
// console.log([...arrayLike])
// console.log(Array.from(arrayLike))
// console.log(Array.prototype.slice.call(arrayLike));
// console.log(Array.prototype.concat.apply(arrayLike))
// console.log(Array.apply(null,arrayLike))

//Object.is实现  可用===
Object.is = function (x, y) {
  if (x === y) {
    // 当前情况下，只有一种情况是特殊的，即 +0 -0
    // 如果 x !== 0，则返回true
    // 如果 x === 0，则需要判断+0和-0，则可以直接使用 1/+0 === Infinity 和 1/-0 === -Infinity来进行判断
    return x !== 0 || 1 / x === 1 / y;
  }

  // x !== y 的情况下，只需要判断是否为NaN，如果x!==x，则说明x是NaN，同理y也一样
  // x和y同时为NaN时，返回true
  return x !== x && y !== y;
};

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

//AJAX
function getJson(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader("Content-type", "application/json");
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

//渲染百万条结构简单的大数据时 怎么使用分片思想优化渲染
// let ul = document.getElementById("container");
// let total = 100000;
// let once = 20;
// let page = total / once;
// let index = 0;
// function loop(curtotal, curIndex) {
//   let pageCount = Math.min(curtotal, once);
//   window.requestAnimationFrame(function () {
// let fragment = document.createDocumentFragment();
//     for (let i = 0; i < pageCount; i++) {
//       const li = document.createElement("li");
//       li.innerText= `${curIndex+i}:${~~(Math.random() * total)}`;
//       // li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
//       fragment.appendChild(li);
//     }
//     ul.appendChild(fragment);
//     loop(curtotal - pageCount, curIndex + pageCount);
//   });
// }
// loop(total, index);

//JSON 格式的虚拟 Dom 怎么转换成真实 Dom
function JSON2Dom(vnode) {
  const { tag, attrs, children } = vnode;
  let dom = document.createElement(tag);
  if (attrs) {
    for (let key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        dom.setAttribute(key, attrs[key]);
      }
    }
  }
  if (children.length > 0) {
    children.forEach((item) => {
      const child = JSON2Dom(item);
      dom.appendChild(child);
    });
  }
  return dom;
}

function _render(vnode) {
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  if (vnode.children.length > 0) {
    vnode.children.forEach((item) => {
      dom.appendChild(_render(item));
    });
  }
  return dom;
}

// const json = {
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

// const dom=JSON2Dom(json)
// let container = document.getElementById("container");
// container.append(dom)

//实现模板字符串解析功能
function render(template, data) {
  let reg = /\{\{(\w+)\}\}/g;
  const str = template.replace(reg, function (match, key) {
    return data[key];
  });
  return str;
}
// let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
// let data = {
//   name: "姓名",
//   age: 18,
// };
// console.log(render(template, data)); // 我是姓名，年龄18，性别undefined
//实现一个对象的flatten方法

function isObj(obj) {
  if (typeof obj === "object") return true;
  return false;
}
//for...in循环读取键名，for...of循环读取键值
function flattenObj(obj) {
  if (!isObj(obj)) return new Error();
  let newObj = {};
  const dns = function (cur, prefix) {
    if (isObj(cur)) {
      if (Array.isArray(cur)) {
        for (let key in cur) {
          dns(cur[key], `${prefix}[${key}]`);
        }
      } else {
        for (let key in cur) {
          if (cur.hasOwnProperty(key)) {
            dns(cur[key], `${prefix ? prefix + "." : ""}${key}`);
          }
        }
      }
    } else {
      newObj[prefix] = cur;
    }
  };
  dns(obj, "");
  return newObj;
}
// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: { e: 5 },
//   },
//   b: [1, 3, { a: 2, b: 3 }],
//   c: 3,
// };

// console.log(flattenObj(obj));
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

let a = "9007199254740991";
let b = "4567899999999999";
function add(a, b) {
  const maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, 0);
  b = b.padStart(maxLength, 0);
  let f = 0;
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const temp = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(temp / 10);
    sum = (temp % 10) + sum;
  }
  if (f !== 0) {
    sum = f + sum;
  }
  return sum;
}

// console.log(add(a, b));
//列表转成树形结构
function list2tree(list) {
  let treeData = [];
  let temp = {};
  let len = list.length;
  for (let i = 0; i < len; i++) {
    const item = list[i];
    temp[item.id] = item;
  }
  for (let key in temp) {
    const item = temp[key];
    if (item.parentId != 0) {
      if (!temp[item.parentId].children) {
        temp[item.parentId].children = [];
      }
      temp[item.parentId].children.push(item);
    } else {
      treeData.push(item);
    }
  }
  return treeData;
}
// const list = [
//   {
//     id: 1,
//     text: "节点1",
//     parentId: 0, //这里用0表示为顶级节点
//   },
//   {
//     id: 2,
//     text: "节点1_1",
//     parentId: 0, //通过这个字段来确定子父级
//   },
//   {
//     id: 3,
//     text: "节点1_1",
//     parentId: 1, //通过这个字段来确定子父级
//   },
//   {
//     id: 4,
//     text: "节点1_1",
//     parentId: 1, //通过这个字段来确定子父级
//   },
// ];
// list2tree(list);

//树形结构转成列表 for...in不建议用于数组
function tree2list(tree) {
  let listData = [];
  const dns = function (data) {
    data.forEach((item) => {
      const { children = [] } = item;
      if (children.length > 0) {
        dns(children);
        delete item.children;
      }
      listData.push(item);
    });
  };
  dns(tree);
  return listData;
}
// const tree = [
//   {
//     id: 1,
//     text: "节点1",
//     parentId: 0,
//     children: [
//       {
//         id: 2,
//         text: "节点1_1",
//         parentId: 1,
//       },
//       {
//         id: 3,
//         text: "节点1_1",
//         parentId: 1,
//       },
//     ],
//   },
// ];
// tree2list(tree);
