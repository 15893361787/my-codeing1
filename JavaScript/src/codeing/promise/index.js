let myPromise = require('./my-promise');
let promise1 = new myPromise((resolve, reject) => {
    resolve('成功')
});
promise1.then((res) => {
        return '再次成功'
    },
    (err) => {
        console.log(err);
    }).then(res => {
    console.log(res);
}, (err) => {
    console.log(err);
})
