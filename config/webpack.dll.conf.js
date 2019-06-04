const path = require('path')
const process = require('process')
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    // DLL 库
    dll: ['react', 'react-dom']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dll'),
    library: '[name]'
  },
  plugins: [
  // 接入 DllPlugin
    new webpack.DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      name: '[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.resolve(process.cwd(), 'dll', '[name].manifest.json')
    }),
  ]
}