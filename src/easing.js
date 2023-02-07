// @flow
import {TConsole, eCOLORS} from './console_addon'
const Log   = new TConsole('animation.js', eCOLORS.info)
Log.disable = true


//NOTE: ---------------------------------------------------
//NOTE:             Type Defs and Consts                  |
//NOTE:----------------------------------------------------
//$flowNOTE:
type TCallableObj = {
   (): Function
} & { [string]: any }


let easingMAP: TCallableObj = {
   'linear'    : linear,
   'quadIn'    : quadIn,
   'quadOut'   : quadOut,
   'quadInOut' : quadInOut,
   'cubicOut'  : cubicOut,
   'cubicIn'   : cubicIn,
   'cubicInOut': cubicInOut
}

function Callable<T:{ [string]: any }>(obj: T, fn: Function): { (): Function } & T {
   function self(...args: any[]) {
      return fn(self, ...args)
   }
   
   self.__proto__ = Callable.prototype
   self.__keys__  = []
   for (let name in obj) {
      self[name] = obj[name]
      self.__keys__.push(name)
   } //$flowNOTE:
   return self
}

easingMAP = Callable(easingMAP, function (self: { (): Function } & typeof easingMAP, name: string | Function): ?Function {
   if (typeof name === 'function') return name
   for (let key of self.__keys__) {
      if (key.toLowerCase().indexOf(name.toLowerCase()) !== -1) return self[key]
   }
   Log.error('invlid easing keyword:', name)
})



export function linear(t: number) {
   return +t
}

export function quadIn(t: number) {
   return t * t
}

export function quadOut(t: number) {
   return t * (2 - t)
}

export function quadInOut(t: number) {
   return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
}

export function cubicOut(t: number) {
   return --t * t * t + 1
}

export function cubicIn(t: number) {
   return t * t * t
}

export function cubicInOut(t: number) {
   return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
}


export{
   Log, easingMAP
}
