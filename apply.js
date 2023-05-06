Function.prototype._apply = function () {
  const [context, args] = arguments;
  context.fn = this;
  let result = context.fn(...args);

  return result;
};

let applyFn = function (age, gender) {
  console.log(this.name + age + gender);
};

let obj = {
  name: "korha",
};

applyFn._apply(obj, [26, "male"]);
applyFn.apply(obj, [24, "female"]);

var foo = {
  bar: function () {
    var x = () => this;
    return x;
  },
};

var f = foo.bar();
var f2 = foo.bar;
console.log(f());
console.log(f2()());
