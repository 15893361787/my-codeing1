### 聊聊promise
> promise是es6提出的一种异步解决方案,主要是在相对程度上解决了异步的回调地狱问题-将传统的异步回调改为链式调用,为什么说是相对程度因为如果在复杂的异步操作中依然要在各种then
> 回调中写大量逻辑代码
### promise特点
> + 构造函数会立即执行
> + 状态无法从外部改变
> + 一旦执行就无法取消
> + then回调走的异步操作,也就意味着没有自己的this
> + 内部异常统一处理 但是如果不去手动在then回调或者catch中处理的话默认会把错误抛出,这是浏览器后来新增的一个特性会向浏览器unhandledrejection 事件
#### promise A+规范
https://juejin.im/post/5b6161e6f265da0f8145fb72#heading-3
#### 谈谈如何实现一个promise
> promise内部主要由三个状态,两个队列,状态可以从pending变成成功或者失败,外部无法去修改状态由内部提供两个函数resolve,reject来改变状态
> 这两个函数会作为入参传给构造函数里面的执行器以供用户使用  
> resolve的逻辑 
> + 判断resolve的value如果为promise则以这个promise的状态作为当前promise实例的状态,具体代码promise.then(resolve,reject);
> + 修改promise的status,value并且执行成功队列中的方法  

> reject的逻辑
> + 修改promise的status,reason并且执行失败队列中的方法

> promiseA+规范中的核心功能在then方法中,每次then都将返回一个新的promise,then回调中的函数要走异步处理
> + 如果onFulfilled或者onRejected 不是一个方法则应该忽略但是为了保证promise链的完整性我们应该给他们一个默认方法吧对应的value,reason抛出来
> + 如果当前状态为resolve或者reject,异步执行onFulfilled或者onRejected方法,并且拿到onFulfilled或者onRejected返回的值进行解析处理
> + 如果当前状态为pending, 会向对应的成功,失败队列添加对应的异步处理方法和上边逻辑一致

> 如何解析x
> + 如果返回的x和返回的promise实例promise2是一个对象此时应返回一个失败的promise类型错误
> + 如果x是一个promise或者像一个promise 取出then属性如果then,如果报错则reject  如果then是一个方法调用then方法并把this值设为x,传入对应的成功回调和失败回调
>    分别调用resolve,reject为了避免resolve或者reject多次调用要加一个标志保证只会调用一次
> + 如果then不是一个方法直接resolve(x)
> + 否则直接resolve(x)

>到此已经可以实现一个符合promiseA+promise了还剩下一些API
#### promise resolve
> 返回一个成功的promise
#### promise reject
> 返回一个失败的promise
#### promise catch
> 执行then参数中的失败方法
#### promise ALL
> 对多个promise的结果合并到一个promise中
#### promise race
> 多个promise返回最先完成的promise
