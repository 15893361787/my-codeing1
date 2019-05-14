####1.instanceof是什么
```
instanceof 用来检测 constructor.prototype是否存在于 Object的原型链上边
```
####2.手写instanceof
```javascript
function instanceOf(LEFT,RIGHT) {
  let R=RIGHT.prototype;
  let L=LEFT.__proto__;
  while (true){
      if (L==null){
          return false;
      } 
      if (l==r){
          return true;
      } 
      l=l.__proto__;
      
  } 
}
```