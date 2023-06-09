/**
 *
 * 区间的取值：
 * [left, right)
 *
 * let m = left + ((right - left) >> 1)
 */

// 最左边的一个数
const binarySearchLeft = (arr, target) => {
  let right = arr.length;
  let left = 0;

  while (left < right) {
    // 最终mid 会等于left
    // right == mid  右边的一定会靠到左边来
    let mid = left + ((right - left) >> 1);

    if (arr[mid] < target) {
      // 这边倾向于将 left 和right 靠近在一起
      left = mid + 1;
    } else {
      // 相等的情况 扔掉右边的数据
      // 一直往左边找
      right = mid;
    }
  }

  // [left, right)
  // 区间内部所有值都小于target
  // left === right === arr.length

  // 区间所有的值都大于target
  // left === right === 0

  // 区间内部没有值
  // arr[left] !== target
  return arr[left] === target ? left : -1;
};

// 最右边的数的下一个数
const binarySearchRight = (arr, target) => {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    let mid = left + ((right - left) >> 1);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr[left - 1] === target ? left - 1 : -1;
};
