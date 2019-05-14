function extend() {
    var target = arguments[0],
        length = arguments.length,
        deep = false,
        i = 1,
        options,
        src,
        copy,
        clone
    ;
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== "object" && Object.prototype.toString.call(target) == "[object Function]") {
        target = {};
    }
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[length]) !== null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target == copy) {
                    continue;
                }
                if (deep && copy && Object.prototype.toString.call(copy) == "[object Object]" || Object.prototype.toString.call(copy) == "[object Array]") {
                    if (Object.prototype.toString.call(copy) == "[object Array]") {
                        clone = Object.prototype.toString.call(src) == "[object Array]" ? src : []
                    } else {
                        clone = Object.prototype.toString.call(src) == "[object Object]" ? src : {}
                    }
                    target[name] = extend(deep, clone, copy);
                } else {
                    target[name] = copy;
                }
            }
        }

    }
    return target;
}

function callBacks(option) {
    /*字符串转对象*/
    var creayeOption = function (option) {
        var object = {};
        option.split(/\s+/).forEach((item) => {
            object[item] = true;
        })
        return object;
    }
    /*执行队列函数*/
    var fire = function (data) {
        length = option.memory&&fireListening?start||0:0;
        start=0;
        fireListening = true;
        memory = option.memory ? data : undefined
        for (; index < length; index++) {
            if (list[index].apply(data[0], data[1]) === false && option.stopOnfalse) {
                break;
            }
        }
    }
    /*队列列表*/
    var list = [],
        index = 0,
        length,
        fireListening = false,
        memory,
        start
    ;
    option = typeof option === 'string' ? creayeOption(option) : extend({}, option);

    var self = {
        /*增加函数*/
        add: function () {
            var args = [].slice.call(arguments);
            start=list.length;
            args.forEach((item) => {
                if (Object.prototype.toString.call(item) === '[object Function]') {
                    list.push(item);
                }

            });
            memory && fire(memory);
        },
        fire: function () {
            self.fireWith.call(this, arguments);
        },
        fireWith: function (context, arguments) {
            var args = [context, arguments];
            if (!option.once || !fireListening) {
                fire(args);
            }


        }
    };
    return self;
}
