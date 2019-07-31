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