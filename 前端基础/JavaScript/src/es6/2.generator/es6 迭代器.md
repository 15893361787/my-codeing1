####迭代器是什么
```
所谓迭代器就是一个具有next方法的对象每次调用next方法返回一个结果对象改结果对象有done value 两个属性
```
####迭代器为我们解决了什么问题
```
迭代器的引入主要是为各种不同的数据结构提供统一的访问机制来处理不同的数据只要是部署了迭代器接口的对象的可以通过forof访问
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
####模拟 for of
> 要注意的地方是for of 如果非正常退出会默认调用迭代器上的return方法
```typescript
"use strict";

const colors = new Set(["red", "green", "blue"]);
let _iteratorNormalCompletion:boolean|undefined = true;
let _didIteratorError = false;
let _iteratorError = undefined;
let _iterator=undefined,_step=undefined;
try {
  for ( _iterator = colors[Symbol.iterator](), _step;
       !(_iteratorNormalCompletion = (_step = _iterator.next()).done);) {
    const color = _step.value;
    console.log(color);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator!.return != null) {
      _iterator!.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```
