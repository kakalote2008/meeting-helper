# meeting-helper

### 实现及依赖

基于vue.js的单页应用：首页载入较慢，通过express的compresion跟webpack的uglifyPlugin缓解

vue.js：使用vue-router作为路由框架

Element.ui:使用了官方脚手架模版

node-json-db:偷懒使用json作为持久化存储，没有使用关系db，导致计算逻辑较为复杂



### 安装

frontend：

cnpm install

cnpm install uglifyjs-webpack-plugin

cnpm install babel-preset-env 

backend：

cd server/

cnpm install



### 部署运行

cnpm run build

cd server/

forever start app.js 



