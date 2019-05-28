const path = require('path')
const process = require('process')
const webpack = require('webpack')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const entry = {
  'app':[path.resolve(appDir, 'app.js')]
}


module.exports = {
  entry,
  output: {
    path: path.resolve(process.cwd(), 'build'),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({ PropTypes: 'prop-types' }),
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true')) })
  ],
  module: {
    rules: [{
      test: /\.(js)$/,
      use: ['babel-loader'],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  },
}