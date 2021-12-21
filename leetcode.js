//斐波那契数列
//暴力递归
// function fib(n) {
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   return fib(n - 1) + fib(n - 2);
// }
//递归+记忆化
function fib(n) {
  const memo = {};
  const helper = function (m) {
    if (memo[m]) return memo[m];
    if (m === 0) return 0;
    if (m === 1) return 1;
    memo[m] = helper(m - 1) + helper(m - 2);
    return memo[m];
  };
  return helper(n);
}
//动态规划
function fib(n) {
  if (n <= 1) return n;
  let memo = [0, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}
//动态数组
function fib(n) {
  if (n <= 1) return n;
  let memo = [0, 1];
  let sum = null;
  for (let i = 2; i <= n; i++) {
    sum = memo[0] + memo[1];
    memo[0] = memo[1];
    memo[1] = sum;
  }
  return sum;
}
// console.log(fib(5));s

//不同路径
function uniqPath(m, n) {
  const memo = new Array(m).fill(0).map(() => {
    return new Array(n).fill(0);
  });
  for (let i = 0; i < m; i++) {
    memo[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    memo[0][j] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      memo[i][j] = memo[i - 1][j] + memo[i][j - 1];
    }
  }
  return memo[m - 1][n - 1];
}

//状态压缩
function uniqPath(m, n) {
  const memo = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      memo[j] = memo[j - 1] + memo[j];
    }
  }
  return memo[n - 1];
}
function uniqPathWithObstacles(obstaArr) {
  const m = obstaArr.length;
  const n = obstaArr[0].length;
  const memo = new Array(m).fill(0).map(() => {
    return new Array(n).fill(0);
  });
  for (let i = 0; i < m; i++) {
    if (obstaArr[i][0] === 0) {
      memo[i][0] = 1;
    }
  }
  for (let j = 0; j < n; j++) {
    if (obstaArr[0][j] === 0) {
      memo[0][j] = 1;
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      memo[i][j] = obstaArr[i][j] === 1 ? 0 : memo[i - 1][j] + memo[i][j - 1];
    }
  }
  console.log(memo);
  return memo[m - 1][n - 1];
}

//状态压缩
function uniqPathWithObstacles(obstracArr) {
  const m = obstracArr.length;
  const n = obstracArr[0].length;
  let memo = new Array(n).fill(0);
  memo[0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstracArr[i][j] === 1) {
        memo[j] = 0;
      } else if (j > 0) {
        memo[j] = memo[j - 1] + memo[j];
      }
    }
  }
  console.log(memo);
  return memo[n - 1];
}

// console.log(
//   uniqPathWithObstacles([
//     [0, 0, 0],
//     [0, 1, 0],
//     [0, 0, 0],
//   ])
// );

//爬楼梯
function climbstair(n) {
  if (n <= 1) return n;
  const memo = [1, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  console.log(memo);
  return memo[n];
}
//状态压缩
function climbstair(n) {
  if (n <= 1) return n;
  const memo = [1, 1];
  let sum = null;
  for (let i = 2; i <= n; i++) {
    sum = memo[0] + memo[1];
    memo[0] = memo[1];
    memo[1] = sum;
  }
  return sum;
}
// console.log(climbstair(3))

//完全平方和

function completeSquare(n) {
  let memo = [];
  for (i = 0; i <= n; i++) {
    memo[i] = i;
    for (j = 1; i - j * j >= 0; j++) {
      memo[i] = Math.min(memo[i], memo[i - j * j] + 1);
    }
  }
  return memo[n];
}
// console.log(completeSquare(4));
//换硬币
function coinsChange(amount, coins) {
  const memo = new Array(amount + 1).fill(Infinity);
  memo[0] = 0;
  for (let i = 0; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        memo[i] = Math.min(memo[i], memo[i - coins[j]] + 1);
      }
    }
  }
  return memo[amount];
}

// console.log(coinsChange(10,[1,2,5]))
//分发饼干
function districookie(childArr, cookieArr) {
  const k = childArr.sort((a, b) => a - b);
  const c = cookieArr.sort((a, b) => a - b);
  let index = c.length - 1;
  let result = 0;
  for (let i = k.length - 1; i >= 0; i--) {
    if (index >= 0 && c[index] >= k[i]) {
      result++;
      index--;
    }
  }
  return result;
}
// console.log(districookie([1,7,10,2],[1,3,5,9]))
//两数之和
function twoSum(nums, target) {
  const m = new Map();
  let len = nums.length;
  let result = -1;
  for (let i = 0; i < len; i++) {
    const cur = nums[i];
    if (m.has(target - cur)) {
      result = [m.get(target - cur), i];
    } else {
      m.set(cur, i);
    }
  }
  return result;
}

