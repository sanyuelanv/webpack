# 从 0 开始搭建一个现代化 web 前端工程
## 大纲
  * 项目结构搭建
  * `entry` & `output` & `plugins` & `module`
  * 第三方 `CSS` 文件插入
  * 分离 `js` 文件的策略
  * `DLL` 文件分离
## 创建工程
### `babel` 安装 & 配置 
  * 安装
    * 核心包  
        `npm i --save-dev @babel/cli @babel/core @babel/preset-env`  
    * 补丁包  
        `npm i --save @babel/polyfill`   (不建议使用)  
        `npm i --save core-js regenerator-runtime whatwg-fetch`   
    * 项目包  
        `npm i --save-dev @babel/preset-react`
    * 项目优化工具包  
      `npm i --save-dev @babel/plugin-proposal-class-properties babel-plugin-transform-react-remove-prop-types`  
  * 详细介绍  
    * `@babel/cli` 命令行代码，除了配合 `webpack` 使用，还能使用命令行使用 : `./node_modules/.bin/babel test/test.js`
    * `@babel/core` 核心代码  
    * `@babel/plugin-proposal-class-properties` 类属性语法，[官网介绍](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)  
    * `@babel/polyfill` 补丁包，模拟完整的 ES6 运行环境，[官网介绍](https://babeljs.io/docs/en/babel-polyfill#docsNav)
    * `@babel/preset-env` 智能预设环境，最新版的 `useBuiltIns` 参数可以按需加载的补丁包 [官网介绍](https://babeljs.io/docs/en/babel-preset-env#docsNav)。**`@babel/polyfill` is deprecated. Please, use required parts of `core-js`
  and `regenerator-runtime/runtime` separately**
    * `babel-plugin-transform-react-remove-prop-types` 打包的时候去掉 `react` 的 `prop-types`
    * `whatwg-fetch` Web Hypertext Application Technology Working Group  `core-js` 不包括 `fetch` 的补丁包
  * 创建 `.babelrc`  
    ```JSON
    // touch .babelrc
    {
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "usage", // core-js regenerator-runtime 自动导入
            "corejs":"3.0.0"
          }
        ],
        "@babel/preset-react"
      ],
      "plugins": [
        "transform-react-remove-prop-types",
        "@babel/plugin-proposal-class-properties"
      ]
    }
    ```
### `postcss` 安装 & 配置 
  * 安装  
  `npm i --save-dev autoprefixer`
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
### `eslint` 安装 & 配置 
  * 安装  
    * 核心包  
    `npm i --save-dev eslint babel-eslint`  
    * 项目包  
    `npm i --save-dev eslint-plugin-react`
    * 配置  
      使用 ` ./node_modules/.bin/eslint --init` 创建配置，按照项目去选择其中的一些选项，自动生成了 `eslintrc.js` 文件。如下面代码，我们还需要根据使用的 `babel` 和 `react` 做一些配置的修改
      ```javascript
      module.exports = {
          // 告诉 eslint 我们用了 babel 的
          "parser": "babel-eslint",
          "env": {
              "es6": true,
              "browser": true,
              "node": true
          },
          "extends": [
              "eslint:recommended",
              // 项目相关：使用了 react
              "plugin:react/recommended"
          ],
          "globals": {
              "Atomics": "readonly",
              "SharedArrayBuffer": "readonly",
              // 不用每次都导入 PropTypes
              "PropTypes": false
          },
          "parserOptions": {
              "ecmaFeatures": {
                  "jsx": true
              },
              "ecmaVersion": 2019,
              "sourceType": "module"
          },
          "plugins": [
              "react"
          ],
          "rules": {
          }
      };
      ```
  
## react-hook 

### 前言
react-hook 之前 UI 和 state 是结合在一起的，我们称之为组件。  
缺点  
* 并非所有的 UI 都需要状态
* state 的流动变得很复杂
* 组件内部处理数据的逻辑和它的生命周期绑定，导致相同 UI 不同逻辑的组件 / 相同逻辑不同 UI 的组件很难复用
* `class` 写法站在 2015 年从出发，其实是对 ES6 标准的追求。但是在 2017，2018，乃至今天 2019 都没能摆脱 `polyfill` 的依赖（展示代码比较两者区别）  

回到 react-hook 本身，它抛弃了新的语法，而是号召大家回到 `function - base` 的写法上。把引入新语法的做法抛弃了，改成引入一个 rule。通过引入 rule 来做把处理 state 的复杂度降低。

### 10 个 API 
1.  useState
2.  useEffect
3.  useContext （减少数据传递层级）
4.  useReducer (优化使用)
5.  useCallback (app 下 state 一改变就会造成 render 。子组件都重新执行 render)
6.  useMemo (组件级别的)
7.  useRef (获取 dom 节点)
8.  useImperativeHandle (跨组件获取 dom 节点)
9.  useLayoutEffect （和 dom 改变同步进行）
10. useDebugValue

### 实战
* 搭建项目：输入框，底部内容
* `state` 使用
* 接口代理：`http://localhost:3000` & axios
* useState , useEffect ,
* 分离逻辑&数据 - UI 组件
* 增加一个点击按钮: useCallback 的简单带过