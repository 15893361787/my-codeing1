function myPromise(excutor) {
    let self = this;
    self.status = "pending"
    self.value = undefined;
    self.onResolveCallbacks=[];
    self.onRejectedCallbacks=[];
    function resolve(value) {
        if (self.status =="pending") {
            self.status = "resolve";
            self.value = value;
            self.onResolveCallbacks.forEach((fun)=>{
                fun.call(null,self.value);
            })
        }
    }
    function reject(reason) {
        if (self.status == "pending") {
            self.status = "rejected";
            self.value = reason;
            self.onRejectedCallbacks.forEach((fun)=>{
                fun.call(null,self.value);
            })
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
    if (self.status="pending"){
        self.onResolveCallbacks.push(onfilled);
        self.onRejectedCallbacks.push(onRejected);
    }
}







module.exports=myPromise;
