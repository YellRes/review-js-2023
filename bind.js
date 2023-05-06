Function.prototype._bind = function () {
  const [context, ...baseArgs] = arguments;
  context.fn = this;

  return function (...otherArgs) {
    const finalArgs = [...baseArgs, ...otherArgs];
    let res = context.fn(...finalArgs);
    delete context.fn;
    return res;
  };
};

const obj = {
  name: "yellres",
};
const getInfo = function (age, gender) {
  console.log(this.name + age + gender);
};

let getInfoFn = getInfo._bind(obj, 24);
getInfoFn("male");
