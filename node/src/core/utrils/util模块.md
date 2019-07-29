###util模块
> util promisify 用于把node中的API promise化
####example
```javascript
let path = require('path');
let {readFile} = require('fs');
let util = require('util');
let readFilePromise = util.promisify(readFile);
readFilePromise(path.resolve(__dirname,'./util模块.md'),'utf-8').then(res=>{console.log(res)});
```
####promisify实现
```javascript
/**
 * @deprecated promisify简易版实现
 * */
const promisify=fn=>(...rest)=>{
    return new Promise(((resolve, reject) =>{
        fn(...rest,(err,data)=>{
            if (err){
                reject(err);
            }
            resolve(data);
        })
    } ))
};
```
####自定义promisifyAll方法主要用于把一个模块夏所有API转promise
```javascript
/**
 * @deprecated 自定义 promisifyAll方法 主要用于转化一个模块下所有的方法为promise
 * */
const promisifyAll=obj=>{
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj,key)){
        obj[key]=util.promisify(obj[key]);
        }
    }
};
```
