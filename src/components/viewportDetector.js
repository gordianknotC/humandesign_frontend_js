// @flow

import {_} from '../lodash_addon'

import {Animation} from '../animation'
import {TConsole, eCOLORS, TConsole_instances} from '../console_addon'
import {eSTATE} from '../types'

function setLog(){
   return new TConsole('ViewpowertDetector' + _.random(1000) + '-' + _.random(1000)  , eCOLORS.info)
}

class ViewportMediator {
   viewportDetector: ViewportDetector
   animator: Animation
   _cacheSceneHeight: number
   namedConfig: { [string]: any }[]
   seekFns: { [string]: Function }
   topWithin: Function
   bottomWithin: Function
   compass: Function
   configMap: { [string]: number }
   
   constructor( ) {
      this.Log = setLog()
      let self = this
      for (let name of ['topWithin', 'bottomWithin', 'compass']) { //$flowNOTE:
         self[name] = () => {
            let params = self.seek(name)
            self.animator.seek(params[0], params[1])
         }
      }
   }
   
   _getSceneHeight(): number {
      if (this._cacheSceneHeight) return this._cacheSceneHeight
      this._cacheSceneHeight = this.namedConfig.reduce((result: number, value: StageConfig) => result + value.scrollHeight(), 0)
      return this._cacheSceneHeight
   }
   
   _getStageHeight(name: string): number {
      let ret: StageConfig = _.pickBy(this.namedConfig, (e: StageConfig) => e.name === name)
      if (ret) return ret.scrollHeight()
      this.Log.warn('getStageHeight of zero')
      return 0
   }
   
   _getStageRatio(name: string) {
      // calculate duration automatically
      return this._getStageHeight(name) / this._getSceneHeight()
   }
   
   plugin(viewportDetctor: ViewportDetector, animator: Animation) {
      this.viewportDetector          = viewportDetctor
      this.viewportDetector.mediator = this
      this.animator                  = animator      //$flowNOTE:
      this.animator.mediator         = this
      this.ViewConfigInit()
      _.forEach(this.animator.namedCallbacks, (cbs, name:string) => {
         if (cbs.update) { //$flowNOTE:
            this[name] = function( ){
               let params = this.seek(name) // NOTE: orig: in constructor => self.seek(name)
               if (cbs.update(this.animator, params[0], params[1]) === false) return
               this.animator.seek(params[0], params[1])
            }
         }
         switch (name){
            case 'topWithin': //$flowNOTE:
               if(cbs.began)     this['onTopEnterR'] = cbs.began //$flowNOTE:
               if(cbs.completed) this['onTopLeaveL'] = cbs.completed
               break
            case 'compass': //$flowNOTE:
               if(cbs.began)     this['onTopLeaveR'] = cbs.began //$flowNOTE:
               if(cbs.completed) this['onBottomEnterR'] = cbs.completed
               break
            case 'bottomWithin': //$flowNOTE:
               if(cbs.began)     this['onBottomEnterR'] = cbs.began //$flowNOTE:
               if(cbs.completed) this['onBottomLeaveL'] = cbs.completed
               break
         }
      })
      
   }
   
   seek(stageName: string) {
      let config_id       = this.configMap[stageName]
      let ratio = 0.333333
      let start_ratio = ratio * config_id
      // FIXME: 這只是一個trick 應該有更好的方法  ：
      // NOTE: 當物件小於viewport 時             ：
      if (this.viewportDetector.viewportHeight() >= this.animator.el.offsetHeight){
         if(config_id === 0){
            ratio = ratio * this.viewportDetector.viewportHeight() / this.animator.el.offsetHeight
         }else if(config_id === 1){
            start_ratio = 2 * ratio
            ratio = -ratio
         }else{
            ratio = ratio * this.viewportDetector.viewportHeight() / this.animator.el.offsetHeight
            start_ratio = 0.666666 - ratio * (this.viewportDetector.viewportHeight() - this.animator.el.offsetHeight ) / this.viewportDetector.viewportHeight()
         }
      }
      let sceneProportion = this.seekFns[stageName](start_ratio, ratio)
      //this.Log.l('seek:', stageName, start_ratio, ratio, 'scene:', sceneProportion)
      // this.animator.seek(sceneProportion, stageName)
      return [sceneProportion, stageName]
   }
   
