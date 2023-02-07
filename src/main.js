// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.mat.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// overall css settings and utils
//import 'normalize.css/normalize.css'
//require('normalize.css') //NOTE: due to dependency not found, so I put it in themes folder
// require("suitcss-base")
require('eventPolyfill.js')

import {ElementQueries} from 'css-element-queries'
import Vue from 'vue'
import router from './router'
import {store} from './store/all'
import App from './App'

var vm


router.beforeEach((to, from, next) => {
   console.log("main.js, beforeEach:", router)
   next()
})

//router.addGuardPlugin(router.beforeEach, (to, _from, next)=>{
//   SET_CURRENT_PAGEVIEW()
//   console.log('hit pageview:', location.href)
//   next()
//})

function checkConfiguration(vm){
   const configError = vm.$root.$refs !== undefined
   console.assert(configError, 'config Error, you should put ref attribute in router-view tag at App '+
      'component', vm.$root.$refs )
   
}

function vueOnly() {
   vm = new Vue({
      el     : '#appRoot',
      router,
      store,
      data(){
         return {
            name         : 'app',
            loadedCounter: 0
         }
      },
      render : (h) => h(App),
      methods: {
         onAllComponentsLoaded(){
            console.info('all components loaded')
            ElementQueries.init()
         }
      }
   })
   checkConfiguration(vm)
   window.__$vm$__  = window.vm = vm
}


let init            = ElementQueries.init.bind(ElementQueries)
ElementQueries.init = () => {
   console.log('---------ElementQueries init--------------')
   init()
}

window.ElementQueries = ElementQueries
vueOnly()

