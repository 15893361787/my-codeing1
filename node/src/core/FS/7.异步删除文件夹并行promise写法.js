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