####1.instanceof是什么
```
instanceof 用来检测 constructor.prototype是否存在于 Object的原型链上边
```
####2.手写instanceof
```typescript
function instanceOf(LEFT:Object,RIGHT:Function) {
  let R=RIGHT.prototype;
  let L=Object.getPrototypeOf(LEFT);
  while (true){
      if (L==null){
          return false;
      } 
      if (L==R){
          return true;
      } 
     L=Object.getPrototypeOf(L);
      
  } 
}
```
