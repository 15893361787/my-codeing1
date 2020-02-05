enum promiseStatus {
  PENDING='PENDING',
  RESOLVE='RESOLVE',
  REJECT='REJECT'
}
function _typeof(obj:any):'function'|"object"{
  var s:string = Object.prototype.toString.call(obj);
  var toStr = Function.prototype.call.bind(Object.prototype.toString);
  // @ts-ignore
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
class Promise1 {
  /**
   * @description promise状态
   * */
  private  status:string=promiseStatus.PENDING;
  /**
   * @description promise成功的结果
   * */
  private  value:any=void 0;
  /**
   * @description promise拒绝的原因
   * */
  private  reason:string|undefined=void 0;
  /**
   * @description promise成功的队列
   * */
  private resolveCallbacks:Array<Function>=[];
  /**
   * @description promise失败的队列
   * */
  private rejectCallbacks:Array<Function>=[];
  /**
   * @description 吧promise状态从pending改为成功
   * */
  private resolve=(value:any)=>{
    if (value instanceof Promise1){
      (value as Promise1).then(this.resolve,this.reject);
      return;
    }
    if (this.status===promiseStatus.PENDING){
      this.status=promiseStatus.RESOLVE;
      this.value=value;
      this.resolveCallbacks.reduce((previousValue, currentValue:Function) => {
        currentValue();
        return previousValue;
      },'');
    }
  };
  /**
   * @description 吧promise状态从pending改为失败
   * */
  private reject=(reason:string)=>{
    if (this.status===promiseStatus.PENDING){
      this.status=promiseStatus.REJECT;
      this.reason=reason;
      this.rejectCallbacks.reduce((previousValue, currentValue:Function) => {
        currentValue();
        return previousValue;
      },'');
    }

  };
    /**
     * @description 对then回调中函数返回的对象进行解析来决定返回一个新的promise的状态
     * @param promise2 一个新的promise
     * @param x then回调中返回的对象
     * @param resolve 新的promise的resolve方法
     * @param reject 新的promise的reject方法
     * */
  private resolvePromise(promise2:Promise1,x:any,resolve:Function,reject:Function):void{
    if (promise2===x){
      return reject(new TypeError('Chaining cycle detected for promise #<Promise> --'));
    }
    /**
     * @description 避免promise的then回调重复执行
     * */
    let called:boolean=false;
    if (_typeof(x)==="function"||_typeof(x)==="object"){
      try {
        const then=x.then;
        if (_typeof(then)==="function"){
          then.call(x,(y:any)=>{
            if (called)return;
            called=true;
            this.resolvePromise(promise2,y,resolve,reject);
          },(r:string)=>{
             if (called) return;
             called=true;
             reject(r);
          })

        }else {
          resolve(x);
        }
      }catch (e) {
        if (called)return ;
        called=true;
        reject(e);
      }
    }else {
      resolve(x);
    }
  }
  constructor(executor:(resolve:(value:any)=>void,reject:(reason:string)=>void)=>void) {
    try {
      executor(this.resolve,this.reject);
    }catch (e) {
      this.reject(e);
    }
  }
  /**
   * @description then回调传入成功回调方法和失败回调方法，会在promise状态改变的时候异步执行
   * */
  then(onFulfilled:Function|undefined,onRejected:Function|undefined):Promise1{
    onFulfilled=typeof onFulfilled==="function"?onFulfilled:(value:any)=>value;
    onRejected= typeof onRejected ==="function"?onRejected:(err:string)=>{throw  err;};
    /**
     * @description then回调异步执行逻辑
     * @param flag 当前需要执行成功回调还是失败回调
     * */
    const thenCallback:Function=(flag:boolean)=>{
       setTimeout(()=>{
        try {
          const x=flag?onFulfilled!(this.value):onRejected!(this.reason);
          this.resolvePromise(promise2,x,this.resolve,this.reject);
        }catch (e) {
          this.reject(e);
        }
      })
    };
    const promise2= new Promise1((resolve, reject) => {
      if (this.status===promiseStatus.RESOLVE){
         thenCallback(true);
      }
      else if (this.status===promiseStatus.REJECT){
        thenCallback(false);
      }
      else{
        this.resolveCallbacks.push(()=>{
          thenCallback(true);
        });
        this.rejectCallbacks.push(()=>{
          thenCallback(false);
        });
      }
    });
    return promise2;
  }
  /**
   * @description promise处理异常的方法
   * @param errCallback 错误的处理方法
   * */
  catch(errCallback:Function){
    return this.then(void 0,errCallback);
  }
  /**
   * @description 返回一个成功的promise
   * */
  static resolve(value:any){
    return new Promise1(resolve1 => resolve1(value));
  }
  /**
   * @description 返回一个失败的promise
   * */
  static reject(){
    return new Promise1((resolve1, reject1) => {reject1('')});
  }
  /**
   * @description 并发执行promise
   * */
  static all(promises:Array<Promise1>){
    return new Promise1((resolve1, reject1) => {
      let resullt:Array<any>=[];
      let inx=0;
      let processData=(value:any,index:number)=>{
        return[index]=value;
        if (++inx===promises.length){
          resolve1(resullt);
        }
      }
      promises.reduce((previousValue:string, currentValue:Promise1, currentIndex:number) => {
        Promise1.resolve(currentValue).then((res:any)=>processData(res,currentIndex),(err:string)=>reject1(err));
        return previousValue;
      },'');
    });

  }
  /**
   * @description promise赛跑
   * */
  static race(promises:Array<Promise1>){
    return new Promise1((resolve1, reject1) => {
      promises.reduce((previousValue:string, currentValue:Promise1) => {
        Promise1.resolve(currentValue).then(resolve1,reject1);
        return previousValue;
      },'')
    });
  }
}
Promise1.defer = Promise1.deferred = function () { // 稍后继续说 catch
  let dfd:any = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}
module.exports = Promise1;
declare namespace Promise1 {
  function defer(): void;
  function deferred():void;
}

