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
  const map = new Map();
  const len = nums.length;
  let result = -1;
  for (let i = 0; i < len; i++) {
    const cur = nums[i];
    if (map.has(target - cur)) {
      result = [map.get(target - cur), i];
    } else {
      map.set(cur);
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
        newArr[newArr.length] = [cur, arr[l], arr[r]];
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
// console.log(44, threeSum([-4, -1, -1, 0, 1, 2]));

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function addTwoNumbers(l1, l2) {
  const dummy = new ListNode();
  let curr = dummy;
  let carry = 0;
  while (l1 !== null && l2 !== null) {
    let sum = 0;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next();
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next();
    }
    sum += carry;
    curr.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    curr = curr.next;
  }
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
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
  let len = s.length;
  if (len < 2) {
    return s;
  }
  let maxlength = 1;
  let start = 0;
  function h(l, r) {
    while (s[l] === s[r] && l >= 0 && r < len) {
      if (r - l + 1 > maxlength) {
        maxlength = r - l + 1;
        start = l;
      }

      l--;
      r++;
    }
  }
  for (let i = 0; i < len; i++) {
    h(i - 1, i + 1);
    h(i, i + 1);
  }
  console.log(start, maxlength);
  return s.substring(start, start + maxlength);
}
// console.log(longestPil("abcbdbd"));
//容器装满水
function containerWater(arr) {
  const len = arr.length;
  let l = 0;
  let r = len - 1;
  let res = 0;
  while (l < r) {
    res = Math.max(res, (r - l) * Math.min(arr[l], arr[r]));
    if (arr[l] < arr[r]) {
      l++;
    } else {
      r--;
    }
  }
  return res;
}
// console.log(containerWater([1,2,3,4,5]))

//无重复子串
function longestUniqStr(s) {
  let set = new Set();
  let len = s.length;
  for (let i = 0; i < len; i++) {
    const cur = s[i];
    if (set.has(cur)) {
      while (set.has(cur)) {
        set.delete(cur);
      }
      set.add(cur);
    } else {
      set.add(cur);
    }
  }
  return set.size;
}
// console.log(longestUniqStr("abcdbcbc"));
//大数相加
function bigNumAdd(s1, s2) {
  let len = Math.max(s1.length, s2.length);
  s1 = s1.padStart(len, 0);
  s2 = s2.padStart(len, 0);
  let index = len - 1;
  let sum = "";
  let t = 0;
  let f = 0;
  while (index > 0) {
    t = parseInt(s1[index]) + parseInt(s2[index]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
    index--;
  }
  return sum;
}
// let a = "9007199254740991";
// let b = "1234567899999999999";

// console.log(bigNumAdd(a, b));

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
// function hh(){
//   const arrow=()=>{
//     console.log('arrow',this)
//   }
//   arrow()
// }

// function arr(){
//   console.log('arr',this)
// }
// function ar(){
//   console.log('ar',this);
//   arr.call(this);
//   hh.call()
// }
// const obj={
//   name:'kkk'
// }

// ar.call(obj);
// var a=1;
// let c1=2;
// function dd(){
//   console.log(this.a,this.c1)
// }
// dd()
// String.prototype.myIndexof=function(t){
//   const reg=new RegExp(t);
//   let res=reg.exec(this);
//   return res===null?-1:res.index
// }
// console.log('edxfhddfhrnrkrk'.myIndexof('krk'))
// function Foo(){
//   Foo.a=function(){
//     console.log(1)
//   }
//   this.a=function(){
//     console.log(2)
//   }
// }
// Foo.prototype.a=function(){
//   console.log(3)
// }
// Foo.a=function(){
//   console.log(4)
// }
// Foo.a()
// const obj=new Foo();
// obj.a();
let str = "gdggfg苟富贵nnn个好地方lllirgtf";
let reg = /\b[a-z]+\b/gi;
str = str.replace(reg, function (match) {
  return " " + match + " ";
});
console.log(str.trim());

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
