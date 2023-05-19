// const wm = new WeakMap();
// const _deepClone = (obj) => {
//   if (typeof obj !== "object" && obj) {
//     return obj;
//   }

//   if (wm.get(obj)) {
//     return wm.get(obj);
//   }

//   let cloneObj;
//   if (obj) {
//     cloneObj = {};
//     wm.set(obj, cloneObj);
//     let keys = Object.keys(obj) || [];
//     for (let i = 0; i < keys.length; i++) {
//       cloneObj[keys[i]] = _deepClone(obj[keys[i]]);
//     }
//   }

//   return cloneObj;
// };

// const linkNode1 = {
//   next: null,
//   pre: null,
//   val: 1,
// };

// const linkNode2 = {
//   next: null,
//   pre: linkNode1,
//   val: 2,
// };

// linkNode1.next = linkNode2;

// console.log(_deepClone(linkNode1));

{
  const wm = new WeakMap();
  const _deepClone = (obj) => {
    // 非引用数据
    if (obj && typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }

    if (!obj) return obj;

    if (wm.has(obj)) {
      return wm.get(obj);
    }

    let _obj = {};
    wm.set(obj, _obj);
    for (let key of Object.keys(obj)) {
      let val = obj[key];
      _obj[key] = _deepClone(val);
    }
    return _obj;
  };

  // let obj = {
  //   name: "yellres",
  // };

  // let c = _deepClone(obj);
  // console.log(c === obj);
  // console.log(c.name === "korha");
  // console.log(obj.name);

  let root = {
    val: 0,
    next: null,
  };

  let node1 = {
    val: 1,
    pre: root,
  };

  root.next = node1;
  let cloneRoot = _deepClone(root);
}
