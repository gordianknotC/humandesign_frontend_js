module.exports = {
   root: true,
   parserOptions: {
      sourceType: 'module'
   },
   env: {
      browser: true
   },
   globals: {
      'cordova': true,
      //'DEV': true,
      //'PROD': true,
      //'__THEME': true
   },
   // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
   extends: 'standard',
   // required to lint *.vue files
   plugins: [
      'html',
      'jest',
      'jest-async'
   ],
   // add your custom rules here
   'rules': {
      "new-cap": 0,
      "strict": [
         2,
         "global"
      ],
      "key-spacing":0,
      "indent":0,
      "no-multiple-empty-lines":0,
      "no-trailing-spaces":0,
      "space-before-function-paren":0,
      "camelcase":0,
      "no-underscore-dangle"         : 0,
      "no-use-before-define"         : 0,
      "no-unused-vars"               : 1,
      "no-undef"                     : 1,
      "eol-last"                     : 0,
      "quotes"                       : 0,
      "comma-dangle"                 : 0
      //    "react/jsx-boolean-value"      : 1,
      //    "react/jsx-quotes"             : 1,
      //    "react/jsx-no-undef"           : 1,
      //    "react/jsx-uses-react"         : 1,
      //    "react/jsx-uses-vars"          : 1,
      //    "react/no-did-mount-set-state" : 1,
      //    "react/no-did-update-set-state": 1,
      //    "react/no-multi-comp"          : 1,
      //    "react/no-unknown-property"    : 1,
      //    "react/react-in-jsx-scope"     : 1,
      //    "react/self-closing-comp"      : 1
   }
}
