### 防抖
> 面对一些频发的事件 让这些事件在n秒后执行如果在n秒时间内触发了同样的事件会以新的事件来推迟事件计算,简单来说在n秒内不再触发该事件的时候才让他执行  
#### 实现一个简易版的debounce
> + 支持立即执行
> + 函数的this,参数要传递过去
> + 返回原函数的结果
```typescript
/**
 * @description 返回一个防抖处理过的函数
 * @param fun 要进行防抖的函数
 * @param await 等待的时间
 * @param immediate 函数是否需要立即执行
 * */
function debounce(fun:Function,await:number,immediate:boolean) {
  /**
   * @description setTimeoutId
   * */ 
  let timeout=undefined;
  /**
   * @description 处理过的函数
   * @param  nest 防抖事件接受的参数
   * @return 返回原函数返回的结果
   * */
  return function(...nest) {
    let result=undefined;
    const self=this;
    if (timeout)clearTimeout(timeout);
    if (immediate){
      timeout=setTimeout(function() {
        timeout=null;
      },await);
     const called=!timeout;
     if (called)fun.call(self,nest);

    }else{
     timeout=setTimeout(function() {
       result=fun.apply(self,nest);
     },await);
    }
    return result;
  }
}
```
