import {TConsole, eCOLORS} from 'console_addon'
import {ComponentNameNotSpecified_Exception} from "./Exceptions"

const Log = new TConsole('mixin', eCOLORS.debug, [/VueComponent./, 'mixin.'])

type TEventRegister = {
   evt: string,
   fn: Function
}
type TEventRegisters = [HTMLElement, TEventRegister]


function getPathName(comp: object) {
   if (comp.$parent !== undefined) {
      let ret = getPathName(comp.$parent) + '.' + comp.name
      return ret
   }
   return comp.name
}

const mixin = {
   methods: {
      findComponentsByName(name: string | RegExp): object{
         let keys = _.keys(this.$root.$refs)
         if (name.constructor.name === 'String') { keys = keys.filter(e => e.indexOf(name) !== -1) }
         else if (name.constructor.name === 'RegExp') { keys = keys.filter(e => name.test(e)) }
         return keys.map(e => this.$root.$refs[e])
      },
      addEventListener(el: HTMLElement, event_name: string, fn: Function) {
         // { comp:[ [element1,{evt:event_name, fn:fn}],...], ...}
         if (!this.__$eventRegisters$__) this.__$eventRegisters$__ = {}
         let _reg = this.__$eventRegisters$__
         if (!_reg[this]) _reg[this] = []
         let register = _reg[this]
         
         register.push([el, {evt: event_name, fn: fn}])
         el.addEventListener(event_name, fn)
         Log.l('addEventListener, document:', document, document.removeEventListener)
      },
      removeEventListener (el: HTMLElement, event_name: string, fn: Function) {
         // { comp:[ [element1,{evt:event_name, fn:fn}],...], ...}
         let register = this.__$eventRegisters$__[this]
         //eslint-disable-next-line eqeqeq
         _.remove(register, (e) => e[0] == el && e[1].evt == event_name && e[1].fn == fn)
         el.removeEventListener(event_name, fn)
      },
      __registCompName__(){
         let name    = getPathName(this)
         let counter = 1
         let refs    = this.$root.$refs
         this.__$pathName$__ = name
         Log.l('pathname:', name, 'this:', this)
         if (!(name in refs)) refs[name] = []
         refs[name].push(this)
      },
   },
   beforeMount(){
      if (this.name) {
         this.__registCompName__()
         Log.l('commit loading @beforeMount', 'this:', this.name )
      }else{
         throw ComponentNameNotSpecified_Exception(this)
      }
      this.__$eventRegisters$__ = {}
      this.$store.commit('loading', this)
      if(getCssClasses) getCssClasses('', false)  //TODO: high performance cost, find a way out to reset cache
   },
   beforeDestroy() {
      // { comp:[ [element1,{evt:event_name, fn:fn}],...], ...}
      if (!this.__$eventRegisters$__) return
      let register: TEventRegisters = this.__$eventRegisters$__[this]
      let self                      = this
      this.$store.commit('unload', this)
      _.forEach(register, (rec: TEventRegisters) => {
         if (!rec) return
         let elt            = rec[0]
         let event_fn_pairs = rec[1]
         let evt_name       = event_fn_pairs.evt
         let fn             = event_fn_pairs.fn
         Log.l('destroyEvent', 'elt:', elt, 'evtName:', evt_name)
         Log.l('destroyEvent', 'self:', self, 'self.name:', self.name)
         self.removeEventListener(elt, evt_name, fn)
      })
   
      let comps = this.$root.$refs[getPathName(self)]
      let index = comps.indexOf(this)
      comps.splice(index)
   }
}


export default mixin