// console.log(twoSum([1, 3, 5], 8));

function threeSum(arr) {
  let len = arr.length;
  let newArr = [];
  for (let i = 0; i < len; i++) {
    let l = i + 1;
    let r = len - 1;
    const cur = arr[i];
    while (l < r) {
      if (cur + arr[l] + arr[r] === 0) {
        newArr[newArr.length]=[cur, arr[l], arr[r]];
        break;
      } else if (cur + arr[r] + arr[l] > 0) {
        r--;
      } else {
        l++;
      }
    }
  }
  return newArr;
}
console.log(44, threeSum([-4, -1, -1, 0, 1, 2]));

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function addTwoNumbers(l1, l2) {
  let dummy = new ListNode();
  let curr = dummy;
  let carry = 0;
  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += carry;
    curr.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    curr = curr.next;
  }
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
  console.log(235, dummy);
  return dummy.next;
}
// const l1 = new ListNode(2);
// l1.next = new ListNode(4);
// l1.next.next = new ListNode(3);
// const l2 = new ListNode(5);
// l2.next = new ListNode(6);
// l2.next.next = new ListNode(4);
// console.log(addTwoNumbers(l1, l2));

//无重复字串
function lengthOflongestSubstring(str) {
  const len = str.length;
  if (len === 0) return 0;
  let maxLength = 0;
  let j = 0;
  let set = new Set();
  for (let i = 0; i < len; i++) {
    if (!set.has(str[i])) {
      set.add(str[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      while (set.has(str[i])) {
        set.delete(str[j]);
        j++;
      }
      set.add(str[i]);
    }
  }
  return maxLength;
}
// console.log(lengthOflongestSubstring("abcbcbc"));
//最长回文子串
function longestPil(s) {
  if (s.length <= 0) return s;
  let maxLength = 1;
  let start = 0;
  const len = s.length;
  function h(left, right) {
    while (left >= 0 && right < len && s[left] === s[right]) {
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }
  for (let i = 1; i < len; i++) {
    h(i - 1, i + 1);
    h(i, i + 1);
  }
  return s.substring(start, start + maxLength);
}
console.log(longestPil("abcbdbd"));

//冒泡排序，层层历若后面大于前面则交换相邻
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
// const arr = [2, 1, 4, 3];
// console.log(bubbleSort(arr));
//选择排序,选择当前项后面的最小项进行交换
function selectSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (arr[i] > arr[minIndex]) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}
// const arr = [2, 1, 4, 3];
// console.log(selectSort(arr));
//插入排序，在当前项前面找一个大于自己的位置
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// function InsertSort(arr) {
//   let len = arr.length;
//   for (let i = 1; i < len; i++) {
//     for (let j = i; j > 0; j--) {
//       if (arr[j] < arr[j - 1]) {
//         swap(arr, j, j - 1);
//       } else {
//         break;
//       }
//     }
//   }
//   return arr;
// }

function InsertSort(arr) {
  let len = arr.length,
    minIndex,
    cur;
  for (let i = 1; i < len; i++) {
    minIndex = i - 1;
    cur = arr[i];
    while (arr[minIndex] > cur && minIndex >= 0) {
      const temp = arr[minIndex + 1];
      arr[minIndex + 1] = arr[minIndex];
      arr[minIndex] = temp;
      minIndex--;
    }
  }
  return arr;
}

// const arr = [2, 1, 4, 3, 3, 2, 7, 9, 4, 32, 1];
// console.log(InsertSort(arr));
//快排
function quickSort(arr) {
  const len = arr.length;
  return _quickSort(arr, 0, len);
}
function _quickSort(arr, l, r) {
  if (arr.length < 2) return;
  if (l < r) {
    const p = partition(arr, l, r);
    _quickSort(arr, l, p - 1);
    _quickSort(arr, p + 1, r);
  }

  return arr;
}
function partition(arr, l, r) {
  let j = l;
  for (let i = l + 1; i < r; i++) {
    if (arr[i] < arr[l]) {
      swap(arr, ++j, i);
    }
  }
  swap(arr, j, l);
  return j;
}
// const arr = [2, 1, 4, 3, 3, 2, 7, 9, 4, 32, 1];
// console.log(quickSort(arr));
//归并排序
function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, len);
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
  while (left.length > 0) {
    result.push(left.shift());
  }
  while (right.length > 0) {
    result.push(right.shift());
  }
  return result;
}
// const arr = [2, 1, 4, 3, 3, 2, 7, 9, 4, 32, 1];
// console.log(mergeSort(arr));
