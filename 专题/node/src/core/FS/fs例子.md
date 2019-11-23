###fs
>node中的文件系统，主要用于文件的操作
####通过buffer进行文件读写
```javascript
let path=require('path');
let fs=require('fs');
fs.open(path.resolve(__dirname,'./a.txt'),'r',((err,readFd)=>{
    fs.open(path.resolve(__dirname,'./b.txt'),'w',((err1,writeFd)=>{
        let buffer=Buffer.alloc(3);
        let readOffset=0;
        let writeOffset=0;
        let next=()=>{
            fs.read(readFd,buffer,0,3,readOffset,((err2,bytesRead)=>{
                if(err2){

                }
                if(bytesRead===0){
                    fs.close(readFd,()=>{
                        console.log('读文件关闭');
                    });
                    fs.close(writeFd,()=>{
                        console.log('写文件关闭');
                    });
                    console.log('文件读写完毕');
                }else{
                    readOffset+=bytesRead;
                    fs.write(writeFd,buffer,0,3,writeOffset,((err3,written)=>{
                        if(err3){

                        }
                        writeOffset+=written;
                        next();
                    }))
                }

            }))
        };
        next();
    }))
}));
```
####同步创建文件
```javascript
let fs=require('fs');
let path=require('path');
let mkdirSync=(pathUrl)=>{
let pathArr=pathUrl.split('/');
    for(let i=0; i<pathArr.length; i++){
       let filePath=pathArr.slice(0,i+1).join('/');
       try{
           fs.accessSync(filePath);
       }catch(e){
           fs.mkdirSync(filePath);
       }

    }
};
mkdirSync('c/d/e');
```
####异步创建文件
```javascript
let path=require('path');
let fs=require('fs');
let mkdir=(pathUrl,callback)=>{
    let pathArray=pathUrl.split('/');
    let next=(index)=>{
        if(index===pathArray.length){
            return callback()
        }
        let currentPath=pathArray.slice(0,++index).join('/');
        fs.stat(currentPath,((err,stats)=>{
            if(err){
                fs.mkdir(currentPath,(err1=>{
                    next(index);
                }))
            }else{
                next(index);
            }
        }))
    };
    next(0);
};
mkdir('a/b/ac/d',()=>{
    console.log('创建成功');
});

```
####同步删除文件夹
```javascript
let path=require('path');
let fs=require('fs');
let removeDirSync=filePath=>{
    let fileStat=fs.statSync(filePath);
    if(fileStat.isDirectory()){
        let fileArr=fs.readdirSync(filePath);
        fileArr=fileArr.map(item=>path.join(filePath,item));
        fileArr.forEach(item=>{removeDirSync(item)});
        fs.rmdirSync(filePath);
    }else{
        fs.unlinkSync(filePath);
    }
};
removeDirSync('a');
```
####异步删除文件夹
```javascript
let fs=require('fs');
let path=require('path');
let rmdir=(filePath,callback)=>{
    fs.stat(filePath,((err,stats)=>{
        if(stats.isDirectory()){
            fs.readdir(filePath,((err1,files)=>{
                files=files.map(item=>path.join(filePath,item));
                let index=0;
                let next=()=>{
                    if(index===files.length){return fs.rmdir(filePath,callback)}
                    let currentDir=files[index++];
                    rmdir(currentDir,()=>{next()});
                };
                next();
            }))
        }else{
            fs.unlink(filePath,()=>{
            });
        }
    }))
};
rmdir('a',()=>{
    console.log('文件删除成功')
});
```
####异步并发删除文件夹
```javascript
let path=require('path');
let fs=require('fs');
let rmdirAll=(filePath,callback)=>{
fs.stat(filePath,((err, stats)=>{
    if(stats.isDirectory()){
        fs.readdir(filePath,((err1, dirs)=>{
            dirs=dirs.map(item=>{return path.join(filePath,item)});
            if(dirs.length===0){return fs.rmdir(filePath,callback)}
            let index=0;
            let done=()=>{
                if(++index===dirs.length){
                    return fs.rmdir(filePath,callback);
                }
            };
            for(let i=0; i<dirs.length; i++){
              rmdirAll(dirs[i],done);
            }
        }))
    }else{
        fs.unlink(filePath,()=>{});
    }
}))
};
rmdirAll('a',()=>{console.log('文件夹删除成功')});
```
####异步promise写法删除文件夹
```javascript
let path=require('path');
let fs=require('fs').promises;
let rmdirPromise=async (filePath)=>{
   let stat=await fs.stat(filePath);
    if(stat.isDirectory()){
        let dirs=await fs.readdir(filePath);
        dirs=dirs.map(item=>{return rmdirPromise(path.join(filePath,item))});
        await Promise.all(dirs);
        await fs.rmdir(filePath);
    }else{
        await fs.unlink(filePath);
    }
};
rmdirPromise('a').then(res=>{console.log('文件删除成功')});
```
####广度优先思想删除文件夹
```javascript
let path=require('path');
let fs=require('fs').promises;
let rmdir= async (filePath)=>{
    let arr=[filePath];
    let index=0;
    let current;
    while((current = arr[index++])){
        let dirs=await fs.readdir(current);
        dirs=dirs.map(item=>path.join(current,item));
        arr=[...arr,...dirs];
    }
    for(let i =  arr.length-1 ; i>=0;i--){
        await fs.rmdir(arr[i]);
    }

};
rmdir('c').then(res=>{console.log('删除成功')});
```