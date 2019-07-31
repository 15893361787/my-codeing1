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