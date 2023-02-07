//import {AnimeObject} from "../../src/paperjsUtils"
import puppeteer from 'puppeteer'
import {ZODIAC, RawHoroscope} from '../../src/humandesign'
const HOME    = "http://localhost:8080/#/demo/paperjs"
const TIMEOUT = 16000
let page, browser, EV, pageData

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
   EV       = page.evaluate.bind(page)
   pageData = await EV(fetchDataFromInsidePage)
})
afterAll(() => {
   browser.close()
})


function route(obj: Object, sep: string[], i?: number = -1): any {
   i++
   if (!sep[i]) return obj
   return route(obj[sep[i]], sep, i)
}

function fetchDataFromInsidePage() {
   let a = window.animeA,
       b = window.animeB,
       c = window.animeC
   return {
      animeA_to      : a.to,
      animeB_to      : b.to,
      animeC_to      : c.to,
      animeA_relTo   : a.relTo,
      animeB_relTo   : b.relTo,
      animeC_relTo   : c.relTo,
      animeA_parsedto: a.parsed_destinations,
      animeB_parsedto: b.parsed_destinations,
      animeC_parsedto: c.parsed_destinations,
      animeA_preFrom : a.preprocessed_from,
      animeB_preFrom : b.preprocessed_from,
      animeC_preFrom : c.preprocessed_from,
      handyTestPass  : a.helper.isHandyProp("position") && a.helper.isHandyProp("scaling"),
      pseudoTestPass : a.helper.isPseudo("skewTo") && a.helper.isPseudo("matrixTo") && a.helper.isPseudo("shearTo"),
      animeA_getters : a.params.getters.position.name,
      animeB_getters : b.params.getters['position.x'].name,
      animeC_getters : c.params.getters['matrix.skewTo'].name
   }
}


describe('test unilities in paperjsUtils', () => {
   let data = {a: {b: {c: {d: 1, f: 2, g: 3}}}}
   
   test('route object property path to value', function () {
      let testA = route(data, ['a', 'b', 'c'])
      let testB = route(data, ['a', 'b', 'c', 'd'])
      let testC = route(data, [])
      expect(testA).toEqual({d: 1, f: 2, g: 3})
      expect(testB).toEqual(1)
      expect(testC).toEqual(data)
   })
   
})

describe('validate origins and destinations in paperjsUtils', async () => {
   
   test('destinations(to) type validation', async () => {
      expect(pageData.animeA_to).toEqual([['position', [400, 400]]])
      expect(pageData.animeB_to).toEqual([['position.x', 400], ['position.y', 430]])
      expect(pageData.animeC_to).toEqual([['matrix.skewTo', [-13, 0]]])
      
      expect(pageData.animeA_relTo[0][1]).toEqual([720, 700])
      expect(pageData.animeB_relTo[0][1]).toEqual(720)
      expect(pageData.animeB_relTo[1][1]).toEqual(730)
      expect(pageData.animeC_relTo[0][1]).toEqual([-13, 0])
   }, TIMEOUT)
   
   test('parsed_destination(to) type validation', async () => {
      expect(pageData.animeA_parsedto).toEqual([[[], "position", [400, 400]]])
      expect(pageData.animeB_parsedto).toEqual([[["position"], "x", 400], [["position"], "y", 430]])
      expect(pageData.animeC_parsedto).toEqual([[["matrix"], "skewTo", [-13, 0]]])
   }, TIMEOUT)
   
   test('origin position(from) type validation', async () => {
      expect(pageData.animeA_preFrom).toEqual([["position", [320, 300]]])
      expect(pageData.animeB_preFrom).toEqual([["position.x", 320], ["position.y", 300]])
      expect(pageData.animeC_preFrom).toEqual([["matrix.skewTo", [0, 0]]])
   }, TIMEOUT)
   
   test('setter and getter type validation', async () => {
      expect(pageData.animeA_getters).toBe('_handy_getter')
      expect(pageData.animeB_getters).toBe('_default_getter')
      expect(pageData.animeC_getters).toBe('_pseudo_getter')
   }, TIMEOUT)
   
   test('handyprop setter and getter type validation', async () => {
   }, TIMEOUT)
   
   test('pseudo prop setter and getter type validation', async () => {
   }, TIMEOUT)
})


