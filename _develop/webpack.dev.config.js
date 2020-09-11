const webpack = require('webpack')
const {merge} = require('webpack-merge')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')

const PORT = 3000

const plugins = [
    new webpack.HotModuleReplacementPlugin()
  ]
  if (process.env.BROWSER !== 'none') {
    plugins.push(
      new OpenBrowserPlugin({
        url: `http://localhost:${PORT}`,
      })
    )
  }

const webpackDevConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../src'), // 查找index.html文件的位置
        historyApiFallback: false,
        disableHostCheck: true,
        hot: true,
        host: '0.0.0.0',
        port: PORT
    },
    plugins
}

module.exports = merge(webpackBaseConfig, webpackDevConfig)