let fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function* gen() {
  var r1 = yield fetch("https://api.github.com/users/github");
  var json1 = yield r1.json();
  var r2 = yield fetch("https://api.github.com/users/github/followers");
  var json2 = yield r2.json();
  var r3 = yield fetch("https://api.github.com/users/github/repos");
  var json3 = yield r3.json();

  console.log([json1.bio, json2[0].login, json3[0].full_name].join("\n"));
}

/**
 * 不停的执行g.next()
 * 直到 g.next 返回值属性 done 为true
 * */
function run(gen) {
  var g = gen();

  function next(data) {
    let result = g.next();
    if (result.done) return;

    result.value.then(function (data) {
      next(data);
    });
  }
}
