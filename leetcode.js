//两数之和
function twoSum(nums, target) {
  let temp = {};
  const len = nums.length;
  for (i = 0; i < len; i++) {
    const current = nums[i];
    if (temp[target - current] !== undefined) {
      return [temp[target - current], i];
    }
    temp[current] = i;
  }
}
// console.log(twoSum([1, 2, 3, 4, 3, 13], 15));

//三数之和
const nums = [-1, 0, 1, 2, -1, -4];

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
  const obj = { "(": ")", "{": "}", "[": "]" };
  let res = [];
  for (let i = 0; i < str.length; i++) {
    const prop = str[i];
    if (prop === "(" || prop === "[" || prop === "{") {
      console.log(22, prop);
      res.push[obj[prop]];
    } else {
      console.log(55, res, prop);
      if (res[res.length - 1] === prop) {
        res.pop();
      } else {
        return false;
      }
    }
  }
  return true;
}
const str = "()[]{}";
console.log(valid(str));
