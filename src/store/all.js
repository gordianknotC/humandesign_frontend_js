import Vue from 'vue'
import Vuex from 'vuex'
import {_} from '../lodash_addon'
import {TConsole, eCOLORS} from '../console_addon'
import {walkAndDo, ErrorMsg} from '../Utils.js'
import {ComponentNotLoadedProperly_Exception} from '../Exceptions'

const Log           = new TConsole('store.all', eCOLORS.info, [/Function./, 'Store.all.'])
const infiniteLoops = 8

Vue.use(Vuex)


// ---------------------------------------------------
//                   Parallax component
// ---------------------------------------------------
function layoutIndexAction(state, name, param){
   let value = `${name}_` + param.name
   if (value === state.ui) return
   let indexComp = window.__$vm$__.$root.$refs['app.router.index'][0]
   state.ui = value
   Log.l(`[Store.Index.${name}], param:`,param)
   indexComp[name]( param )
}
const layoutIndex = {
   namespaced: true,
   state    : {
      ui:null
   },
   mutations: {
      loading(state, param){
         layoutIndexAction(state,'loading', param)
      },
      loaded(state, param){
         layoutIndexAction(state, 'loaded', param)
      }
   },
   getters:{
      state(state){ return state.ui }
   }
}
const layoutMain  = {
   namespaced: true,
   state    : {
      action      : 'loading',
      lastBehavior: 'none',
      behavior    : 'none'
   },
   mutations: {
      hover(state, id){
         state.lastBehavior = state.behavior
         state.behavior     = {name: 'hover', id: id}
      },
      hout(state){
         state.lastBehavior = state.behavior
         state.behavior     = {name: 'hout', id: state.lastBehavior.id}
      },
      triggerAction(state, act){
         state.action       = 'trigger' + act
         state.lastBehavior = state.behavior
         state.behavior     = {name: 'triggered', id: state.lastBehavior.id}
      },
   },
   getters  : {}
}
const parallax    = {
   namespaced: true,
   state     : {
      compsInViewport: new Set(),
      components     : new Set()
   },
   mutations : {
      addViewportComp (state, comp){
         state.compsInViewport.add(comp)
      },
      removeViewportComp(state, comp){
         state.components.delete(comp)
      }
   },
   getters   : {
      getViewportComps (state)/*:Set<Parallax>*/ {
         return state.compsInViewport
      },
      getComponentsByPath(state, path/*:{key:string, value:any}*/)/*:?Parallax*/{
         for (let comp of state.components) {
            if (comp[path.key] === path.value) return comp
         }
      }
   }
}


// ---------------------------------------------------
//             global store for Index component
// ---------------------------------------------------
const store = new Vuex.Store({
   modules  : {
      parallax: parallax,
      index   : layoutIndex,
      main    : layoutMain
   },
   state    : {
      // components recorder, for implementing onAllComponentsLoaded
      //components: new Set()
      loading: new Set(),
      loaded: new Set()
   },
   
   getters  : {
      getCompByPath: (state /*:object*/, path/*: {key:string, value:object}*/)/*:?object*/ => {
         for (let comp of state.loaded) {
            if (comp[path.key] === path.value) return comp
         }
      }
   },
   mutations: {
      // NOTE: define loading and loaded state methods
      // commit before children mounted
      unload(state, comp){
        state.loaded.delete(comp)
      },
      loading (state, comp){
         state.loading.add(comp)
         Log.i('[store.loading] comp:', comp.name, 'state.loading:', state.loading)
         //if (comp.loading) store.commit(`${comp.name}/loading`, comp)
         function testLoaded() {
            if (comp._isMounted) {
               Log.l(`[store.loading.testLoaded] component: "${comp.name}" mounted, invoke commit loaded, loading method:${comp.loading}`)
               state.loading.delete(comp)
               state.loaded.add(comp)
               store.commit('loaded', comp)
            } else {
               Log.l(`[store.loading.testLoaded] component: "${comp.name}" not mounted, testLoaded again`)
               _.scheduleOnce(testLoaded, 50)
            }
         }
         _.scheduleOnce(testLoaded, 50)
      },
      // commit when children mounted
      loaded (state, comp){
         let comp_sum      = state.loading.size + state.loaded.size
         if (!state.loaded.has(comp)) {
            throw new ComponentNotLoadedProperly_Exception(comp, state.loaded)
         }
         function testAllComponentsLoaded() {
            let comps_counter = 0
            walkAndDo(comp.$root.$children[0], e => e.$children, i => i.length !== 0, (comp) => {
               if (!state.loaded.has(comp)) {
                  Log.l(`[store.loaded.walkAndDo] component:${comp.name} not loaded yet, test again`)
                  //return _.scheduleOnce(testAllComponentsLoaded, 100, {identity: 'commitLoaded'})
                  throw new ComponentNotLoadedProperly_Exception(comp, state.loaded)
               } else {
                  comps_counter++
                  Log.l('comps counter:', comps_counter, comp_sum)
               }
            })
            if (comp_sum === comps_counter) {
               _.CONST.scheduleIDs['commitLoaded'].cancel()
               state.loading = new Set()
               comp.$root.onAllComponentsLoaded()
            } else {
               Log.l(`[store.loaded.testAllComponentsLoaded] component not loaded yet, test again loading.size:${state.loading.size}, loaded.size:${state.loaded.size}`)
               if (comps_counter - comp_sum > infiniteLoops) {
                  _.CONST.scheduleIDs['commitLoaded'].cancel()
                  Log.error('Oops! seems infinite loading happens, rest components to be loaded:', state.loading)
                  state.loading = new Set()
               } else {
                  _.scheduleOnce(testAllComponentsLoaded, 60, {identity: 'commitLoaded'})
               }
            }
         }
         
         Log.l('[store.loaded] comp:', comp.name)
         _.scheduleOnce(testAllComponentsLoaded, 60, {identity: 'commitLoaded'})
      }
   }
})


export{
   store, parallax
}
