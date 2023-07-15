let activeEffect;
const effectFn = (fn) => {
  // fn执行前 先清除副作用
  const effect = () => {
    // 依赖执行的时候 全局依赖设置为它
    activeEffect = effect;

    cleanUp(effect);
    fn();
  };

  // 设置副作用的依赖集
  effect.deps = [];
  effect();
};

const cleanUp = (effect) => {
  for (let i of effect.deps) {
    i.delete(effect);
  }

  effect.deps.length = [];
};

const track = (target, key) => {
  let targetKeyMap = targetWM.get(target);
  if (!targetKeyMap) {
    targetWM.set(target, (targetKeyMap = new Map()));
  }

  let deps = targetKeyMap.get(key);
  if (!deps) {
    targetKeyMap.set(key, (deps = new Set()));
  }

  deps.add(activeEffect);
  activeEffect.deps.push(deps);
};

const trigger = (target, key) => {
  const targetKeyMap = targetWM.get(target);
  if (!targetKeyMap) return;
  // 出现了死循环
  const effects = targetKeyMap.get(key);

  const finalEffects = new Set(effects);
  finalEffects && finalEffects.forEach((effectFn) => effectFn());
};

const targetWM = new WeakMap();
const obj = new Proxy(
  {
    text: "yellres",
    ok: true,
  },
  {
    set: (target, key, val) => {
      target[key] = val;
      trigger(target, key);
    },
    get: (target, key) => {
      track(target, key);
      return target[key];
    },
  }
);

document.addEventListener("DOMContentLoaded", () => {
  effectFn(() => {
    console.log("has render");
    document.querySelector("#app").textContent = obj.ok
      ? "reactive value: " + obj.text
      : "no reactive";
  });
});
