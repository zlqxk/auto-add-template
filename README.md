### demo阶段

引入 autoAddTemp.js 在根目录下，然后使用 node autoAddTemp.js 启动脚本，该脚本会监听 src/pages 下的目录变化，自动在根目录下生成 routerMap，路由路径为 pages 目录下的路径，然后就可以在入口文件引入 routerMap，遍历生成 Route 即可

注意，如果使用create-react-app脚手架生成，需要在webpackConfig中关闭ModuleScopePlugin插件，该插件会禁止开发者import src路径外的js
