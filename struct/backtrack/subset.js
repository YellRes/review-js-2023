class Box {
  stack = [];
  push(val) {
    this.stack.push(val);
  }
  pop() {
    this.stack.pop();
  }
}
// 子集
// 每个人可以选择的宝石是什么
const subSet = (arr) => {
  const ans = [];

  const backtrack = (arr, index, ans, box) => {
    ans.push([...box.stack]);
    if (index >= arr.length) return;

    for (let i = index; i < arr.length; i++) {
      box.stack.push(arr[i]);
      backtrack(arr, i + 1, ans, box);
      box.stack.pop();
    }
  };
  const box = new Box();
  backtrack(arr, 0, ans, box);
  return ans;
};

console.log(subSet([1, 2, 3, 4]));
/**
 *
 * [1, 2, 4, 4] 是如何产生的
 *
 * [1, 2, 4]
 */
