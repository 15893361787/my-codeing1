### 双层循环
> 使用双层循环兼容性好
```javascript
function unique(array) {
  let result=[];
  for (let i = 0; i < array.length; i++) {
   for (var item = 0; item < result.length; item++) {
     if (array[i]===result[item]){
          break;
           }
  }
 if(item===result.length)result.push(array[i]);
    
  }
return  result;
}
unique([1,2,3,4,2,1]);
```
### indexOf
```javascript
function unique(array) {
  let result=[];
  for (let index = 0; index < array.length; index++) {
    let currentItem = array[index];
    if (result.indexOf(currentItem)===-1){
            result.push(currentItem);    
         }
    }
return result;
}
unique([1,2,3,4,2,3,4]);
```
### 排序后去重
```javascript
function unique(array) {
  let result=[],seen,sortArray=array.concat().sort();
  for (let index = 0; index < sortArray.length; index++) {
    let currentItem = sortArray[index];
      if (!index||seen!==currentItem){
        result.push(currentItem);
        seen=currentItem;
     }
  }
    return result;
}
  unique([1,2,3,4,1,2,3,4]);
```
### filter方法去重
```javascript
function unique(array) {
  return array.filter((item,index)=>{
     return array.indexOf(item)===index;
  });
}
unique([1,2,3,4,5,1,2,3,4]);
```
### set
```javascript
function unique(array) {
  return [...new Set(array)];
}
unique([1,2,3,4,1,2,3,4])
```
### map去重
```javascript
function unique(array) {
let seen=new Map();
  return array.filter((item)=>{
     return !seen.has(item)&&seen.set(item,1);
});
}
  unique([1,2,3,1,2,3]);
```