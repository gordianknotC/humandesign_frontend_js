// @flow

import {_} from './lodash_addon'
import Platform from "platform"
const platform        = Platform
platform.install({$q:window})

const select          = document.querySelectorAll.bind(document)
const orientible      = window.orientation !== undefined
const is_mobile       = platform.is.desktop !== true && orientible
const PIX_RATIO       = window.devicePixelRatio || 1
const screen          = window.screen
const is_desktop_mode = !is_mobile
const Debounce        = _.debounce,
      Throttle        = _.throttle,
      extend          = _.extend

const hexToDec = (hex: string): number => parseInt(hex, 16)
const decToHex = (dec: number): string => dec.toString(16)

const DEVICES = {
   byName  : {
      iphone5 : [320, 568],
      nexus5  : [360, 640],
      iphone6 : [375, 667],
      nexus6  : [412, 732],
      iphone6p: [414, 736],
      nexus7  : [600, 960],
      ipad    : [768, 1024],
      nexus10 : [800, 1280],
      ipadp   : [1024, 1366]
   },
   byRange : {
      mobile_S: [320],
      mobile_M: [375],
      mobile_L: [425],
      tablet  : [768],
      laptop_S: [1024],
      laptop_L: [1440],
   },
   byWidth : [],
   byHeight: []
}

_.forEach(DEVICES.byName, (value, key) => {
   DEVICES.byWidth.push({name: key, size: value})
})

DEVICES.byWidth  = _.sortBy(DEVICES.byWidth, (o) => {
   return o.size[0]
})
DEVICES.byHeight = _.sortBy(DEVICES.byWidth, (o) => {
   return o.size[1]
})


function printPlatformInfo() {
   console.group('=========PLATFORM INFO==============')
   console.log(JSON.stringify(platform.is))
   console.log(JSON.stringify(platform.has))
   console.log(JSON.stringify(platform.within))
   console.groupEnd()
}

// DEV: We don't use var but favor parameters since these play nicer with minification
function computedStyle(el: HTMLElement, prop: string) {
   //$flowNOTE: el.currentStyle
   let style = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle
   if (style) {
      return style
         [
         prop.replace(/-(\w)/gi, function (word, letter) {
            return letter.toUpperCase()
         })
         ]
   }
}


function safePixel(num: number): string {
   if (is_desktop_mode) return num + 'px'
   // if (is_mobile && !isPortrait() ) return num + 'px'
   return num / PIX_RATIO + 'px'
}

const innerHeight = (): number => {
   //$flowNOTE: document.documentElement.clienthHeight
   if (!is_mobile) return window.innerHeight ? window.innerHeight : document.documentElement.clientHeight
   return screen.height * PIX_RATIO
}
const innerWidth  = (): number => {
   //$flowNOTE: document.documentElement.clienthHeight
   if (!is_mobile) return window.innerWidth ? window.innerWidth : document.documentElement.clientWidth
   return screen.width * PIX_RATIO
}
const isPortrait  = (): boolean => {
   return innerHeight() > innerWidth()
}


function isUnion(a/*:any[]*/, b/*:any[]*/): boolean {
   let l = _.union(a, b).length
   return l >= a.length && l <= a.length + b.length - 1
   
   // return _.union(a, b).length > a.length + b.length -1
}


function parseUnit(str: string) {
   str     = String(str)
   let num = parseFloat(str) //$flowNOTE:
   return [num, str.match(/[\d.\-\+]*\s*(.*)/)[1] || '']
}


type Path = (rec: Object[]) => Object
type WCon = (con: Object) => boolean
function walkAndDo(rec: Object[], path: Path, walk_condition: WCon, action: (e: Object) => void) {
   _.forEach(path(rec), (e) => {
      action(e)
      if (walk_condition(path(rec))) walkAndDo(e, path, walk_condition, action)
   })
}

_.head
function findIndexWhen<T>(array: Array<T>, value: T, condition: (T, T, T) => boolean) {
   let value_ = null
   let last   = _.last(array)
   for (let i = 0; i < array.length; i++) {
      value_ = array[i]
      if (condition(value, value_, last)) return array[i]
   }
}

function styleAttrToObj(target: string | HTMLElement): Object {
   if (!target) return {}
   let regex = /(&quot;|&amp;|&lt;|&gt;|&nbsp;)/g
   let style = {}
   
   
   target = typeof(target) === 'string'
      ? _.trim(target.replace(regex, ""), '; ')
      //$flowNOTE:  call of method `replace`;Method cannot be called on possibly null value null
      : _.trim(target.getAttribute('style').replace(regex, ""), "; ")
   
   _.forEach(target.split(/;[ ]?/), (e) => {
      let pair              = _.lsplit(e, ":")
      style[pair[0].trim()] = pair[1].trim()
   })
   return style
}

function setStyles(element: HTMLElement, style: Object) {
   _.forEach(style, (value, key) => {
      element.style[key] = value
   })
}

function setProperties(obj, style: Object) {
   _.forEach(style, (value, key) => {
      obj[key] = value
   })
}

const NbName = {}
function numberedName(name: string) {
   if (NbName[name] === undefined) NbName[name] = 0
   NbName[name]++
   return `name_${NbName[name]}`
}


class ErrorMsg extends Error {
   constructor(message: string) {
      super(message)
      this.name = this.constructor.name
      if (typeof Error.captureStackTrace === 'function') {
         Error.captureStackTrace(this, this.constructor)
      } else {
         this.stack = (new Error(message)).stack
      }
   }
}


