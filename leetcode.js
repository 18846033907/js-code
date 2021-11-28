//斐波那契[1,1,2,3,5,8,13,21...]
function fibonacci(n) {
  if (n <= 1) return 1;
  const arr = [1, 1];
  let i = n + 1 - 2;
  while (i > 0) {
    const a = arr[arr.length - 2],
      b = arr[arr.length - 1];
    arr.push(a + b);
    i--;
  }
  return arr[arr.length - 1];
}
// console.log(fibonacci(5));

//输入一个正数N，输出所有和为N的连续正数序列，例如输入15，输出[[1,2,3,4,5],[4,5,6],[7,8]]

//两数之和
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  let arr = [];
  let index = 0;
  const len = nums.length;
  while (index < len) {
    const item = nums[index];
    const temp = target - item;
    if (nums.includes(temp) && nums.indexOf(temp) !== index) {
      const i = nums.indexOf(temp);
      arr = [index, i];
      return arr;
    }
    index++;
  }
};

// const twoSum = function (nums, target) {
//   const len = nums.length;
//   for (let i = 0; i < len - 1; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
// };
const nums = [3, 2, 4],
  target = 6;
// console.log(twoSum(nums, target));
//两数之和
// function twoSum(nums, target) {
//   let temp = {};
//   const len = nums.length;
//   for (i = 0; i < len; i++) {
//     const current = nums[i];
//     if (temp[target - current] !== undefined) {
//       return [temp[target - current], i];
//     }
//     temp[current] = i;
//   }
// }
// console.log(twoSum([1, 2, 3, 4, 3, 13], 15));

//三数之和
// const nums = [-1, 0, 1, 2, -1, -4];

// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

function threeSum(nums, target) {
  let result = [];
  const newArr = nums.sort(function (a, b) {
    return a - b;
  });
  const len = newArr.length;
  for (i = 0; i < len; i++) {
    const item = newArr[i];
    let l = 1,
      r = 1;
    function restFn() {
      const rI = len - r,
        lI = i + l;
      const rest = newArr[rI] + newArr[lI];
      if (rest + item === target && i !== rI && i !== lI && rI !== lI) {
        result.push([newArr[i], newArr[i + l], newArr[len - r]]);
      } else if (rest + item > target) {
        r++;
        restFn();
      } else if (rest + item < target) {
        l++;
        restFn();
      }
    }
    restFn();
  }
  return result;
}
// console.log(threeSum(nums, 0));

//容器最多水
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49
function mostWater(nums) {
  const len = nums.length;
  let result = 0,
    left = 0,
    right = len - 1;
  while (left < right) {
    const min = Math.min(nums[left], nums[right]);
    const area = min * (right - left);
    result = Math.max(result, area);
    if (nums[left] < nums[right]) {
      left++;
    } else {
      right--;
    }
  }
  return result;
}
// console.log(mostWater([1,8,6,2,5,4,8,3,7]))
//爬楼梯
function climb(n) {
  if (n === 0 || n === 1) return 1;
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  for (i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// console.log(climb(6))

//有效括号
function valid(str) {
  const len = str.length;
  if (len % 2 !== 0) return false;
  const obj = { "(": ")", "{": "}", "[": "]" };
  let res = [];
  for (let prop of str) {
    if (prop in obj) {
      res.push(prop);
    } else {
      if (obj[res.pop()] !== prop) {
        return false
      } 
    }
  }
  return !res.length;
}
const str = "({}]{}";
// console.log(valid(str));
