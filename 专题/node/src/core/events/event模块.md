###event模块
> event node.js中的事件触发器 on订阅 emit触发
####example
```javascript
let eventEmitter = require('events');
let event = new eventEmitter();
event.on('chufa',()=>{console.log('已出发');});
event.emit('chufa');
```
####events原理
```javascript
function eventEmitter() {
    this.events = Object.create(null);
}
eventEmitter.prototype.on = function (eventName, callback) {
    if (!this.events) {
        this.events = Object.create(null);
    }
    if (eventName !== 'newListener') {
        if (this.events['newListener']) {
            this.events['newListener'].forEach(fn => fn());
        }
        let arr = this.events[eventName] || (this.events[eventName] = []);
        arr.push(callback);
    }
};
eventEmitter.prototype.once = function (eventName, callback) {
    const once=(...args)=>{
      callback(...args);
      this.off(eventName,once);
    };
    this.on(eventName,once);
};
eventEmitter.prototype.emit = function (eventName, ...args) {
    if (!this.events) {
        this.events = Object.create(null);
    }
    if (this.events[eventName]) {
        this.events[eventName].forEach(fn => fn(...args));
    }
};
eventEmitter.prototype.off=function(eventName,callback){
if (this.events[eventName]){
    this.events[eventName]=this.events[eventName].filter(item=>{return item!==callback&&item['l']!==callback});
}
};
```
