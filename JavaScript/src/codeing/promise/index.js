let myPromise = require('./my-promise');
let promise1 = new myPromise((resolve, reject) => {
    setTimeout(() => {
        reject('成功')
    }, 1000)
});
promise1.then((res) => {
        console.log(res);
    },
    (err) => {
        console.log(err);
    }
)