   ViewConfigInit(tns:string[] = ['']) {
      let self   = this.viewportDetector
      let anim   = this.animator
      let rect   = self.el.getBoundingClientRect()
      let seekFn = this.seekFns = {}
      let section_top = () => self.viewportBottom() - self.viewportTop()
      let section_com = () => rect.height - section_top()
      let section_btm = () => section_top()
      let namedConfig = this.namedConfig = [
         {name: 'topWithin', scrollHeight: section_top, ratio: 0},
         {name: 'compass', scrollHeight: section_com, ratio: 0},
         {name: 'bottomWithin', scrollHeight: section_btm, ratio: 0}
      ]
      this.configMap  = {topWithin: 0, compass: 1, bottomWithin: 2}
      const constrain = (min: number, max: number,
                         value: number) => value > max ? max : Math.max(min, value)
      
      for (let tn of tns) {
         seekFn[tn + 'topWithin']    = function (start: number, ratio: number) {
            return constrain(0, 1, start + ratio * (self.viewportBottom() - anim.el.offsetTop) / namedConfig[0].scrollHeight())
         }
         seekFn[tn + 'compass']      = function (start: number, ratio: number) {
            return constrain(0, 1, start + ratio * (self.viewportTop() - anim.el.offsetTop) / namedConfig[1].scrollHeight())
         }
         seekFn[tn + 'bottomWithin'] = function (start: number, ratio: number) {
            return constrain(0, 1, start + ratio * (self.viewportBottom() - (anim.el.offsetTop + anim.el.offsetHeight)) / namedConfig[2].scrollHeight())
         }
         if (tn) {
            seekFn[tn] = function () {
               return constrain(0, 1, (self.viewportBottom() - anim.el.offsetTop) / anim.el.offsetHeight)
            }
         }
      }
      
      this.Log.l('namedConfig:', namedConfig)
      _.forEach(namedConfig, (rec: { name: string, ratio: number, scrollHeight: () => number }) => {
         rec.ratio = this._getStageRatio(rec.name)
      })
      
      
   }
   setCallback(name:string, fn:Function){
      //$flowNOTE:
      this[name] = fn
   }
   onStateChanged(state: string) { //$flowNOTE:
      this.Log.l(state, this[state])    //$flowNOTE:
      if(this[state]) this[state]()
   }
   
   set debug(value:boolean){
      this.Log.disable = !value
   }
   get debug(){
      return !this.Log.disable
   }
}


class ViewportDetector {
   el: HTMLElement
   flagL: HTMLElement
   flagR: HTMLElement
   _state: string
   _last_state: string
   ignored_states: string[]
   mediator: ViewportMediator
   viewportTop: () => number
   viewportBottom: () => number
   viewportHeight: () => number
   
   
   constructor(el: HTMLElement, viewport: window | HTMLElement[]) {
      this.Log = setLog()
      this.el     = el
      this._state = this._last_state = ''
      switch (viewport.constructor.name) {
         case "Window":    //$flowNOTE: suppress following errors caused by type variance flow cannot catch
            this.viewportTop    = () => viewport.scrollY                         //$flowNOTE: suppress
            this.viewportBottom = () => viewport.scrollY + viewport.innerHeight  //$flowNOTE: suppress
            this.viewportHeight = () => viewport.innerHeight
            break
         case "Array":
            this.flagL = viewport[0]
            this.flagR = viewport[1]
            this.Log.assert(viewport.length === 2)
            let l               = viewport[0]
            let r               = viewport[1]
            this.viewportTop    = () => l.offsetTop + window.scrollY
            this.viewportBottom = () => r.offsetTop + window.scrollY
            this.viewportHeight = () => r.offsetTop - l.offsetTop
            break
         default:
            this.Log.error('Uncaught exception, invalid typed when initializing ViewPortDetector')
            this.Log.error('type:', viewport)
      }
      this._last_state    = this.state
      this.ignored_states = [eSTATE.above, eSTATE.below]
   }
   
   viewportTop() { }
   
   viewportBottom() { }
   
   isTopAbove() { return this.el.offsetTop <= this.viewportTop() }
   
   isBottomAbove() { return this.isAbove() }
   
   isTopBelow() { return this.isBelow() }
   
   isBottomBelow() { return this.el.offsetTop + this.el.offsetHeight >= this.viewportBottom() }
   
   isTopWithin() { return (!this.isTopAbove() && !this.isTopBelow()) }
   
   isBottomWithin() { return (!this.isBottomAbove() && !this.isBottomBelow()) }
   
   isAbove() { return this.el.offsetTop + this.el.offsetHeight <= this.viewportTop() }
   
   isBelow() { return this.el.offsetTop >= this.viewportBottom() }
   
   isWithin() { return (!this.isAbove() && !this.isBelow()) }
   
   restoreState(s: string, progress: number) {
      if (s !== this._last_state) {
         this._onStateChanged(s, this._last_state)
         //TODO: replace with animeHandler $flowNOTE: access of computed proeprty
         if (['topWithin', 'compass', 'bottomWithin'].indexOf(s) !== -1) this.mediator[s]()  //NOTE: call seek(stageName)
      } else {
         if (this.ignored_states.indexOf(s) !== -1) {
            return false
         }
         //TODO: replace with animeHandler $flowNOTE: access of computed proeprty
         if (['topWithin', 'compass', 'bottomWithin'].indexOf(s) !== -1) this.mediator[s]()  //NOTE: call seek(stageName)
      }
      this._last_state = s
      this._state      = s
      return s
   }
   
   //$flowNOTE: Potentially unsafe get/set usage
   get lastState(): string { return this._last_state }
   
