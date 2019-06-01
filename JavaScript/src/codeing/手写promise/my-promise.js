function myPromise(excutor) {
    let self = this;
    self.status = "pending";
    self.value = undefined;
    self.onResolveCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (self.status === "pending") {
            self.status = "resolve";
            self.value = value;
            self.onResolveCallbacks.forEach((fun) => {
                fun()
            })
        }
    }

    function reject(reason) {
        if (self.status === "pending") {
            self.status = "rejected";
            self.value = reason;
            self.onRejectedCallbacks.forEach((fun) => {
                fun()
            })
        }
    }

    excutor(resolve, reject);
}

function resolvePromise(promise, result, resolve, reject) {
    if (promise === result) {
        return reject(new TypeError('循环引用'))
    }
    let called=null;
    try {

        if (result != null && typeof result === 'object' || typeof result === 'function') {
            let then = result['then'];
            if (typeof then == 'function') {
                then.call(result, (res) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        resolvePromise(promise, res, resolve, reject);
                    },
                    (err) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject(err);
                    });
            } else {
                resolve(result);
            }
        } else {
            resolve(result)
        }
    } catch (e) {
        if (called) {
            return;
        }
        called = true;
        reject(e);
    }

}

myPromise.prototype.then = function (onFilled, onRejected) {
    let self = this;
    onFilled = typeof onFilled == 'function' ? onFilled : res => {
        return res
    };
    onRejected = typeof onRejected == 'function' ? onRejected : err => {
        throw err;
    };
    return new myPromise((resolve, reject) => {
        if (self.status === "resolve") {
            try {
                let result = onFilled(self.value);
                resolvePromise(this, result, resolve, reject);
            } catch (e) {
                reject(e);
            }

        }
        if (self.status === "rejected") {
            try {
                let result = onRejected(self.value);
                resolvePromise(this, result, resolve, reject);
            } catch (e) {
                reject(e);
            }

        }
        if (self.status === "pending") {
            self.onResolveCallbacks.push(() => {
                try {
                    let result = onFilled(self.value);
                    resolvePromise(this, result, resolve, reject);
                } catch (e) {
                    reject(e)
                }

            });
            self.onRejectedCallbacks.push(() => {
                try {
                    let result = onRejected(self.value);
                    resolvePromise(this, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }

            });
        }
    });

}
myPromise.prototype.race=function(value){
    return new myPromise((resolve,reject)=>{
        for (let i=0;i<value.length;i++){
            let current = value[i];
            if (current&&current.then&&typeof current=='function'){
                current.then(resolve,reject);
            } else {
                resolve(current);
            }
        }
    })
}

moudle.exports = myPromise;
