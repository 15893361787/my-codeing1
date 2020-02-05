"use strict";
var promiseStatus;
(function (promiseStatus) {
    promiseStatus["PENDING"] = "PENDING";
    promiseStatus["RESOLVE"] = "RESOLVE";
    promiseStatus["REJECT"] = "REJECT";
})(promiseStatus || (promiseStatus = {}));
function _typeof(obj) {
    var s = Object.prototype.toString.call(obj);
    var toStr = Function.prototype.call.bind(Object.prototype.toString);
    // @ts-ignore
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
var Promise1 = /** @class */ (function () {
    function Promise1(executor) {
        var _this = this;
        /**
         * @description promise状态
         * */
        this.status = promiseStatus.PENDING;
        /**
         * @description promise成功的结果
         * */
        this.value = void 0;
        /**
         * @description promise拒绝的原因
         * */
        this.reason = void 0;
        /**
         * @description promise成功的队列
         * */
        this.resolveCallbacks = [];
        /**
         * @description promise失败的队列
         * */
        this.rejectCallbacks = [];
        /**
         * @description 吧promise状态从pending改为成功
         * */
        this.resolve = function (value) {
            if (value instanceof Promise1) {
                value.then(_this.resolve, _this.reject);
                return;
            }
            if (_this.status === promiseStatus.PENDING) {
                _this.status = promiseStatus.RESOLVE;
                _this.value = value;
                _this.resolveCallbacks.reduce(function (previousValue, currentValue) {
                    currentValue();
                    return previousValue;
                }, '');
            }
        };
        /**
         * @description 吧promise状态从pending改为失败
         * */
        this.reject = function (reason) {
            if (_this.status === promiseStatus.PENDING) {
                _this.status = promiseStatus.REJECT;
                _this.reason = reason;
                _this.rejectCallbacks.reduce(function (previousValue, currentValue) {
                    currentValue();
                    return previousValue;
                }, '');
            }
        };
        try {
            executor(this.resolve, this.reject);
        }
        catch (e) {
            this.reject(e);
        }
    }
    /**
     * @description 对then回调中函数返回的对象进行解析来决定返回一个新的promise的状态
     * @param promise2 一个新的promise
     * @param x then回调中返回的对象
     * @param resolve 新的promise的resolve方法
     * @param reject 新的promise的reject方法
     * */
    Promise1.prototype.resolvePromise = function (promise2, x, resolve, reject) {
        var _this = this;
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise #<Promise> --'));
        }
        /**
         * @description 避免promise的then回调重复执行
         * */
        var called = false;
        if (_typeof(x) === "function" || _typeof(x) === "object") {
            try {
                var then = x.then;
                if (_typeof(then) === "function") {
                    then.call(x, function (y) {
                        if (called)
                            return;
                        called = true;
                        _this.resolvePromise(promise2, y, resolve, reject);
                    }, function (r) {
                        if (called)
                            return;
                        called = true;
                        reject(r);
                    });
                }
                else {
                    resolve(x);
                }
            }
            catch (e) {
                if (called)
                    return;
                called = true;
                reject(e);
            }
        }
        else {
            resolve(x);
        }
    };
    /**
     * @description then回调传入成功回调方法和失败回调方法，会在promise状态改变的时候异步执行
     * */
    Promise1.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) { return value; };
        onRejected = typeof onRejected === "function" ? onRejected : function (err) { throw err; };
        /**
         * @description then回调异步执行逻辑
         * @param flag 当前需要执行成功回调还是失败回调
         * */
        var thenCallback = function (flag) {
            setTimeout(function () {
                try {
                    var x = flag ? onFulfilled(_this.value) : onRejected(_this.reason);
                    _this.resolvePromise(promise2, x, _this.resolve, _this.reject);
                }
                catch (e) {
                    _this.reject(e);
                }
            });
        };
        var promise2 = new Promise1(function (resolve, reject) {
            if (_this.status === promiseStatus.RESOLVE) {
                thenCallback(true);
            }
            else if (_this.status === promiseStatus.REJECT) {
                thenCallback(false);
            }
            else {
                _this.resolveCallbacks.push(function () {
                    thenCallback(true);
                });
                _this.rejectCallbacks.push(function () {
                    thenCallback(false);
                });
            }
        });
        return promise2;
    };
    /**
     * @description promise处理异常的方法
     * @param errCallback 错误的处理方法
     * */
    Promise1.prototype.catch = function (errCallback) {
        return this.then(void 0, errCallback);
    };
    /**
     * @description 返回一个成功的promise
     * */
    Promise1.resolve = function (value) {
        return new Promise1(function (resolve1) { return resolve1(value); });
    };
    /**
     * @description 返回一个失败的promise
     * */
    Promise1.reject = function () {
        return new Promise1(function (resolve1, reject1) { reject1(''); });
    };
    /**
     * @description 并发执行promise
     * */
    Promise1.all = function (promises) {
        return new Promise1(function (resolve1, reject1) {
            var resullt = [];
            var inx = 0;
            var processData = function (value, index) {
                return index = value[0], value;
                if (++inx === promises.length) {
                    resolve1(resullt);
                }
            };
            promises.reduce(function (previousValue, currentValue, currentIndex) {
                Promise1.resolve(currentValue).then(function (res) { return processData(res, currentIndex); }, function (err) { return reject1(err); });
                return previousValue;
            }, '');
        });
    };
    /**
     * @description promise赛跑
     * */
    Promise1.race = function (promises) {
        return new Promise1(function (resolve1, reject1) {
            promises.reduce(function (previousValue, currentValue) {
                Promise1.resolve(currentValue).then(resolve1, reject1);
                return previousValue;
            }, '');
        });
    };
    return Promise1;
}());
Promise1.defer = Promise1.deferred = function () {
    var dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = Promise1;
