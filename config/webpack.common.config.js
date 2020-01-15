const path = require('path')
const process = require('process')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
module.exports = {
  entry: { 'app': [path.resolve(appDir, 'app.tsx')] },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true')) })
  ],
  resolve: {
    extensions: [".ts", ".tsx",'.js']
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      use: ['ts-loader'],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  }
}