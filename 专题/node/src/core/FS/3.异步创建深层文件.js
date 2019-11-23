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
