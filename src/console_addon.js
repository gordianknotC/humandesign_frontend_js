// @flow

import {_} from './lodash_addon.js'

type TLevel = 'warn' | 'watch' | 'debug' | 'info' | 'log' | 'current' | 'important'


const STYLES = {}
const eCOLORS: { [TLevel]: string } = {
   watch    : '#f850ff',
   warn     : '#ff4b00',
   debug    : '#01cc97',
   info     : '#00d2ee',
   log      : '#ccc',
   current  : '#c6ff00',
   important: '#f19100'
}
const _LEVELS = _.map(eCOLORS, (v,k)=>v)
const TConsole_instances:{[string]: TConsole} = {}
const fn_ptn             = /at ([/a-zA-Z0-9.@#$-_:]+)|(([a-zA-Z0-9_.$:]+)(<anonymous>)?)/
const file_ptn           = /([(][/a-zA-Z0-9.@#$-_:]+[)])/

var allowedLevels = _LEVELS
var suppressedComponents = []
class TConsole {
   fn_mapper: ?[RegExp, string]
   fn_ptn: RegExp
   file_ptn: RegExp
   filter: string[]
   stack: string
   fontColor: string
   _disable: boolean
   l: Function
   i: Function
   __name__: string
   error: typeof console.error
   warn: typeof console.warn
   assert: typeof console.assert
   __defineGetter__: Function
   
   constructor(pth: string, color: string = eCOLORS.info, fnMapper?: [RegExp, string]) {
      if (_.has(TConsole_instances, pth)) {
         TConsole_instances[pth].warn('TConsole instance under namespace:', pth, 'already used, choose' +
            ' another one')
         return TConsole_instances[pth]
      }
      TConsole_instances[pth] = this
      this.fn_mapper = fnMapper
      this.__name__  = pth
      this.fn_ptn    = fn_ptn
      this.file_ptn  = file_ptn
      this.filter    = []
      this._disable  = false
      this.stack     = ''
      this.fontColor = color
      this.error     = console.error.bind(console)
      this.warn      = console.warn.bind(console)
      this.assert    = console.assert.bind(console)
      let self       = this
      
      function wrapper(cmd:string) {
         function real_wrapper() {
            //$flowNOTE: index sting enum
            if (allowedLevels.indexOf(this.fontColor) === -1 || this._disable || suppressedComponents.indexOf(pth)!==-1 ) return () => {}
            self.genStack()
            let fontColor = this.fontColor
            let path   = self.path()
            let caller = path.fn // +'.'+path.fn.na
            function fn(...args: any[]) {
               //NOTE:filter
               if (self.filter.length > 0) {
                  let msg  = caller + ' ' + args.join(' ')
                  let pass = false
                  for (let f of self.filter) {
                     if (msg.indexOf(f) !== -1) {
                        pass = true
                        break
                     }
                  }
                  if (!pass) return
               }
               if (cmd === 'msg') {
                  console.log(...args)
                  return
               }
               //NOTE:level //$flowNOTE:
               console[cmd](`%c[${caller}]`, `color: ${fontColor}`, ...args, path.link)
            }
            
            return fn
         }
         
         return real_wrapper
      }
      
      for (let rec of ['log', 'info']) {
         this.__defineGetter__(rec.substr(0, 1), wrapper(rec))
      }
      this.__defineGetter__('msg', wrapper('msg'))
   }
   
   get disable():boolean {
      return this._disable
   }
   
   set disable(v:boolean){
      console.warn('[TConsole] disable :', v, this.__name__)
      this._disable = v
   }
   
   setFilter(f: string[]) {
      console.warn('[TConsole] setFilter :', f, this.__name__)
      this.filter = f
   }
   
   setLevel(l: string[]) {
      console.warn('[TConsole] setLevel :', l, this.__name__)
      allowedLevels = l
   }
   
   suppressLevel(l: string[]){
      console.warn('[TConsole] suppressLevel :', l, this.__name__)
      allowedLevels = _.difference(_LEVELS, l)
   }
   
   addSuppressedComponents(comps: string[]){
      suppressedComponents = suppressedComponents.concat(comps)
   }
   
   setFontColor(name: TLevel) {
      this.fontColor = eCOLORS[name]
   }
   
   genStack() {
      let err    = new Error()
      this.stack = err.stack
   }
   
   path(order: number = 2): { [string]: string } {
      let stack      = this.stack.split('\n').slice(1)
      //console.log('stack:', stack)
      let fn_matches = stack[order].match(this.fn_ptn)
      //console.log('matches:', fn_matches)
      let fl_matches = stack[order].match(this.file_ptn)
      //console.log('fl_matches', fl_matches)
      if (fn_matches === null || fn_matches === undefined) {
         console.error('Uncaught exception in TConsole,stack:', stack)
         fn_matches = ['at anonymous']
      } else { /*do nothing*/}
      
      if (fl_matches === null || fl_matches === undefined) {
         fl_matches = fn_matches[0].split('at ')[1]
      } else {/*do nothing*/}
      
      let fn   = fn_matches[0].split('at ')[1]
      let file = fl_matches[0].slice(1, -1)
      if (this.fn_mapper) fn = fn.replace(...this.fn_mapper)
      
      let link = file
      let tmp  = file.split(':')
      let col  = tmp.slice(-1)[0]
      let line = tmp.slice(-2)[0]
      file     = file.split(/:[0-9]+:[0-9]+/)[0]
      let wpk  = `webpack:///${file}?2c6e:${line}`
      return {wpk: wpk, fn: fn, file: file, line: line, col: col, link: link}
   }
   
   static getLogger(name:string): TConsole{
      return TConsole_instances[name]
   }
}


function testTConsole() {
   let stack = ["    at TConsole.genStack (http://localhost:8080/js/app.js:10842:20)",
                "    at TConsole.real_wrapper [as l] (http://localhost:8080/js/app.js:10762:18)",
                "    at http://localhost:8080/js/app.js:12500:22",
                "    at http://localhost:8080/js/app.js:10550:7",
                "    at arrayEach (http://localhost:8080/js/app.js:15516:11)",
                "    at Function.forEach (http://localhost:8080/js/app.js:24338:14)",
                "    at walkAndDo (http://localhost:8080/js/app.js:10549:20)",
                "    at Object.testAllComponentsLoaded (http://localhost:8080/js/app.js:12489:34)",
                "    at invokeFunc (http://localhost:8080/js/app.js:25329:23)",
                "    at trailingEdge (http://localhost:8080/js/app.js:25376:18)"]
   
   for (let s of stack) {
      let fn_matches = s.match(fn_ptn)
      let fl_matches = s.match(file_ptn)
      if (fn_matches === null || fl_matches === null) console.log(s, fl_matches)
   }
   
}
if (/console_addon.js/.test(process.argv[1])) {
   testTConsole()
}

export{
   TConsole, eCOLORS, TConsole_instances
}


