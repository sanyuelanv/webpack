let webpackConfig
module.exports = env => {
  switch (env.NODE_ENV) {
    case 'dll':{
      webpackConfig = require('./config/webpack.dll.conf')
      break
    }
    case 'prod':
    case 'production':{
      webpackConfig = require('./config/webpack.prod.conf')
      break
    }
    case 'dev':
    case 'development':
    default:{
      webpackConfig = require('./config/webpack.dev.conf')
    }
  }
  return webpackConfig
}
