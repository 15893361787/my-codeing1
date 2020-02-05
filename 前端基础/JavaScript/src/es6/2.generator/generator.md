### 谈谈generator
> 关于generator函数的定义很多人定义为异步的一种解决方案,个人以为该函数和异步没有任何关系，只是一种特殊的函数，和普通函数相比特殊之处在于  
> 普通函数调用会立刻执行完毕销毁函数上下文，而该函数调用并不会执行函数而是返回一种迭代器  
> 当调用迭代器的next方法会返回一组数据{value:''',done:false}  
> 当调用迭代器的throw方法 会把错误抛出 throw err  
> 当调用迭代器的return方法 会把上下文的结果返回就和yield 返回值一样
### generator函数有什么用
+ 在async出来之前generator+promise+co模块可以很好的解决异步问题,主要是借助promise的链式回调来移动generator函数指针通过co模块自动调用
+ 在generator函数出来之前要给数据结构上边部署迭代器以便for of遍历是很麻烦的需要定义函数返回对象调用对象上的next方法返回不同的数据结构  
  但是使用generator我们只需要声明一个generator函数就可以了他本身就是返回一个迭代器 
 
### co模块的原理
+ 调用co,传入该函数,执行函数获取迭代器,调用onFulfilled方法进行next操作
+ 判断next.done如果为true就返回一个成功结果的promise
+ 对next.value属性进行promise化在promise方法then回调里面传入自定义的onFulfilled和onRejected
+ onFulfilled逻辑主要是调用迭代器上的next方法移动指针
+ onRejected逻辑主要是调用迭代器上的throw方法抛出错误

### generator和async
> async编译之后基本上就是generator+promise+co 可以说在异步处理上可以完全取代generator 但是两者是为了解决不同的问题  
> generator更强大的地方在于可以手动终止和恢复 以及手动和外部数据交互
