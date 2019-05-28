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
        if (result != null && typeof result === 'object' || typeof result === 'function') {
            let then = result.then;
            if (typeof then == 'function') {
                then.call(result, (res) => {

                    resolvePromise(promise,res,resolve,reject);}, (err) => {reject(err);});
            } else {
                resolve(result);
            }
        } else {
            resolve(result)
        }
    } catch (e) {
        reject(e);
    }

}

myPromise.prototype.then = function (onfilled, onRejected) {
    let self = this;
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
