### 节流
> 一段时间之内只执行一次无视后来的请求,也不会推迟时间
### 实现一个简易版的节流函数
#### 时间戳
> + 函数可以立即执行,事件停止触发后不会再执行
```typescript
/**
 * @description 通过时间戳实现一个节流函数
 * @param fun 需要处理的函数
 * @param await 等待的时间
 * */
function throttle1(fun:Function,await:number) {
  /**
   * @description 上次执行的时间
   * */
  let preTime:number=0;
  /**
   * @description 节流处理后的函数
   * @param nest 原函数接受的参数
   * */
  return function(...nest) {
    let now=+new Date();
    const self=this;
    if (now-preTime>await){
      fun.apply(self,nest);
      preTime=now;
     }
  }
}
```
#### setTimeout
> + 函数n秒后执行,事件停止触发后会执行最后一次
```typescript
  function throttle(fun:Function,await:number) {
    let timeoutId=undefined;
    return function(...nest) {
      const self=this;
      if (!timeoutId){
         timeoutId=setTimeout(function() {
           fun.apply(self,nest);
           timeoutId=null;
         },await);        
 }
    }
  }
```
#### 双剑合璧
##### 大致逻辑
> + 如果传递了第一次立刻执行的参数==false并且当前preTime=0表示是第一次就把preTime=now;是为了在下边的流程的判断中让节流函数走setTimeout
> + 判断如果间隔时间到了 timeoutId不为空就先清空settimeout并且settimeout=null这是为了清除结束之后再执行一次的逻辑 同步执行对应的方法并且  
>                     preTime=当前时间
> + 走第一条的settimeout逻辑判断并且用户没有传入不允许最后一次执行的参数就开始在n秒之后执行对应的函数--执行函数,  
>   对preTime赋值:如果使用者是希望第一次不要执行说就是一直在走settimeout逻辑此时把preTime=0，便于分支判断  
>                否则可能这个timeout仅仅是为了结束之后在执行一次的逻辑这个时候就要把preTime设置为当前时间  
>                 settimeout=null  
```typescript
  function throttle(fun:Function,await:number,options:{leading?:boolean,trailing?:boolean}={leading:true,trailing:true}) {
    let timeoutId:number=undefined,preTime:number=0;
    return function(...nest) {
      let self=this;
      let now:number=+new Date();
       if (!preTime&&options.leading===false)preTime=now;
       const awaitTime=await;
       if (awaitTime<=(now-preTime)||(now-preTime)<0){
          if (!!timeoutId){
               clearTimeout(timeoutId);
               timeoutId=null;
            }
          fun.apply(self,nest);
          preTime=now;
          if (!timeoutId){self=nest=null}
           } else if (!timeoutId&&options.trailing!==false){
               timeoutId=setTimeout(function() {
                 fun.apply(self,nest);
                  preTime=options.leading===false?0:+new Date();
                 timeoutId=null;
                 if (!timeoutId){self=nest=null;} 
               },awaitTime);
           }
    }
  }
```
