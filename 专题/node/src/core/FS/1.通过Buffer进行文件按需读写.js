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