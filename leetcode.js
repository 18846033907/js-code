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
    debugger;
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

const twoSum = function (nums, target) {
  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};
const nums = [3, 2, 4],
  target = 6;
// console.log(twoSum(nums, target));
