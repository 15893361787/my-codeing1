class Person {
  age = "";
  name = 0;
  say(something) {
    console.log(something);
  }
}
class Superman extends Person {
  constructor() {
    //继承子类没有自己的this,必须调用super
    super();
    this.power = "";
  }
  fly(height) {
    console.log(height);
  }
}
