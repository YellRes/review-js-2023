Q: 自定义的watcher 是如何触发的
A:  Object.defineProperty() dep中收集了属性中的 渲染watcher  当属性改变的时候 触发这些dep
那么自定义 watcher 是如何触发的？

我们知道 watch 方法内部是通过创建 Watcher 实例对象来实现观测的，在创建 Watcher 实例对象时会读取 a 的值从而触发属性 a 的 get 拦截器函数，最终将依赖收集。

