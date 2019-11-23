/**
 * @description 手写promise 遵循promiseA+规范
 * */
const STATUS_PENDING = 'pending';
const STATUS_RESOLVE = 'resolve';
const STATUS_REJECT = 'reject';

class Promise {

    constructor(executor) {
        this.status = STATUS_PENDING; /*状态 默认pending*/
        this.value = ''; /*成功数据*/
        this.reason = ''; /*失败原因*/
        this.onResolveCallback = []; /*成功队列*/
        this.onRejectCallback = []; /*错误队列*/
        let resolve = (value) => {
            if (this.status === STATUS_PENDING) {
                this.status = STATUS_RESOLVE;
                this.value = value;
                this.onResolveCallback.forEach(fun => fun());
            }
        }; /*resolve函数*/
        let reject = (reason) => {
            if (this.status === STATUS_PENDING) {
                this.status = STATUS_REJECT;
                this.reason = reason;
                this.onRejectCallback.forEach(fun => fun());
            }
        }; /*reject函数*/
        try {
            executor.call({}, resolve, reject);/*防止出错*/
        } catch (e) {
            reject(e);
        }

    }

    /**
     * @description 用于处理返回应该新的promise中 resolve reject 以及递归查询这些公共逻辑
     * @param currentPromise
     * @param returnValue
     * @param resolve
     * @param reject
     * */
    static resolvePromise(currentPromise, returnValue, resolve, reject) {
        if (currentPromise === returnValue) {
            reject(new TypeError('返回类型错误'));
        }
        let called;/*防止多次调用*/
        if (typeof returnValue === 'function' || (typeof returnValue === 'object' && returnValue != null)) {
            try {
                let then = returnValue.then;
                if (typeof then === 'function') {
                    then.call(returnValue, value => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(currentPromise, value, resolve, reject);
                        },
                        err => {
                            if (called) return;
                            called = true;
                            reject(err);
                        })
                } else {
                    resolve(returnValue);
                }
            } catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            resolve(returnValue);
        }

    }

    /*返回应该成功的promise*/
    static resolve(value) {
        return new Promise(resolve => {
            resolve(value);
        });
    }

    /*返回应该失败的promise*/
    static reject(value) {
        return new Promise((_, reject) => {
            reject(value);
        });
    }

    /**
     * @description then函数 传入两个函数
     * @param onFulfilled 成功拿到数据的回调函数
     * @param onRejected  失败对错误的处理函数
     * @return new Promise  返回应该全新的promise
     * */
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        };
        let promiseNew;
        promiseNew = new Promise((resolve, reject) => {
            if (this.status === STATUS_PENDING) {
                this.onResolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let returnValue = onFulfilled(this.value);
                            Promise.resolvePromise(promiseNew, returnValue, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });

                });
                this.onRejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let returnValue = onRejected(this.reason);
                            Promise.resolvePromise(promiseNew, returnValue, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });

                })
            }
            if (this.status === STATUS_RESOLVE) {
                setTimeout(() => {
                    try {
                        let returnValue = onFulfilled(this.value);
                        Promise.resolvePromise(promiseNew, returnValue, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });


            }
            if (this.status === STATUS_REJECT) {
                setTimeout(() => {
                    try {
                        let returnValue = onRejected(this.reason);
                        Promise.resolvePromise(promiseNew, returnValue, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });


            }
        });
        return promiseNew;
    };

    /**
     * @description  不管成功或者失败都会执行
     * @param callback 传入的回调函数
     * */
    finally(callback) {
        return this.then(data => {
                return Promise.resolve(callback()).then(() => data);
            },
            err => {
                return Promise.resolve(callback()).then(() => {
                    throw  err
                });
            })
    };

    /**
     * @description 判断当前值是否为promise
     * @param currentValue 当前值
     * */
    static isPromise(currentValue) {
        if (typeof currentValue === 'function' || (typeof currentValue === 'object' && currentValue != null)) {
            let then = currentValue.then;
            if (typeof then === 'function') {
                return true;
            }

        }
        return false;
    }

    /**
     * @description promise并发执行多个
     * @param values 存放多个异步请求的数组
     * */
    static all(values) {
        return new Promise((resolve) => {
            let res = [];
            let count = 0;
            let processData = (key, value) => {
                res[key] = value;
                if (++count === values.length) {
                    resolve(res);
                }
            };
            for (let i = 0; i < values.length; i++) {
                let current = values[i];
                if (Promise.isPromise(current)) {
                    current.then(value => {
                        processData(i, value);
                    })
                } else {
                    processData(i, current);
                }
            }
        })
    }

    /**
     * @description race API
     * @param values 存放多个异步请求
     * */
    static race(values) {
        return new Promise((resolve, reject) => {
                for (let i = 0; i < values.length; i++) {
                    let current = values[i];
                    if (Promise.isPromise(current)) {
                        current.then(resolve, reject);
                    } else {
                        resolve(current);
                    }
                }
            }
        )
    }
}


Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = Promise;