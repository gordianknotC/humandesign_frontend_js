import faker from 'faker'
import puppeteer from 'puppeteer'
import _ from 'lodash'
//import {cachedQuery, LocalDataBase} from '../../src/storage'
const HOME    = "http://localhost:8080/#/demo/test"
const TIMEOUT = 16000


let page, browser, EV


beforeAll(async () => {
   if (!browser) {
      browser = await puppeteer.launch({
         headless: true
      })
   } else {
      page.close()
   }
   page = await browser.newPage()
   await page.goto(HOME)
   page.on('console', (msg) => {
      console.log(...msg.args().map(x => String(x)))
   })
   EV = page.evaluate.bind(page)
})

afterAll(() => {
   browser.close()
})


describe('test localstorage r/w without compression', () => {
   test('localStorage read and write', async () => {
      let v = await page.evaluate(() => {
         localStorage.setItem('vlue', 'weoifj')
         return localStorage.getItem('vlue')
      })
      expect(v).toEqual('weoifj')
   }, TIMEOUT)
   
   test('passing value into page', async () => {
      let t = 13
      let v = await EV((a) => {
         return a
      }, t)
      expect(t).toEqual(13)
   }, TIMEOUT)
   
   test('LocalDataBase read and write', async () => {
      let value = await EV(() => {
         let db      = new window.LocalDataBase('hello', false)
         db['world'] = 13
         return db['world']
      })
      expect(value).toEqual(13)
   }, TIMEOUT)
   
   test('LocalDataBase show keys and values', async () => {
      let value = await EV(() => {
         let DB = window.DB = new window.LocalDataBase("Hello", false)
         let localStorage = window.localStorage
         DB['elton']      = 'John'
         DB['John']       = 'Elton'
         return {keys: DB.keys(), values: DB.values(), real_key: window._.keys(localStorage)}
      })
      expect(value.keys).toEqual(['John', 'elton'])
      expect(value.values.length).toEqual(2)
      expect(value.real_key).toContain('Hello-elton')
      expect(value.real_key).toContain('Hello-John')
   })
   
   test('LocalDataBase test has/in opperator', async () => {
      let value = await EV(() => {
         let DB = window.DB = new window.LocalDataBase("Hello", false)
         let localStorage = window.localStorage
         DB['elton']      = 'John'
         DB['John']       = 'Elton'
         return {TrueA: 'elton' in DB, TrueB: 'John' in DB, FalseA: 'Hello-elton' in DB}
      })
      expect(value.TrueA).toBeTruthy()
      expect(value.TrueB).toBeTruthy()
      expect(value.FalseA).toBeFalsy()
      
   }, TIMEOUT)
})

describe('tes cachequery functionalities', () => {
   test('cache random number generator then call it twice to see if its the same', async () => {
      let value = await EV(() => {
         function randomNumber() {
            return {value: Math.random()}
         }
         
         let r      = cacheQuery(randomNumber, false)
         let value1 = r(123)
         let value2 = r(123)
         return {v1: value1, v2: value2}
      })
      expect(value.v1).toEqual(value.v2)
   })
   
  
   
})