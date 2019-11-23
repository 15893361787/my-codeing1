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