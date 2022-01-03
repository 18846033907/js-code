//compose
function compose(...args) {
  return args.reduceRight(function (pre, cur) {
    return (...arg) => cur(pre(...arg));
  });
}
//setTimeout写setInterval
function mysetInterval(fn, delay, im) {
  let timer = null;
  let init = false;
  const interval = function () {
    if (im && !init) {
      fn();
      init = true;
    }
    timer = setTimeout(() => {
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

//setInterval写setTimeout
function mysetTimeout(fn, delay) {
  let timer = null;
  timer = setInterval(() => {
    fn();
    clearInterval(timer);
  }, delay);
}

//发布订阅模式
class EventEmittier {
  constructor() {
    this.events = {};
  }
  on(name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb);
    }
    this.events[(name = [cb])];
  }
  off(name, cb) {
    this.events[name].filter((item) => {
      return item !== cb;
    });
  }
  once(name, cb) {
    const fn = function () {
      cb();
      this.off(name, fn);
    };
    this.on(name, fn);
  }
  emit(name, ...args) {
    this.events[name] &&
      this.events[name].forEach((fn) => {
        fn.apply(this, args);
      });
  }
}

//数组去重
function uniq(arr) {
  const len = arr.length;
  let result = [];
  for (let i = 0; i < len; i++) {
    const cur = arr[i];
    if (result.indexOf(cur) === -1) {
      result.push(cur);
    }
  }
  return result;
}
function uniq1(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

// const uniqArr=[2,4,3,2,1,4,5,3,2,2]
// console.log(uniq(uniqArr),uniq1(uniqArr))

//数组扁平化
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur];
  }, []);
}
function flatten1(arr, deep) {
  let newArr = arr;
  if (deep > 0) {
    while (
      newArr.some((item) => {
        return Array.isArray(item);
      }) &&
      deep > 0
    ) {
      newArr = [].concat(...newArr);
      deep--;
    }
  } else {
    newArr = newArr.reduce((pre, cur) => {
      return Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur];
    }, []);
  }

  return newArr;
}

const flattenArr = [2, 3, [3, 4, 5], 4, [8, 4], [8, [9, 3]]];
console.log(flatten1(flattenArr, 1));
// console.log(flatten(flattenArr),flatten1(flattenArr))

//寄生组合继承
// function Parent(name, age) {
//   this.name = name;
//   this.age = age;
// }
// Parent.prototype.sayName = function () {
//   console.log(this.name);
// };

// function Child(...args) {
//   Parent.apply(this, args);
// }
// Child.prototype = Object.create(Parent.prototype);
// const c1 = new Child("c1", 5);
// const c2 = new Child("c2", 2);
// console.log(c1, c2);

//实现有并行限制的promise调度器
class Scheduler {
  constructor(limit) {
    this.tasks = [];
    this.limit = limit;
    this.runcounts = 0;
  }
  add(order, time) {
    const promiseFn = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.tasks.push(promiseFn);
  }
  startTasks() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }
  request() {
    if (!this.tasks || !this.tasks.length || this.runcounts >= this.limit)
      return;
    this.runcounts++;
    this.tasks
      .shift()()
      .then(() => {
        this.runcounts--;
        this.request();
      });
  }
}

// const scheduler = new Scheduler(2);
// scheduler.add("1", 1000);
// scheduler.add("2", 500);
// scheduler.add("3", 400);
// scheduler.add("4", 300);

// scheduler.startTasks();

