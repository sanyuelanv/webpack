let webpackConfig
module.exports = env => {
  switch (env.NODE_ENV) {
    case 'dll':{
      webpackConfig = require('./config/webpack.dll.config')
      break
    }
    case 'prod':
    case 'production': {
      webpackConfig = require('./config/webpack.prod.config')
      break
    }
    case 'dev':
    case 'development':
    default: {
      webpackConfig = require('./config/webpack.dev.config')
    }
  }
  return webpackConfig
} 