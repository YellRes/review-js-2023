// 1. Array.isArray()
Array.isArray([1, 2, 3, 4])

// 2. obj instanceof Array
[] instanceof Array;
// => true

// { } instanceof Array
// Uncaught SyntaxError: Unexpected token 'instanceof'

// 3. Object.prototype.toString.call()
Object.prototype.toString.call([]);
// => '[object array]'
// Q: Object.prototype.toString.call() 原理
// A: 原生的 toString() 方法定义在 Object.prototype 上,不同类型的对象会重写这个方法返回对应类型的字符串

