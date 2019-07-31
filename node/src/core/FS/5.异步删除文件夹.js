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