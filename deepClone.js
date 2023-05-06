const wm = new WeakMap();
const _deepClone = (obj) => {
  if (typeof obj !== "object" && obj) {
    return obj;
  }

  if (wm.get(obj)) {
    return wm.get(obj);
  }

  let cloneObj;
  if (obj) {
    cloneObj = {};
    wm.set(obj, cloneObj);
    let keys = Object.keys(obj) || [];
    for (let i = 0; i < keys.length; i++) {
      cloneObj[keys[i]] = _deepClone(obj[keys[i]]);
    }
  }

  return cloneObj;
};

const linkNode1 = {
  next: null,
  pre: null,
  val: 1,
};

const linkNode2 = {
  next: null,
  pre: linkNode1,
  val: 2,
};

linkNode1.next = linkNode2;

console.log(_deepClone(linkNode1));
