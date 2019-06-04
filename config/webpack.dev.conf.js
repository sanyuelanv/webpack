const commonConfig = require('./webpack.common.config')
const webpackMerge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const process = require('process')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const ip = require('ip')
const port = 8080
const host = ip.address()

const config = webpackMerge(commonConfig,{
  mode: 'development',
  devServer: {
    contentBase: path.resolve(process.cwd(), 'dll'),
    compress: true,
    port,
    host,
    historyApiFallback: true,
    after () {
      // 打开页面
      //childProcess.exec(`${cmd} http://${host}:${port}/`)
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      title: '/dll.js',
      template: path.join(appDir, 'app.html'),
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true
      },
      inject: true,
      chunks: ['app']
    })
  ],
  module:{
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: ['style-loader', 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(.*\\.common).*\\.css`),
        use: ['style-loader','css-loader','postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 2500 }
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      }
    ]
  }
})
module.exports = config