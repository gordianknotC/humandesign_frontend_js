var
   path              = require('path'),
   webpack           = require('webpack'),
   config            = require('../config'),
   cssUtils          = require('./css-utils'),
   env               = require('./env-utils'),
   merge             = require('webpack-merge'),
   projectRoot       = path.resolve(__dirname, '../'),
   ProgressBarPlugin = require('progress-bar-webpack-plugin'),
   useCssSourceMap   =
      (env.dev && config.dev.cssSourceMap) ||
      (env.prod && config.build.productionSourceMap)

function resolve(dir) {
   return path.join(__dirname, '..', dir)
}

console.log('==------------------------')
console.log(cssUtils.styleLoaders({
   sourceMap: useCssSourceMap,
   extract: env.prod
}))

module.exports = {
   entry: {
      app: './src/main.js'
   },
   output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: config[env.prod ? 'build' : 'dev'].publicPath,
      filename: 'js/[name].js',
      //NOTE: [original] output with hash
      //chunkFilename: 'js/[id].[chunkhash].js'
      //NOTE: [modified] output without hash
      chunkFilename: 'js/[id].chunked.js',
      //NOTE: [modified] comment out to revert back
      sourceMapFilename: '[name].js.map'
   },
   resolve: {
      extensions: ['.js', '.vue', '.json'],
      modules: [
         resolve('src'),
         resolve('node_modules')
      ],
      alias: config.aliases
   },
   module: {
      rules: [
         // NOTE: comment out to revert to original
         { // eslint
            // enforce: 'pre',
            // test: /\.(vue|js)$/,
            // loader: 'eslint-loader',
            // include: projectRoot,
            // exclude: /node_modules/,
            // options: {
            //   formatter: require('eslint-friendly-formatter')
            // }
         },
         {
            test: /\.svg$/,
            use: 'raw-loader'
         },
         {
            test: /\.data$/,
            use: 'raw-loader'
         },
         {
            test: /\.js$/,
            // loader: 'babel-loader',
            include: projectRoot,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ["@babel/preset-env"],
                  //NOTE: add babel support
                  plugins: ['transform-runtime',"transform-class-properties", "syntax-flow", "transform-flow-strip-types"]
               }
            }
         },
         {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
               postcss: cssUtils.postcss,
               loaders: merge({js: 'babel-loader'}, cssUtils.styleLoaders({
                  sourceMap: useCssSourceMap,
                  extract: env.prod
               }))
            }
         },
         {
            test: /\.sss$/,
            use: [
               {loader: 'postcss-loader', options: {parser: 'sugarss'}}
            ]
         },
         {
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
         },
         {
            test: /\.json$/,
            loader: 'json-loader'
         },
         {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: 'img/[name].[hash:7].[ext]'
            }
         },
         {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: 'fonts/[name].[hash:7].[ext]'
            }
         }
      ]
   },
   plugins: [
      /*
       Take note!
       Uncomment if you wish to load only one Moment locale:
       new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
       */
      new webpack.LoaderOptionsPlugin({
            options: {
               stylus: {
                  use: [cssUtils.poststylus]
               }
            }
         }
      ),
      
      new webpack.DefinePlugin({
         'process.env': config[env.prod ? 'build' : 'dev'].env,
         'DEV': env.dev,
         'PROD': env.prod,
         '__THEME': '"' + env.platform.theme + '"'
      }),
      
      new webpack.LoaderOptionsPlugin({
         minimize: env.prod,
         options: {
            context: path.resolve(__dirname, '../src'),
            postcss: cssUtils.postcss
         }
      }),
      
      new ProgressBarPlugin({
         format: config.progressFormat
      })
   ],
   performance: {
      hints: false
   }
}
