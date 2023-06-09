flushing
true  则按照id顺序加入更新队列
false 直接放入队列的末尾

waiting
true  什么都不做
false nextTick(flushSchedulerQueue)

TODO: 调用栈 任务队列 事件循环
那么我们只需要在 microtask 中把所有在UI重渲染之前需要更新的**数据全部更新**，这样只需要一次重渲染就能得到最新的DOM了


nextTick(cb, ctx)

1. 把cb 放入callBacks数组中
2. pending **回调队列是否等待刷新**
   1. true  
   2. false 



TODO: 链路长 有些细节不清楚