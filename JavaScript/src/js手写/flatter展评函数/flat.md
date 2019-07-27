###flat函数实现
```javascript
Array.prototype.myFlat = function(n=1){
    if(n > 0) { return this; }
     return this.reduce((a,b)=>{
        if(Array.isArray(b)){ // 只要是是数组就递归展开即可
             return a.concat(b.myFlat(--n));
         }else{
             return [...a,b];
        }
     },[])
 }
 let r = [1,[2,[3,[4,[5,[6]]]]]].myFlat();
 console.log(r);
```