describe("test mapping astro data into horoscope", () => {
   let data   = {
      "message": "ok",
      "query"  : "{\"year\":1985,\"month\":12,\"day\":30, \"time\":3:21, \"city\":Taipei,Taiwan}",
      "astro"  : "{\"personality\": {\"Sun\": \"Capricon- 8.039129769323381- 2\", \"Moon\": \"Lion- 6.6700524862288404- 40\", \"Mercury\": \"Sagitarius- 19.760518846333525- 46\", \"Venus\": \"Capricon- 3.0524965881576236- 3\", \"Mars\": \"Scorpio- 9.2348663187557065- 14\", \"Jupiter\": \"Aquarius- 17.796752392315227- 48\", \"Saturn\": \"Sagitarius- 4.9363372403767301- 56\", \"Uranus\": \"Sagitarius- 19.380292847761609- 23\", \"Neptune\": \"Capricon- 3.5121767761776823- 31\", \"Pluto\": \"Scorpio- 6.8666800302293609- 52\", \"Chiron\": \"Gemini- 9.9494391047260962- 57\", \"Vesta\": \"Capricon- 16.100721715826239- 6\", \"Pallas\": \"Cancer- 3.2151397607354966- 13\", \"Juno\": \"Scorpio- 27.862925397526794- 52\", \"Ceres\": \"Virgo- 16.216724466713799- 13\", \"North\": \"Torus- 8.0512021817927533- 3\", \"South\": \"Scorpio- 6.6946287059834049- 42\", \"sunrise\": \"time:1985-12-30 06:38:06.002447, sign:Scorpio- 23.934652157383084- 56, daylong:636, nightlong:804\", \"sunset\": \"time:1985-12-30 17:14:13.236176, sign:Torus- 23.934652157383084- 56, daylong:636, nightlong:804\", \"Observer\": \"date:1985-12-30 03:21:00.000001, lon:121:33:55.5, lat:25:01:58.7\"}, \"design\": {\"Sun\": \"Libra- 10.050622843101507- 3\", \"Moon\": \"Torus- 27.10532155817674- 6\", \"Mercury\": \"Libra- 17.988807867466079- 59\", \"Venus\": \"Virgo- 13.697488351166442- 42\", \"Mars\": \"Virgo- 14.715937750940071- 43\", \"Jupiter\": \"Aquarius- 7.1220430203181309- 7\", \"Saturn\": \"Scorpio- 25.083483652432506- 5\", \"Uranus\": \"Sagitarius- 14.686212964191128- 41\", \"Neptune\": \"Capricon- 0.97183488342517421- 58\", \"Pluto\": \"Scorpio- 3.7067408412202383- 42\", \"Chiron\": \"Gemini- 14.007821281782554- 0\", \"Vesta\": \"Sagitarius- 0.66526015111418246- 40\", \"Pallas\": \"Cancer- 3.1724466721147024- 10\", \"Juno\": \"Libra- 28.501809481366479- 30\", \"Ceres\": \"Lion- 20.51757012010728- 31\", \"North\": \"Torus- 9.3573771865997273- 21\", \"South\": \"Scorpio- 9.2107035034234457- 13\", \"sunrise\": \"time:1985-10-04 05:46:49.527042, sign:Pices- 11.369304161782793- 22, daylong:-728, nightlong:2168\", \"sunset\": \"time:1985-10-03 17:38:57.988239, sign:Virgo- 11.369304161782821- 22, daylong:-728, nightlong:2168\", \"Observer\": \"date:1985-10-03 15:42:17.824773, lon:121:33:55.5, lat:25:01:58.7\"}}"
   }
   let astro  = JSON.parse(data.astro)
   let pastro = astro.personality
   let dastro = astro.design
   function processAstro(sub_astro) {
      let ret      = {}
      let procSign = (sign) => sign.split('-').map((x) => x.trim())
      for (let key in sub_astro) {
         
         if (['sunrise', 'sunset'].indexOf(key) === -1) {
            let sec        = procSign(sub_astro[key])
            let sign       = sec[0]
            let degree     = sec[1]
            let minutes    = sec[2]
            let real_deg   = (ZODIAC.indexOf(sign) - 5) * 30 + parseFloat(degree)
            sub_astro[key] = {real_degree: real_deg, sign: sign, degree: degree}
         } else {
            let sec     = sub_astro[key].split(',').map((x) => x.trim())
            let time    = sec[0].split('time:')[1]
            let sign    = procSign(sec[1].split('sign:')[1])
            let degree  = sign[1]
            let minutes = sign[2]
            sign        = sign[0]
            
            let daylong    = sec[2].split('daylong:')[1]
            let nightlong  = sec[3].split('nightlong:')[1]
            let real_deg   = (ZODIAC.indexOf(sign) - 5) * 30 + parseFloat(degree)
            sub_astro[key] = {
               time       : time,
               sign       : sign,
               degree     : degree,
               daylong    : daylong,
               nightlong  : nightlong,
               real_degree: real_deg
            }
         }
      }
   }
   
   
   test('parsing astro data', () => {
      processAstro(pastro)
      processAstro(dastro)
      expect(pastro.Sun.sign).toBe('Capricon')
      expect(pastro.Sun.degree).toBe('8.039129769323381')
      expect(pastro.Sun.real_degree).toBe(8.039129769323381 + (9 - 5) * 30)
      
      expect(pastro.sunrise.sign).toBe('Scorpio')
      expect(pastro.sunrise.degree).toBe('23.934652157383084')
      expect(pastro.sunrise.real_degree).toBe( 23.934652157383084 + (7 - 5) * 30)
   })
   
})




