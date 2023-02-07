import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
   return () => import(`components/${component}.vue`)
}

//NOTE: following codes currently useless
function registerHook (list, fn) {
   list.push(fn)
   return function () {
      let i = list.indexOf(fn)
      if (i > -1)  list.splice(i, 1)
   }
}

VueRouter.prototype.addGuardPlugin = function addGuardPlugin(guardType, fn){
   switch (guardType){
      case this.beforeEach:
         registerHook(this.beforeHooks, fn)
         break
      case this.beforeResolve:
         registerHook(this.resolveHooks, fn)
         break
      case this.afterEach:
         registerHook(this.resolveHooks, fn)
         break
   }
}


export default new VueRouter({
   /* ---------------------------------------------------------------
   *
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
   
   routes: [
      {path: '*',                   component: load('Error404')}, // Not found
      {path: '/demo',               component: load('Demo')},
      {path: '/',                   component: load('Index')},
      //{path: '/demo/parallaxScene', component: load('parallaxSceneIndex')},
      //{path: '/demo/parallax',      component: load('parallaxIndex')},
      {path: '/demo/lgGlass',       component: load('lgGlassIndex')},
      {path: '/demo/loader',        component: load('loaderComp')},
      {path: '/demo/humandesign',   component: load('humandesignComp')},
      {path: '/demo/paperjs',       component: load('testComp_paperjs')},
   ]
})
