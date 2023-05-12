// cjs调用esm 模块内的函数
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function* gen() {
  var url = "https://api.github.com/users/github";
  var result = yield fetch(url);
  console.log(result.bio);
}

let g = gen();
let result = g.next();

result.value
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    g.next(data);
  });
