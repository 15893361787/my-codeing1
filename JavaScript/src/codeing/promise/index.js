let myPromise = require('./my-promise');
new myPromise((resolve, reject) => {resolve(111);})
    .then((res) => {console.log(res);},
       (err) => {console.log(err);}
)
