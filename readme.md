# 从 0 开始搭建一个 typeScript react工程
## 大纲
  * 项目结构搭建
  * `entry` & `output` & `plugins` & `module`
  * `ts` 里面引入资源
## 创建工程
### `typeScript` 安装 & 配置 
  * 安装 `npm i --save-dev @types/react @types/react-dom ts-loader typescript @teamsupercell/typings-for-css-modules-loader`  
  * 创建 `tsconfig.json`  
    ```JSON
    {
      "compilerOptions": {
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "es6",
        "target": "es5",
        "jsx": "react"
      }
    }
    ```
### `postcss` 安装 & 配置 
  * 安装   `npm i --save-dev autoprefixer`
  * 配置
    ```javascript
    // touch postcss.config.js
    const autoprefixer = require('autoprefixer')
    module.exports = {
      plugins: [
        autoprefixer({ browsers: ['last 2 versions'] })
      ]
    }
    ```
### `webpack` 安装 & 配置 
  * 安装  
    * 工具包  
    `npm i --save-dev webpack webpack-cli `  
    * 服务器工具包  
    `npm i --save-dev webpack-dev-server webpack-dev-middleware webpack-hot-middleware`  
    * 打包工具包  
    `npm i --save-dev babel-loader style-loader css-loader postcss-loader   url-loader file-loader webpack-merge clean-webpack-plugin html-webpack-plugin uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin mini-css-extract-plugin inline-manifest-webpack-plugin copy-webpack-plugin`
  * 详细介绍
    * `webpack` 核心包
    * `webpack-cli` 命令行工具
    * `webpack-dev-server` 提供一个简单的Web服务器和使用实时重新加载的能力，[介绍](https://webpack.js.org/guides/development/#using-webpack-dev-server)
    * `webpack-dev-middleware` 自己搭建一个服务器去用于开发的时候用到
    * `webpack-hot-middleware` 自己搭建一个服务器，拥有实时重新加载能力
    * `webpack-merge` 合并配置，分离 `common` 分别合并回去 `config` & `production`
    * `style-loader` & `css-loader` & `postcss-loader  ` 样式
    * `url-loader` & `file-loader` 资源文件
    * `clean-webpack-plugin` 清理上一次打包
    * `html-webpack-plugin ` HTML 生成
    * `uglifyjs-webpack-plugin` 压缩 `JS`
    * `optimize-css-assets-webpack-plugin` 压缩CSS
    * `mini-css-extract-plugin` 分离 `css`
    * `inline-manifest-webpack-plugin` 把 `manifest` 写入到 `HTML`（`manifest` & `runtime`）
    * `copy-webpack-plugin` 把资源复制到指定目录