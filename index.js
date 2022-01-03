// const arr = [2, 3, 5, 7, 11, 13, 15];
// const target = 15;
// function findT(arr, target, left, right) {
//   let res = -1;
//   const mid = Math.floor((right + left) / 2);
//   if (left <= right) {
//     if (arr[mid] === target) {
//       res = mid;
//     } else if (arr[mid] > target) {
//       res = findT(arr, target, left, mid - 1);
//     } else {
//       res = findT(arr, target, mid + 1, right);
//     }
//   }
//   return res;
// }
// console.log(findT(arr, target, 0, arr.length));

const arr = [7, 11, 13, 15, 17, 2, 3, 5];
const target = 12;
function findT(arr, target) {
  let res = -1;
  let len = arr.length;
  const mid = Math.floor(len / 2);
  const rightest = arr[len - 1];
  const leftest = arr[0];
  let left = arr.slice(0, mid + 1);
  let right = arr.slice(mid, len - 1);
  let tArr = [];
  if (mid < rightest) {
    //右侧有序
    if (target > rightest) {
      //target在左侧
      tArr = left;
    } else {
      if (target < mid) {
        //target在左侧
        tArr = left;
      } else {
        //target在右侧
        tArr = right;
      }
    }
  } else {
    //左侧有序
    if (target < leftest) {
      //target在右侧
      tArr = right;
    } else {
      if (target < mid) {
        //taget在左侧
        tArr = left;
      } else {
        //target在右侧
        tArr = right;
      }
    }
  }
  for (let i = 1; i < tArr.length; i++) {
    const cur = tArr[i];
    if (cur === target) {
      res = i;
      break;
    }
  }
  return res;
}
console.log(findT(arr, target));
