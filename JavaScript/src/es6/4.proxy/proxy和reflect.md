###proxy
####proxy是什么
```
proxy可以理解为在目标对象设置一层拦截外界对该对象进行访问必须先经过这层拦截因此提供了一种机制对拦截进行
过滤和改造
```
####proxy为我们解决了什么问题
```
proxy的引入主要是解决了es6之前 Object.defineProperty()对象劫持主要体现在:
1.无法监听数组变化
2.只能劫持对象的属性而无法劫持对象的方法
```
####proxy的缺点
```
ES6新增的Proxy无法被转译成ES5或者通过Polyfill提供兼容
```
###Reflect
####reflect是什么
```
将object对象上一些属于语言内部的方法部署到reflect对象上也可以上从reflect这个对象上可以拿到语言内部的方法
修改某些object方法返回的结果让其变得更合理比如Object.defineProperty(obj, name, desc)无法定义属性会抛出错误
        使用reflect会返回false
让object操作变成函数行为比如name in obj和delete obj[name]
        而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为
reflect对象上的方法和proxy上的方法一一对应在proxy方面里面就可以使用reflect调用对应的方法完成默认行为      
```
###实现简单的双向绑定
```javascript
const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === 'text') {
      input.value = value;
      p.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
});

input.addEventListener('keyup', function(e) {
  newObj.text = e.target.value;
});

```