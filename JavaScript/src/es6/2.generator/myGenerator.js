/*co模块的原理*/
module.exports.myCo = function (it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {value, done} = it.next(data);
            if (!done) {
                Promise.resolve(value).then(data => next(data), reject);
            } else {
                resolve(value);
            }
        }

        next();
    })
};