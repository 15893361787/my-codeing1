```javascript
let fs = require('fs');
let path = require('path');
let vm = require('vm');
let wrapper = [
    '(function(exports,module,require,__dirname,__filename){'
    ,
    '})'
];
function myRequire(filePath,prePath){
    let relative_path = path.resolve(prePath,filePath);/*获取文件绝对路径*/
    let isExist=false;
    try {
        fs.accessSync(relative_path);
        isExist = true;
    } catch (e) {
        Object.keys(Module._ectensions).some(item => {
            relative_path += item;
            try {
                fs.accessSync(relative_path);
                isExist = true;
                return true;
            } catch (e) {
                return false;
            }
        })
        }
    if (isExist){
        if (Module._cache[relative_path]){
            return Module._cache[relative_path].exports;
        }
        let currentModule = new Module(relative_path);
        Module._cache[relative_path] = currentModule;
        currentModule.load();
        return currentModule.exports;
    }else {
        throw new Error('file not exits');
    }

}
function Module(id){
    this.id=id;
    this.exports={};
}
Module._cache={};
Module._ectensions={
    '.js'(module) {
        let content = fs.readFileSync(module.id, 'utf-8');
        let functionScript = wrapper[0] + content + wrapper[1];
        let fun = vm.runInThisContext(functionScript);
        fun.call(module.exports, module.exports, module, myRequire);
    },
    '.json'(module) {
        let json = fs.readFileSync(module.id, 'utf-8');
        module.exports=JSON.parse(json);
    }
};
Module.prototype.load=function(){
      let extName = path.extname(this.id);
      Module._ectensions[extName](this);
};
module.exports={myRequire};
```
