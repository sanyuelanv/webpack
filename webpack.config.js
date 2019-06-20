let webpackConfig
module.exports = env => {
  switch (env.NODE_ENV) {
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