   //$flowNOTE: Potentially unsafe get/set usage
   get state(): string {
      if (this.isAbove()) {
         return eSTATE.above
      } else if (this.isBelow()) {
         return eSTATE.below
         // ** from element's top within viewport to element's bottom within viewport
      } else {
         // top above
         if (this.isTopAbove()) {
            // 1) top above + bottom within  2) top above + bottom below
            if (this.isBottomWithin()) return eSTATE.bottomWithin
            return eSTATE.compass
            // top within
         } else {
            // 1) top within + bottom below 2) top within + bottom within
            if (this.isBottomBelow()) return eSTATE.topWithin
            // TODO: computational state for within mode not implemented yet
            //return eSTATE.within
            return eSTATE.compass
         }
      }
   }
   
   _onStateChanged(current_state: string, last_state: string) {
      switch (current_state) {
         // 1) when element's top leaving viewport 2) when element's bottom leaving viewport
         case eSTATE.above:
            switch (last_state) {
               case eSTATE.bottomWithin:
                  this.mediator.onStateChanged('onBottomLeaveL')
                  break
               case eSTATE.within:
                  this.mediator.onStateChanged('onBottomLeaveL')
                  this.mediator.onStateChanged('onTopLeaveL')
                  break
               case eSTATE.topWithin:
                  this.mediator.onStateChanged('onTopLeaveL')
                  break
               case eSTATE.below:
                  this.mediator.onStateChanged('onBottomLeaveL')
                  this.mediator.onStateChanged('onTopLeaveL')
                  break
               case eSTATE.compass:
                  this.mediator.onStateChanged('onBottomLeaveL')
                  break
            }
            break
         case eSTATE.bottomWithin:
            switch (last_state) {
               case eSTATE.above:
                  this.mediator.onStateChanged('onBottomEnterL')
                  break
               case eSTATE.compass:
                  this.mediator.onStateChanged('onBottomEnterR')
                  break
               case eSTATE.within:
                  this.mediator.onStateChanged('onTopLeaveL')
                  break
               case eSTATE.topWithin:
                  this.mediator.onStateChanged('onTopLeaveL')
                  this.mediator.onStateChanged('onBottomEnterR')
                  break
               case eSTATE.below:
                  this.mediator.onStateChanged('onTopLeaveL')
                  this.mediator.onStateChanged('onBottomEnterR')
                  break
            }
            break
         case eSTATE.compass:
            // 1) lastState of within 2) lastState of topWithin 3) lastState of bottomWithin
            switch (last_state) {
               case eSTATE.topWithin:
                  this.mediator.onStateChanged('onTopLeaveL')
                  break
               case eSTATE.bottomWithin:
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
               case eSTATE.within:
                  this.mediator.onStateChanged('onTopLeaveL')
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
               case eSTATE.above:
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
               case eSTATE.below:
                  this.mediator.onStateChanged('onTopLeaveL')
                  break
            }
            break
         case eSTATE.within:
            switch (last_state) {
               case eSTATE.above:
                  this.mediator.onStateChanged('onTopEnterL')
                  this.mediator.onStateChanged('onBottomEnterL')
                  break
               case eSTATE.bottomWithin:
                  this.mediator.onStateChanged('onTopEnterL')
                  break
               case eSTATE.compass:
                  this.mediator.onStateChanged('onTopEnterL')
                  this.mediator.onStateChanged('onBottomEnterR')
                  break
               case eSTATE.topWithin:
                  this.mediator.onStateChanged('onBottomEnterR')
                  break
               case eSTATE.below:
                  this.mediator.onStateChanged('onTopEnterR')
                  this.mediator.onStateChanged('onBottomEnterR')
                  break
            }
            break
         case eSTATE.topWithin:
            switch (last_state) {
               case eSTATE.above:
                  this.mediator.onStateChanged('onTopEnterL')
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
               case eSTATE.bottomWithin:
                  this.mediator.onStateChanged('onTopEnterL')
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
               case eSTATE.compass:
                  this.mediator.onStateChanged('onTopEnterL')
                  break
               case eSTATE.below:
                  this.mediator.onStateChanged('onTopEnterR')
                  break
               case eSTATE.within:
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
            }
            break
         case eSTATE.below:
            switch (last_state) {
               case eSTATE.topWithin:
                  this.mediator.onStateChanged('onTopLeaveR')
                  break
               case eSTATE.within:
                  this.mediator.onStateChanged('onTopLeaveR')
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
               case eSTATE.compass:
                  this.mediator.onStateChanged('onTopLeaveR')
                  break
               case eSTATE.bottomWithin:
                  this.mediator.onStateChanged('onTopLeaveR')
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
               case eSTATE.above:
                  this.mediator.onStateChanged('onTopLeaveR')
                  this.mediator.onStateChanged('onBottomLeaveR')
                  break
            }
            break
      }
   }
   set debug(value: boolean){
      this.Log.disable = !value
   }
   get debug(){
      return !this.Log.disable
   }
}


export{
   eSTATE, ViewportDetector,   ViewportMediator, setLog
}

