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
// const nums = [3, 2, 4],
//   target = 6;
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
        return false;
      }
    }
  }
  return !res.length;
}
const str = "({}]{}";
// console.log(valid(str));
//零钱兑换
function coinsChange(coins, mount) {
  let memo = Array(mount+1).fill(Infinity);
  memo[0] = 0;
  for (let i = 1; i <= mount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        console.log(166,i,j)
        memo[i] = Math.min(memo[i], memo[i - coins[j]] + 1);
      }
    }
  } 
  return memo[mount] === Infinity ? -1 : memo[mount];
}
const coinChange = function (coins, amount) {
  // 用于保存每个目标总额对应的最小硬币个数
  const f = [];
  // 提前定义已知情况
  f[0] = 0;
  // 遍历 [1, amount] 这个区间的硬币总额
  for (let i = 1; i <= amount; i++) {
    // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
    f[i] = Infinity;
    // 循环遍历每个可用硬币的面额
    for (let j = 0; j < coins.length; j++) {
      // 若硬币面额小于目标总额，则问题成立
      if (i - coins[j] >= 0) {
        // 状态转移方程
        f[i] = Math.min(f[i], f[i - coins[j]] + 1);
      }
    }
  }
  // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
  if (f[amount] === Infinity) {
    return -1;
  }
  // 若有解，直接返回解的内容
  return f[amount];
};

// const coins = [1, 2, 5],
//   mount = 11;

// console.log(coinsChange(coins, mount));
//不同路径
function difPaths(m,n){
let res=Array(m).fill(Array(n).fill(1))
for(let i=1;i<m;i++){
  for(let j=1;j<n;j++){
    res[i][j]=res[i][j-1]+res[i-1][j]
  }
}
return res[m-1][n-1]
}
const m=7,n=3;
console.log(difPaths(m,n))
