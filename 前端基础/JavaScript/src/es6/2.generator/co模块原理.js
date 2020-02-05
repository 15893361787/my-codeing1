"use strict";
var slice = Array.prototype.slice;
module.exports = co['default'] = co.co = co;
/**
 * @description co入口 使generator函数可以自执行
 * @param gen generator函数或者生成的迭代器
 * @return 最终返回一个promise
 * */
function co(gen) {
    var ctx = this;
    var args = slice.call(arguments, 1);
    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function')
            gen = gen.apply(ctx, args);
        if (!gen || typeof gen.next !== 'function')
            return resolve(gen);
        onFulfilled(undefined);
        /**
         * @description 自动执行generator的next方法,吧上一个next发返回的结果在传递回去
         * @param res 上一个next方法返回的promise结果
         * */
        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            }
            catch (e) {
                return reject(e);
            }
            next(ret);
            return null;
        }
        /**
         * @param {Error} err
         * @return {Promise}
         * @api private
         */
        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            }
            catch (e) {
                return reject(e);
            }
            next(ret);
        }
        /**
         * @description 对next方法返回的结果进行promise化
         * @param ret 上个next返回的对象
         * */
        function next(ret) {
            if (ret.done)
                return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            if (value && isPromise(value))
                return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(ret.value) + '"'));
        }
    });
}
/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */
/**
 * @description 对next方法返回的value属性执行promise化
 * */
function toPromise(obj) {
    if (!obj)
        return obj;
    if (isPromise(obj))
        return obj;
    if (isGeneratorFunction(obj) || isGenerator(obj))
        return co.call(this, obj);
    if ('function' == typeof obj)
        return thunkToPromise.call(this, obj);
    if (Array.isArray(obj))
        return arrayToPromise.call(this, obj);
    if (isObject(obj))
        return objectToPromise.call(this, obj);
    return obj;
}
/**
 * @description 对回调函数promise化
 * */
function thunkToPromise(fn) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        fn.call(ctx, function (err, res) {
            if (err)
                return reject(err);
            if (arguments.length > 2)
                res = slice.call(arguments, 1);
            resolve(res);
        });
    });
}
/**
 * @description 对一个数组promise化
 * */
function arrayToPromise(obj) {
    return Promise.all(obj.map(toPromise, this));
}
/**
 * @description 对一个对象promise化
 * */
function objectToPromise(obj) {
    var results = new obj.constructor();
    var keys = Object.keys(obj);
    var promises = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var promise = toPromise.call(this, obj[key]);
        if (promise && isPromise(promise))
            defer(promise, key);
        else
            results[key] = obj[key];
    }
    return Promise.all(promises).then(function () {
        return results;
    });
    /**
     * @description 取出promise中的结果赋值给results
     * */
    function defer(promise, key) {
        // predefine the key in the result
        results[key] = undefined;
        promises.push(promise.then(function (res) {
            results[key] = res;
        }));
    }
}
/**
 * @description 判断一个对象是否为promise
 * */
function isPromise(obj) {
    return 'function' == typeof obj.then;
}
/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
/**
 * @description 判断一个对象是否为一个迭代器
 * */
function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}
/**
 * @description 判断一个对象是否为generator函数
 * */
function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor)
        return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName)
        return true;
    return isGenerator(constructor.prototype);
}
/**
 * @description 判断是否为一个纯对象
 * */
function isObject(val) {
    return Object == val.constructor;
}
