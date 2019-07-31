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