const IS = {
   string  : (e: any): boolean => typeof(e) === 'string',
   array   : (e: any): boolean => Array.isArray(e),
   number  : (e: any): boolean => typeof(e) === 'number',
   function: (e: any): boolean => typeof(e) === 'function',
   object  : (e: any): boolean => typeof(e) === 'object'
}

//var observeDOM = (function(){
//   var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
//       eventListenerSupported = window.addEventListener
//
//   return function(obj, callback){
//      if( MutationObserver ){
//         // define a new observer
//         var obs = new MutationObserver(function(mutations, observer){
//            if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
//               callback()
//         })
//         // have the observer observe foo for changes in children
//         obs.observe( obj, { childList:true, subtree:true })
//      }
//      else if( eventListenerSupported ){
//         obj.addEventListener('DOMNodeInserted', callback, false)
//         obj.addEventListener('DOMNodeRemoved', callback, false)
//      }
//   }
//})()


//FIXME BUG: 如果CSS裡面有data-image的字串，會發生讀不到的問題
//TODO: need further test
var allClassRules
const getCssClasses  = (function () {
   function containsAny(selText: string, ors: RegExp[]): boolean {
      return selText ? ors.some((x: RegExp) => selText.match(x)) : false
   }
   
   return function (selector: string, cached: boolean = true) {
      if ((allClassRules === undefined && cached === true) || cached === false) {
         console.log('!!!RESET Css CACHE!!!')
         const sheets     = Array.from(document.styleSheets)
         const ruleArrays = sheets.map((x) => Array.from(x.rules || x.cssRules || []))
         allClassRules    = ruleArrays.reduce((all, x) => all.concat(x), [])
      }
      if (!selector) return
      //const logicalORs = split(normalize(selector), ',')
      const logicalORs = selector.split(',').map(x => new RegExp(x.trim() + '[ ]+'))
      let ret          = []
      allClassRules.forEach((x) => {
         if (x.selectorText && containsAny(` ${x.selectorText} `, logicalORs)) return ret.push(x)
         if (x.constructor.name === 'CSSMediaRule') {
            if (window.matchMedia(x.media.mediaText).matches) {
               for (let rule of x.cssRules) {
                  if (containsAny(` ${rule.selectorText} `, logicalORs)) {
                     //ret = [rule].concat(ret) //NOTE: brings priority to the first
                     return ret.push(rule)
                  }
               }
            }
         }
      })
      return ret
   }
})()
window.getCssClasses = getCssClasses
function convertRemToPixels(rem) {
   return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
function getClassRule(selector: string, cached: boolean = true) {
   let cssRules = getCssClasses(selector, cached)
   let rule     = {}
   let parse    = (_rule: string): Object => {
      let ret = {}
      for (let text of _rule.split(';')) {
         if (text) {
            //let temp            = text.split(':')
            //ret[temp[0].trim()] = temp[1].trim()
            text            = text.trim()
            let key         = text.slice(0, text.indexOf(':'))
            ret[key.trim()] = text.slice(key.length + 1).trim()
         }
      }
      return ret
   }
   // TODO: merge or extend style together rather than this buggy tricky way
   
   //return parse(cssRules[0].cssText.split('{')[1].split('}')[0].trim())
   let possible_rules = []
   for (let cssrule of cssRules) {
      let _selectors = cssrule.selectorText.split(',')
      for (let _selector of _selectors){
         if ((_selector.indexOf(selector) + selector.length) === _selector.length) {
            _.extend( rule, parse(cssrule.cssText.split('{')[1].split('}')[0].trim()) )
            break
         }
      }
   }
   //console.log('getClassRule:', selector, rule)
   return _.isEmpty(rule) ? parse( cssRules[0].cssText.split('{')[1].split('}')[0].trim() ) : rule
}
window.getClassRule = getClassRule

const SET_CURRENT_PAGEVIEW = window.SET_CURRENT_PAGEVIEW ? window.SET_CURRENT_PAGEVIEW : function(path=window.location.hash){
   window.ga('set', 'page', path)
   window.ga('send', 'pageview')
}



class Property {
   constructor(dict: {string:any}, fn:Function , data:{string: any}) {
      for (let key of _.keys(dict)) {
         Object.defineProperty(dict, key, {
            get: () => { return data[key]},
            set: (v) => {
               data[key] = v
               fn(key, v)
            }
         })
      }
   }
}


function getLatLon(cb){
   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
         var latitude = position.coords.latitude
         var longitude = position.coords.longitude
         cb(position)
      })
   }
}

function ensure<T>(target:T, cb:(x:T)=>boolean):T{
   console.assert(cb(target) )
   return target
}



// TODO: error notifier decorator/wrapper




function test() {
   let st = "background-image: url(&quot;http://static.hasselblad.com/2017/03/H61C-B00007042.jpg&quot;); height: 1046px; background-position: center -13px;"
   console.log(styleAttrToObj(st))
}
if (/console_addon.js/.test(process.argv[1])) {
   test()
}

export {
   isUnion, isPortrait, styleAttrToObj, IS, parseUnit,setProperties,
   innerHeight, innerWidth, safePixel, printPlatformInfo, platform,
   select, orientible, is_mobile, PIX_RATIO, is_desktop_mode, Debounce,
   Throttle, extend, DEVICES, walkAndDo, findIndexWhen, computedStyle,convertRemToPixels,
   hexToDec, decToHex, setStyles, numberedName, ErrorMsg, getClassRule, getCssClasses, Property,
   SET_CURRENT_PAGEVIEW, ensure
}
