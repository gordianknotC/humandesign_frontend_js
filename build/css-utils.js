var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer      = require('autoprefixer'),
    //precss            = require('precss'),
    post_variable     = require('postcss-css-variables'),
    post_minmax       = require('postcss-media-minmax'),
    post_animation    = require('postcss-animation'),
    //post_vlookup      = require('postcss-property-lookup'),
    post_opacity      = require('postcss-opacity'),               // 解決IE的opacity
    post_rgb          = require('postcss-color-rgba-fallback'),
    post_pseudo_el    = require('postcss-pseudoelements'),        // 解決IE的pseudo elements與chrome不同, integrate different pseudo elements syntax
    post_vm           = require('postcss-vmin'),
    post_mqpacker     = require("css-mqpacker"),                  // allow duplicate media queries https://github.com/hail2u/node-css-mqpacker
    post_font         = require('postcss-font-magician'),         // https://github.com/jonathantneal/postcss-font-magician 會讓每個import的css 重複font定義
    //post_lost         = require('lost'),
    post_import       = require('postcss-import'),
    //post_next       = require('postcss-cssnext'),
    purify            = require('purify-css'),
    glob              = require('glob'),
    path              = require('path'),
    fs                = require('fs'),
    //sugarss           = require('sugarss'),
    poststylus        = require('poststylus')


module.exports.poststylus = poststylus(['autoprefixer', 'rucksack-css'])

module.exports.postcss      = {
  plugins: [
    post_import({
      // addDependencyTo: webpack,
      path: [ path.resolve(__dirname + "/node_modules") ]
    }),
    //precss(),
     //post_lost(),
    post_rgb(), post_pseudo_el(), post_variable(), post_animation() ,
    //post_vlookup(),
    post_opacity(), post_mqpacker(), post_vm(), post_font(),post_minmax(), autoprefixer()],
  options: {
    // parser: sugarss
  }
}
module.exports.styleLoaders = function (options) {
  options = options || {}

  function generateLoaders(loaders) {
    if (options.postcss) {
      loaders.splice(1, 0, 'postcss')
    }

    var sourceLoader = loaders
      .map(function (loader) {
        var extraParamChar
        if (/\?/.test(loader)) {
          loader         = loader.replace(/\?/, '-loader?')
          extraParamChar = '&'
        }
        else {
          loader         = loader + '-loader'
          extraParamChar = '?'
        }
        return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
      })
      .join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader'
      })
    }
    else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css', 'postcss']), // FIXME: postcss with sugar parser
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    styl: generateLoaders(['css', 'stylus']),
    stylus: generateLoaders(['css', 'stylus'])
  }
}

module.exports.styleRules = function (options) {
  var output  = []
  var loaders = exports.styleLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

function getSize(size) {
  return (size / 1024).toFixed(2) + 'kb'
}

module.exports.purify = function (cb) {
  var css = glob.sync(path.join(__dirname, '../dist/**/*.css'))
  var js  = glob.sync(path.join(__dirname, '../dist/**/*.js'))

  Promise.all(
    css.map(function (file) {
      return new Promise(function (resolve) {
        console.log('\n Purifying ' + path.relative(path.join(__dirname, '../dist'), file).bold + '...')
        purify(js, [file], {minify: true}, function (purified) {
          var oldSize = fs.statSync(file).size
          fs.writeFileSync(file, purified)
          var newSize = fs.statSync(file).size

          console.log(
            ' * Reduced size by ' +
            ((1 - newSize / oldSize) * 100).toFixed(2) +
            '%, from ' +
            getSize(oldSize) +
            ' to ' +
            getSize(newSize) +
            '.'
          )
          resolve()
        })
      })
    })
  ).then(cb)
}
