const path = require('path')
const process = require('process')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
module.exports = {
  entry: { 'app': [path.resolve(appDir, 'app.js')] },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true')) })
  ],
  module: {
    rules: [{
      test: /(js)$/,
      use: ['babel-loader'],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  },
}