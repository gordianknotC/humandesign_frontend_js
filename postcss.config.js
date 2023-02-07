// 如果以parser運作postcss時就要用到 postcss.config.js
// 如果只是把postcss當成postprocessor則不用這些設定


module.exports = {
  //parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    //cssnext: {},
    autoprefixer: {}
  }
}
