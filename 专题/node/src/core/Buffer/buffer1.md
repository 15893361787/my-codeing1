###Buffer
> Buffer  node中用于存储二进制文件，可以和字符串相互转换
####API
```javascript
let buffer1 = Buffer.alloc(100); /*创建一个Buffer指定大小*/
let buffer2 = Buffer.from('我爱你');/*从已有的空间创建一个Buffer*/
let buffer3 = Buffer.from('中国');
/*buffer拷贝*/
buffer2.copy(buffer1,0,0,buffer2.length);
buffer3.copy(buffer1,buffer2.length,0,buffer3.length);
/*多个Buffer进行拷贝到一个Buffer返回一个新的Buffer*/
Buffer.concat([buffer2, buffer3]);
/*buffer 截取固定长度返回一个新的Buffer*/
buffer2.slice(0, 6).toString();
/*判断是否为Buffer*/
Buffer.isBuffer(buffer2);
```
####部分Buffer API原理
```javascript
Buffer.prototype.myCopy=function(targetBuffer, targetStart, sourceStart, sourceEnd){
    for (let i = 0; i < sourceEnd-sourceStart; i++) {
       targetBuffer[targetStart+i]=this[sourceStart+i];

    }
};
Buffer.myConcat=function(bufferList,len=bufferList.reduce((a,b)=>a+b.length,0)){
    let buffer = Buffer.alloc(len);
    let offset=0;
    bufferList.forEach(item=>{
        item.copy(buffer,offset,0,item.length);
        offset+=item.length;
    });
    return buffer;
};
Buffer.prototype.split=function(seq){
    let arr=[];
    let offset=0;
    let current;
    let len=Buffer.from(seq).length;
    while (-1!==(current=this.indexOf(seq,offset))){
        arr.push(this.slice(offset,current));
        offset=current+len;
    }
    arr.push(this.slice(offset));
    return arr;
};****
```