####迭代器是什么
```
所谓迭代器就是一个具有next方法的对象每次调用next方法返回一个结果对象改结果对象有done value 两个属性
```
####迭代器为我们解决了什么问题
```javascript
迭代器的引入主要是为各种不同的数据结构提供统一的访问机制来处理不同的数据只要是部署了迭代器接口的对象的可以通过for of访问
```
####为数据结构部署迭代器
```javascript
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= item.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        }
    };
}
const obj = {
    value: 1
};

obj[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (value of obj) {
    console.log(value);
}

```
```javascript
Object.prototype[Symbol.iterator]=function*(obj) {
  for(let [key,value] of Object.entries(obj)){
      yield {key,value}
  }
}
```
####模拟 for of
```javascript
function forOf(obj, cb) {
    let iterable, result;

    if (typeof obj[Symbol.iterator] !== "function")
        throw new TypeError(result + " is not iterable");
    if (typeof cb !== "function") throw new TypeError("cb must be callable");

    iterable = obj[Symbol.iterator]();

    result = iterable.next();
    while (!result.done) {
        cb(result.value);
        result = iterable.next();}}
    
```