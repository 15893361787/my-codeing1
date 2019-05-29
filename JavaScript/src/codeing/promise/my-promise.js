function myPromise(excutor) {
    let self = this;
    self.status = "pending"
    self.value = undefined;
    self.onResolveCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (self.status == "pending") {
            self.status = "resolve";
            self.value = value;
            self.onResolveCallbacks.forEach((fun) => {
                fun()
            })
        }
    }

    function reject(reason) {
        if (self.status == "pending") {
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
    if (promise == result) {
        return reject(new TypeError('循环引用'))
    }
    try {
        let called;
        if (result != null && typeof result === 'object' || typeof result === 'function') {
            let then = result.then;
            if (typeof then == 'function') {
                then.call(result, (res) => {
                    if (called) {
                        return;
                    }
                    called = true;
                    resolvePromise(promise, res, resolve, reject);
                }, (err) => {
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

myPromise.prototype.then = function (onfilled, onRejected) {
    let self = this;
    onfilled = typeof onfilled == 'function' ? onfilled : res => {return res};
    onRejected = typeof onRejected == 'function' ? onRejected : err => {throw err;}
    let promiseTemp = new myPromise((resolve, reject) => {
        if (self.status == "resolve") {
            try {
                let result = onfilled(self.value);
                resolvePromise(this, result, resolve, reject);
            } catch (e) {
                reject(e);
            }

        }
        if (self.status == "rejected") {
            try {
                let result = onRejected(self.value);
                resolvePromise(this, result, resolve, reject);
            } catch (e) {
                reject(e);
            }

        }
        if (self.status = "pending") {
            self.onResolveCallbacks.push(() => {
                try {
                    let result = onfilled(self.value);
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
    return promiseTemp;

}


module.exports = myPromise;
