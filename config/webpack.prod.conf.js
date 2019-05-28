const commonConfig = require('./webpack.common.config')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const process = require('process')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const outputPath = path.resolve(process.cwd(), 'build')
const assestPathName = 'assest'

const config = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    path: outputPath,
    chunkFilename: `${assestPathName}/[name].[chunkhash:5].js`,
    publicPath: '',
    filename: `${assestPathName}/[name].js`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: { drop_console: true },
          output: { comments: false }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: {
          name:'globals',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          name:'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: `${assestPathName}/[name].[chunkhash:5].css` }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      title: 'demo',
      template: path.join(appDir, 'app.html'),
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true
      },
      inject: true,
      chunks: ['manifest', 'vendors', 'globals', 'app']
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100,
            outputPath: assestPathName,
            // 和 JS / CSS 在统一路径下·
            publicPath: './'
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      }
    ]
  }
})
module.exports = config