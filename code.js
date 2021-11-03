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
function shallowCopy(obj) {
  if (!typeOf(obj)) return;
  const newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj.prop = newObj[prop];
    }
  }
  return newObj;
}
