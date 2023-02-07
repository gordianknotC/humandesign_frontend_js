const _ = require('lodash')

type TSchedule = { identity: string, args: any[] }

if (!_.CONST) {_.CONST = {}} else {console.error('CONST already defined')}

_.sliceArray  = _.slice
_.sliceString = function (str: string, start?: number, end?: number): string {
   return str.substring(start, end > 0 ? end : str.length + end)
}

//<T>(array: ?Array<T>|string, start?: number, end?: number): Array<T> | string;
_.slice             = function <T>(array: ?Array<T> | string, start?: number, end?: number): Array<T> | string {
   if (!Array.isArray(array)) return _.sliceString(array, start, end)
   return _.sliceArray(array, start, end)
}
_.trimLeft          = _.trimStart
_.trimRight         = _.trimEnd
_.CONST.scheduleKey = Symbol('scheduleKey')
_.CONST.scheduleIDs = {}
_.scheduleOnce      = function (fn: Function, wait: number, options: TSchedule = {identity: '', args: []}) {
   let args = options.args ? options.args : []
   if (!options.identity) {
      if (fn[_.CONST.scheduleKey]) {
         fn[_.CONST.scheduleKey].cancel()
      }
      fn[_.CONST.scheduleKey] = _.debounce(fn, wait)
      fn[_.CONST.scheduleKey](...args)
   } else {
      let identity = options.identity
      if (_.CONST.scheduleIDs[identity]) _.CONST.scheduleIDs[identity].cancel()
      _.CONST.scheduleIDs[identity] = _.debounce(fn, wait)
      _.CONST.scheduleIDs[identity](...args)
   }
}

_.lsplit = function (word: string, spliter: string) {
   let index  = word.indexOf(spliter)
   let length = word.length
   if (index === -1) return [word]
   return [word.substr(0, index), word.substr(index + spliter.length, length)]
   
}

_.nestedFilter = function <T>(data: Array<T>, nestCondition: Function, condition: Function): Array<T> {
   let ext = []
   let ret = _.filter(data, (e: T) => {
      if (nestCondition(e)) {
         ext = ext.concat(_.nestedFilter(e, nestCondition, condition))
      } else {
         return condition(e)
      }
   })
   return ret.concat(ext)
}

_.pickObjectBy = _.pickBy

_.pickArrayBy = function <T>(data: Array<T>, condition: (e: T) => boolean): ?T {
   let i = 0, l = data.length
   for (i; i < l; i++) {
      if (condition(data[i])) return data[i]
   }
}
//pickBy<A, T: {[id: string]: A}>(object?: ?T, predicate?: OPredicate<A, T>): Object;
_.pickBy      = function <A, T:{ [id: string]: A }>(data: T | Array<A>, condition: (A) => boolean) {
   if (Array.isArray(data)) {return _.pickArrayBy(data, condition)}
   else { return _.pickObjectBy(data, condition)}
   
}


_.loop = function <T>(data: Array<T>, fn: (e: T, order?: number, len ? : number ) => boolean ): ?T {
   let i = 0, l = data.length, ret
   for (i;i < l;i++)
   {
      ret = fn(data[i], i, l)
      if (ret !== undefined) return ret
   }
}

function testDebounce(n) {
   console.log('test splice')
   console.assert(_.slice('#hello', 0, 1) === '#', '  test customized slice')
   console.assert(_.trimRight('21px', 'px') === '21', '  test trimRight')
   var counter = 0
   
   function a1(a, b, c) {
      counter++
      console.log('  a1:', a, b, c, 'counter:', c)
      console.assert(c === 1, '   should only called once')
   }
   
   function a2(a, b, c) {
      counter++
      console.log('  a2:', a, b, c, 'counter:', c)
      console.assert(c === 2, '   should only called once')
   }
   
   console.log('test scheduleOnce', n)
   _.scheduleOnce(a1, 1000, {args: [`test${n}`, 2, 3]})
   _.scheduleOnce(a1, 1000, {args: [`test${n}`, 12, 1]})
   _.scheduleOnce(a2, 1000, {args: [`test${n}`, 'b', 'c']})
   _.scheduleOnce(a2, 1000, {args: [`test${n}`, 'B', 2]})
   
   _.scheduleOnce(a1, 1000, {identity: 'a', args: ['identity', 2, 3]})
   _.scheduleOnce(a1, 1000, {identity: 'a', args: ['identity', 12, 3333]})
   _.scheduleOnce(a2, 1000, {identity: 'a', args: ['identity', 'b', 'c']})
   _.scheduleOnce(a2, 1000, {identity: 'a', args: ['identity', 'B', 2]})
}

_.route = function (obj: Object, property: string | string[], index: number = 0): Object {
   let sep: string[] = typeof(property) === 'string' ? property.split('.') : property
   let len           = sep.length
   index             = index > 0 ? index : len + index
   let get           = function (obj:Object, i:number = -1) {
      i++
      if (i >= index) return obj
      return get(obj[sep[i]], i)
   }
   return get(obj)
}


if (/lodash_addon.js/.test(process.argv[1])) {
   //testDebounce(1)
   //testDebounce(2)
}


export {
   _
}