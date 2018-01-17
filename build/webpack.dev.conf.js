'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const cnabsConfig = require('./cnabs') 

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'), 
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: cnabsConfig.abs.output,
      template: cnabsConfig.abs.tmpl,
      chunks:[ cnabsConfig.abs.name], 
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: cnabsConfig.expert.output,
      template: cnabsConfig.expert.tmpl,
      chunks:[ cnabsConfig.expert.name], 
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: cnabsConfig.product.output,
      template: cnabsConfig.product.tmpl,
      chunks:[ cnabsConfig.product.name], 
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: cnabsConfig.trade.output,
      template: cnabsConfig.trade.tmpl,
      chunks:[ cnabsConfig.trade.name], 
      inject: true
    }),
    // new BundleAnalyzerPlugin(
    //   { 
    //     analyzerMode: 'static', 
    //     // analyzerHost: '127.0.0.1', 
    //     // analyzerPort: 3334, 
    //     reportFilename: 'report.html', 
    //     defaultSizes: 'parsed',
    //     // Automatically open report in default browser
    //     openAnalyzer: false,
    //     // If `true`, Webpack Stats JSON file will be generated in bundles output directory
    //     generateStatsFile: true,
    //     // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.         
    //     statsFilename: 'stats.json', 
    //     statsOptions: null,
    //     // Log level. Can be 'info', 'warn', 'error' or 'silent'.
    //     logLevel: 'info'
    //   }
    // ),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
