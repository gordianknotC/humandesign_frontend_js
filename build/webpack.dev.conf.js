var
  config               = require('../config'),
  webpack              = require('webpack'),
  merge                = require('webpack-merge'),
  cssUtils             = require('./css-utils'),
  baseWebpackConfig    = require('./webpack.base.conf'),
  HtmlWebpackPlugin    = require('html-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/hot-reload'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  //NOTE: [original] cheap-module-eval-source-map
   devtool: undefined,
  // devtool: '#cheap-module-eval-source-map',
  // devtool:"#inline-cheap-source-map",
  // devtool:"#inline-cheap-module-source-map",
   //devtool: "#eval-source-map",
  //devtool: "#inline-source-map",
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  module: {
    rules: cssUtils.styleRules({
      sourceMap: config.dev.cssSourceMap,
      postcss: true
    })
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map',
        exclude : ['vendor.js'],
       //NOTE: [modified] source map naming template, comment out to revert back
       moduleFilenameTemplate: 'source:///[resource-path]'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin({
      clearConsole: config.dev.clearConsoleOnRebuild
    })
  ],
  performance: {
    hints: false
  }
})
