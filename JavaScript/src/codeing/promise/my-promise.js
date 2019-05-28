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
function resolvePromise(promise,result,resolve,reject){
    if (result instanceof myPromise){
        return result;
    }
}
myPromise.prototype.then = function (onfilled, onRejected) {
    let self = this;
    let promiseTemp = new myPromise((resolve, reject) => {
        if (self.status == "resolve") {
            try {
                let result = onfilled(self.value);
                resolvePromise(promiseTemp,result,resolve,reject);
            } catch (e) {
                reject(e);
            }

        }
        if (self.status == "rejected") {
            try {
                let result = onRejected(self.value);
                resolvePromise(promiseTemp,result,resolve,reject);
            } catch (e) {
                reject(e);
            }

        }
        if (self.status = "pending") {
            self.onResolveCallbacks.push(() => {
                try {
                    let result = onfilled(self.value);
                    resolvePromise(promiseTemp,result,resolve,reject);
                } catch (e) {
                    reject(e)
                }

            });
            self.onRejectedCallbacks.push(() => {
                try {
                    let result = onRejected(self.value);
                    resolvePromise(promiseTemp,result,resolve,reject);
                } catch (e) {
                    reject(e);
                }

            });
        }
    });
    return promiseTemp;

}


module.exports = myPromise;
