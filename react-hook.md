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