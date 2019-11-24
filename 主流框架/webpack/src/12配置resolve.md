###alias--常用
```
alias配置别名来映射路径主要用于导入语句中路径映射
resolve: {
        alias: {
            componnet: '../src/api'
        }
    }
```
###mainFields--不常用
```j
加载第三方模块需要优先使用哪个字段下的路径
默认为 mainFields: ["browser", "module", "main"]
```
###extensions---常用
```
为导入语句加上前缀 extensions: ['.js', '.json']
```
###modules--常用
```
配置webpack查找第三方模块的路径
modules:['./src/components','node_modules']
```