let myPromise = require('./my-promise');
new myPromise((resolve)=>{
    resolve(11);
}).then(()=>{
    return new myPromise((resolve,rejected)=>{
        setTimeout(function () {
            setTimeout(()=>{
                resolve("最终结果")
            },1000)
        },1000)
    })
}).then(res=>{
    console.log(res);})
