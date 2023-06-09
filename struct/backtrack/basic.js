class Box {
  list = [];
  push(val) {
    this.list.push(val);
  }
  pop() {
    this.list.pop();
  }
  print() {
    console.log(this.list);
  }
}

const solution = (arr, num, b) => {
  const length = arr.length || 0;
  b.print();
  if (num >= length) return;
  b.push(arr[num]);

  solution(arr, num + 1, b);
  b.pop();
};

const b = new Box();

solution([1, 2, 3], 0, b);
// 回溯 使用了for循环加递归  解决了多个for循环的问题
// 栈是递归的好朋友

/**
 * [1, 2, 3, 4]
 * [1]
 * [2, 3, 4]
 * [3, 4]
 * [4]
 *
 * [1]
 * [1, 2 ...]
 * [1, 3 ...]
 * [1, 4]
 * 下一个遍历的初始数据 都要大于之前的数据
 *
 */
