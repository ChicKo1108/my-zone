const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: "development",
  devServer: {
    hot: true,
    open: true, 
    host: '0.0.0.0',
    port: 3333,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      }
    },
    historyApiFallback: true  //缺少该配置，页面404
  }
});