//实现new
function myNew(obj, ...args) {
  const newObj = new Object();
  newObj.__proto__ = obj.prototype;
  const res = obj.apply(newObj, args);
  if (typeof res === "object" || typeof res === "function") return res;
  return newObj;
}
//实现call、apply、bind
Function.prototype.call2 = function (ctx, ...args) {
  ctx = ctx || window;
  const fn = Symbol();
  ctx[fn] = this;
  const res = ctx[fn](...args);
  delete ctx[fn];
  return res;
};
Function.prototype.apply2 = function (ctx, args) {
  ctx = ctx || window;
  const fn = Symbol();
  ctx[fn] = this;
  const res = ctx[fn](...args);
  delete ctx[fn];
  return res;
};
Function.prototype.bind2 = function (ctx, ...args) {
  ctx = ctx || window;
  const self = this;
  const bound = function (...arg) {
    const params = args.concat(arg);
    if (this instanceof bound) {
      return self.apply(this, params);
    } else {
      return self.apply(ctx, params);
    }
  };
  return bound;
};
//深拷贝（考虑到symbol）浅拷贝
function shallowCopy(obj) {
  //判断obj是否是对象
  const newObj = new Object();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

function deepCopy(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  const newObj = Array.isArray(obj) ? [] : {};
  const keys = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
  for (let key of keys) {
    if (obj.hasOwnProperty(key)) {
      const cur = obj[key];
      if (typeof cur === "object") {
        newObj[key] = deepCopy(cur);
      } else {
        newObj[key] = cur;
      }
    }
  }
  return newObj;
}

//instanceof
function instanceof2(left, right) {
  const proto = right.prototype;
  while (true) {
    if (left.__proto__ === null) return false;
    if (left.__proto__ === proto) return true;
    left = left.__proto__;
  }
}

//柯里化
function curry(fn) {
  const judge = function (...arg) {
    if (arg.length === fn.length) {
      return () => fn(...arg);
    }
    return (...args) => judge(...arg, ...args);
  };
  return judge;
}

// function add(x,y,z){
//   return x+y+z
// }
// const add1=curry(add);
// console.log(add1(1)(2)(3)())

//偏函数
function partial(fn, ...args) {
  const judge = function (...arg) {
    return () => fn(...args, ...arg);
  };
  return judge;
}
// const add2=partial(add,1);
// console.log(add2(2,3)())

//冒泡排序,两两相邻交换，n*n
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const temp = arr[j];
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// const arr = [6, 4, 5, 6, 2, 3, 4, 8, 90, 1];
// console.log(bubbleSort(arr))

//选择排序,当前值后面最小值交换
function selectSort(arr) {
  let len = arr.length,
    minIndex,
    temp;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      temp = arr[minIndex];
      arr[minIndex] = arr[j];
      arr[j] = temp;
    }
  }
  return arr;
}

// const arr = [6, 4, 5, 6, 2, 3, 4, 8, 90, 1];
// console.log(selectSort(arr));

//插入排序，当前值前面插在小于当前值后面
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1);
      } else {
        break;
      }
    }
  }
  return arr;
}

// const arr = [6, 4, 5, 6, 2, 3, 4, 8, 90, 1];
// console.log(insertSort(arr));

//快速排序
function quickSort(arr, l, r) {
  if (arr.length < 2) return;
  let len = arr.length;
  l = typeof l === "number" ? l : 0;
  r = typeof r === "number" ? r : len - 1;
  if (l < r) {
    const p = partition(arr, l, r);
    quickSort(arr, l, p - 1);
    quickSort(arr, p + 1, r);
  }

  return arr;
}
function partition(arr, l, r) {
  let j = l;
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < arr[l]) {
      swap(arr, i, ++j);
    }
  }
  swap(arr, l, j);
  return j;
}

