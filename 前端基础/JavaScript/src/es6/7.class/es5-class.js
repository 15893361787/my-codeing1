"use strict";
/**
 * @description 判断是否new调用
 * @param instance 当前this
 * @param Constructor 构造函数
 * */
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
/**
 * @description 为对象扩展属性
 * @param target 为那个对象扩展属性
 * @param props 相关属性集合
 * */
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
            descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
/**
 * @description 编译class 为构造函数扩展属性和原型上的属性
 * @param Constructor 构造函数
 * @param protoProps 原型属性
 * @param staticProps 静态属性
 * */
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
        _defineProperties(Constructor, staticProps);
    return Constructor;
}
var Person = 
/*#__PURE__*/
function () {
    function Person(name) {
        _classCallCheck(this, Person);
        this.name = name;
    }
    _createClass(Person, [
        {
            key: "sayHello",
            value: function sayHello() {
                return 'hello, I am ' + this.name;
            }
        }, {
            key: "name",
            get: function get() {
                return 'kevin';
            },
            set: function set(newName) {
                console.log('new name 为：' + newName);
            }
        }
    ], [{
            key: "onlySayHello",
            value: function onlySayHello() {
                return 'hello';
            }
        }]);
    return Person;
}();
