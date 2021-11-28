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

const arr = [10, 20, 30];
arr[Symbol.iterator] = function () {
  let self = this,
    index = 0;
  return {
    next() {
      if (index > self.length - 1) {
        return {
          done: true,
          value: undefined,
        };
      }
    //   index+=2
      return {
        done: false,
        value: self[index++],
      };
    },
  };
};
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
