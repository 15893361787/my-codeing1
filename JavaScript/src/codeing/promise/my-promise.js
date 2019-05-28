function myPromise(excutor) {
    let self = this;
    self.status = "pending"
    self.value = undefined;

    function resolve(value) {
        if (self.status = "pending") {
            self.status = "resolve";
            self.value = value;
        }

    }

    function reject(reason) {
        if (self.status == "pending") {
            self.status = "rejected";
            self.value = reason;
        }

    }

    excutor(resolve, reject);
}

myPromise.prototype.then = function (onfilled, onRejected) {
    let self = this;
    if (self.status == "resolve") {
        onfilled(self.value);
    }
    if (self.status =="rejected") {
        onRejected(self.value);
    }
}
module.exports=myPromise;
