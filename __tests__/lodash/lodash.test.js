import {_} from '../../src/lodash_addon'


//======================================================
//Log.enable_log = false


describe('test nestedFilter', () => {
   const data = ['name1', 'hello', ['nestednameA', 'fello', ['nestednestedname1', 'bello'], 'nestednameB']]
   test('filter content of nested array', () => {
      let ret  = _.nestedFilter(data, e => Array.isArray(e), ee => {
         return ee.indexOf('name') !== -1
      })
      let ret2 = _.nestedFilter(data, e => Array.isArray(e), ee => {
         return /nestedname[A-Z]/.test(ee)
      })
      expect(ret).toEqual(['name1', 'nestednameA', 'nestednameB', 'nestednestedname1'])
      expect(ret2).toEqual(['nestednameA', 'nestednameB'])
   })
})


describe('test lsplit', () => {
   test('lsplit background: http://abc/123.jpg with spliter ":"', () => {
      expect(_.lsplit("background: http://abc/123.jpg", ':')).toEqual(["background", " http://abc/123.jpg"])
   })
})


describe('test slice array and string', () => {
   test('slice string "#hello" from pos 0 to 1', () => {
      expect(_.slice('#hello', 0, 1)).toBe('#')
   })
   
   test('slice array [1,2,3,4] from pos 0 to 1', () => {
      expect(_.slice([1, 2, 3, 4], 0, 1)).toEqual([1])
   })
})


describe('test getBy Array and Object', () => {
   var counter = 0
   
   test('pickBy object', () => {
      expect(_.pickBy({'a': 1, 'b': '2', 'c': 3}, _.isNumber)).toEqual({'a': 1, 'c': 3})
   })
   
   test('pickBy array', () => {
      expect(_.pickBy([{name: 'elton'}, {name: 'peter'}], (e) => e.name === 'elton')).toEqual({name: 'elton'})
   })
   
})