// const arr = [6, 4, 5, 6, 2, 3, 4, 8, 90, 1];
// console.log(quickSort(arr));
//归并排序
function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;
  let mid = Math.floor(len / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

// const arr = [6, 4, 5, 6, 2, 3, 4, 8, 90, 1];
// console.log(mergeSort(arr));

//二分查找
function search(arr, target, start, end) {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

// const arr = [1, 2, 3, 4, 6, 7, 9, 10];
// const target = 10;
// console.log(search(arr, target, 0, arr.length));

//实现lazyman
class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi,This is ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  sleep(time) {
    this._sleepWrapper(time, false);
    return this;
  }
  eat(str) {
    const fn = () => {
      console.log(`Eat ${str}`);
      this.next();
    };
    this.tasks.push(fn);
    return this;
  }
  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }

  _sleepWrapper(time, bool) {
    const fn = () => {
      setTimeout(() => {
        console.log(`wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    if (bool) {
      this.tasks.unshift(fn);
    } else {
      this.tasks.push(fn);
    }
  }
  next() {
    console.log(465, this.tasks);
    const task = this.tasks.shift();
    task && task();
  }
}
function LazyMan(name) {
  return new _LazyMan(name);
}

// LazyMan("Hank");

// LazyMan("Hank").sleep(10).eat("dinner");

// LazyMan("Hank").eat("dinner").eat("supper");

// LazyMan("Hank").eat("supper").sleepFirst(5);

//防抖节流
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

function throttle(fn, delay) {
  let pre = new Date().getTime();
  return function () {
    const now = new Date().getTime();
    const ctx = this;
    const args = arguments;
    if (now - pre >= delay) {
      fn.call(ctx, ...args);
      pre = now;
    }
  };
}

//版本号排序
function versionSort(arr) {
  const newArr = arr.sort(function (a, b) {
    let arr1 = a.split(".");
    let arr2 = b.split(".");
    let i = 0;
    while (true) {
      let s1 = arr1[i];
      let s2 = arr2[i];
      i++;
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
  return newArr;
}

// const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];
// console.log(versionSort(arr));

//LRU算法
class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.queue = new Map();
  }
  get(key) {
    let value = -1;
    if (this.queue.has(key)) {
      value = this.queue.get(key);
      this.queue.delete(key);
      this.queue.set(key, value);
    }
    return value;
  }
  put(key, value) {
    if (this.queue.has(key)) {
      this.queue.delete(key);
      this.queue.set(key, value);
    } else if (this.queue.size < this.limit) {
      this.queue.set(key, value);
    } else {
      this.queue.delete(this.queue.keys().next().value);
      this.queue.set(key, value);
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

//题目描述:实现一个 add 方法 使计算结果能够满足如下预期： add(1)(2)(3)()=6 add(1,2,3)(4)()=10
function _add(x, y) {
  return x + y;
}
function add(...args) {
  const fn = function (...params) {
    return (...arg) => {
      if (arg.length === 0) {
        const arr = [...args, ...params];
        return arr.reduce(_add);
      }
      return fn(...params, ...arg);
    };
  };
  return fn;
}
// console.log(add(1)(2)(3)(8)());
//动态规划求解硬币问题：题目描述:给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1
const coins = [1, 2, 5];
const amount = 11;
function coinsChange(coins, amount) {
  let memo = Array(amount + 1).fill(Infinity);
  memo[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        memo[i] = Math.min(memo[i], memo[i - coins[j]] + 1);
      }
    }
  }
  console.log(memo);
  return memo[amount];
}

// console.log(coinsChange(coins,amount))

//请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式
function dom2json(domTree) {
  console.log(615, domTree.tagName, domTree.attributes);
  let obj = {};
  if (domTree.tagName) {
    obj.name = domTree.tagName;
    obj.children = [];
    if (domTree.childNodes.length > 0) {
      domTree.childNodes.forEach((child) => {
        obj.children.push(dom2json(child));
      });
    }
  }
  return obj;
}

// const domTree = document.getElementById("domtree");
// console.log(dom2json(domTree));

//类数组转化成数组
function likeArr2Arr(likeArr) {
  let arr = [];
  // arr=Array.prototype.slice.call(likeArr);
  // arr=Array.from(likeArr);
  // arr=[...likeArr];
  arr = Array.apply(null, likeArr);
  return arr;
}
// const likeArr='23piriu'
// console.log(likeArr2Arr(likeArr))

//Object.is实现
Object.is = function (x, y) {
  if (x === y) {
    //判断+0和-0；
    return x !== 0 || 1 / x === 1 / y;
  } else {
    //判断NaN
    return x !== x && y !== y;
  }
};
//AJAX
function getJson(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange(function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    });
  });
}

//分片思想解决大数据量渲染问题
function renderBigData() {
  const total = 100000;
  let pageSize = 20;
  let page = total / pageSize;
  let index = 0;
  let ul = document.getElementById("ul");
  function loop() {
    if (index > page) return;
    let pageCount = Math.min(pageSize, total - pageSize * index);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < pageCount; i++) {
      const li = document.createElement("li");
      li.innerHTML = `${pageSize * index}.${i}`;
      frag.appendChild(li);
    }
    window.requestAnimationFrame(() => {
      ul.appendChild(frag);
      index++;
      loop();
    });
  }
  loop();
}
// renderBigData();
//将虚拟Dom转化为真实Dom
function json2dom(vnode) {
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  const { tag, attrs, children } = vnode;
  const dom = document.createElement(tag);
  if (attrs) {
    for (let key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        dom.setAttrbute(key, attrs[key]);
      }
    }
  }
  if (children.length > 0) {
    children.forEach((child) => dom.appendChild(json2dom(child)));
  }
}

//实现模板解析字符串
function parseStr(str, data) {
  const reg = /\{\{(\w+)\}\}/g;
  return str.replace(reg, function (match, key) {
    return data[key];
  });
}
// const str = "我是{{name}},性别{{sex}},年龄{{age}}";
// const obj = { name: "ll", age: 9, sex: "男" };
// console.log(parseStr(str, obj));

//实现一个对象的flatten方法
function flattenObj(obj) {
  //判断是否是对象
  let res = {};
  const dns = function (cur, prefix) {
    if (typeof cur === "object") {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dns(item, `${prefix}[${index}]`);
        });
      } else {
        for (let key in cur) {
          if (cur.hasOwnProperty(key)) {
            dns(cur[key], `${prefix}${prefix ? "." : ""}${key}`);
          }
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dns(obj, "");
  return res;
}
// const obj = {
//   a: {
//          b: 1,
//          c: 2,
//          d: {e: 5}
//      },
//   b: [1, 3, {a: 2, b: 3}],
//   c: 3
//  }

//  console.log(flattenObj(obj))
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

//列表转成树形结构
function list2tree(list) {
  let res = [];
  const getChildren = (id, list) => {
    const children = [];
    for (let node of list) {
      const { pid } = node;
      if (id === pid) {
        children.push(node);
      }
    }
    for (let node of children) {
      const children = getChildren(node.id, list);
      if (children.length > 0) {
        node.children = children;
      }
    }
    return children;
  };
  for (let node of list) {
    const { id, pid } = node;
    if (!pid) {
      const p = { ...node };
      p.children = getChildren(id, list);
      res.push(p);
    }
  }
  return res;
}
const listData = [
  {
    id: "p1",
    title: "广东",
  },
  {
    id: "p1-1",
    pid: "p1",
    title: "广州",
  },
  {
    id: "p2",
    title: "四川",
  },
  {
    id: "p2-1",
    pid: "p2",
    title: "成都",
  },
  {
    id: "p2-2",
    pid: "p2",
    title: "德阳",
  },
  {
    id: "p2-3",
    pid: "p2",
    title: "绵阳",
  },
  {
    id: "p2-1-1",
    pid: "p2-1",
    title: "高新区",
  },
];
console.log(list2tree(listData));

//树形结构转成列表
function tree2list(tree) {
  let list = [];
  const dns = (data) => {
    for (let node of data) {
      const { id, title, children } = node;
      list.push({ id, title });
      if (children) {
        dns(children);
      }
    }
  };
  dns(tree);
  return list;
}
const treeData = [
  {
    id: "p1",
    title: "广东",
    children: [
      {
        id: "p1-1",
        title: "广州",
      },
    ],
  },
  {
    id: "p2",
    title: "四川",
    children: [
      {
        id: "p2-1",
        title: "成都",
        children: [
          {
            id: "p2-1-1",
            title: "高新区",
          },
        ],
      },
      {
        id: "p2-2",
        title: "德阳",
      },
      {
        id: "p2-3",
        title: "绵阳",
      },
    ],
  },
];
// console.log(tree2list(treeData));

//大数相加
function bigAdd(n1, n2) {}

//原型链判断
Object.prototype.__proto__; //null
Function.prototype.__proto__; //Object.prototype
Object.__proto__; //Function.prototype
Object instanceof Function; //true
Function instanceof Object; //true
Function.prototype === Function.__proto__; //true

//快速排序
function quickSort(arr) {
  const len = arr.length;
  return _quickSort(arr, 0, len);
}
function _quickSort(arr, left, right) {
  left = typeof left === "number" ? left : 0;
  right = typeof right === "number" ? right : arr.length;
  if (left < right) {
    const p = partition(arr, left, right);
    _quickSort(arr, left, p - 1);
    _quickSort(arr, p + 1, right);
  }
  return arr;
}
function partition(arr, l, r) {
  let j = l;
  for (let i = l+1; i < r; i++) {
    if (arr[i] < arr[l]) {
      swap(arr, i, ++j);
    }
  }
  swap(arr, l, j);
  return j;
}
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const quickArr=[2,4,6,7,9,0,3,2,4,6,8,43,2];
console.log(quickSort(quickArr))
