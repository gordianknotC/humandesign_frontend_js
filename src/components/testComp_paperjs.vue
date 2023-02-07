/* @flow
<template>
   <section class="testComp_paperjs">
      <h3> hello </h3>
      <canvas id="canvas_testA"></canvas>
      <section class="planetsign_resources">
         <section id="SUN_SVG" v-html="SUN_SVG"></section>
         <section id="MOON_SVG" v-html="MOON_SVG"></section>
         <section id="MERCURY_SVG" v-html="MERCURY_SVG"></section>
         <section id="VENUS_SVG" v-html="VENUS_SVG"></section>
         <section id="MARS_SVG" v-html="MARS_SVG"></section>
         <section id="JUPITER_SVG" v-html="JUPITER_SVG"></section>
         <section id="SATURN_SVG" v-html="SATURN_SVG"></section>
         <section id="URANUS_SVG" v-html="URANUS_SVG"></section>
         <section id="NEPTUNE_SVG" v-html="NEPTUNE_SVG"></section>
         <section id="PLUTO_SVG" v-html="PLUTO_SVG"></section>
         <section id="CHIRON_SVG" v-html="CHIRON_SVG"></section>
         <section id="JUNO_SVG" v-html="JUNO_SVG"></section>
         <section id="VESTA_SVG" v-html="VESTA_SVG"></section>
         <section id="CERES_SVG" v-html="CERES_SVG"></section>
         <section id="PALLAS_SVG" v-html="PALLAS_SVG"></section>
         <section id="NORTH_SVG" v-html="NORTH_SVG"></section>
         <section id="SOUTH_SVG" v-html="SOUTH_SVG"></section>
         <section id="EARTH_SVG" v-html="EARTH_SVG"></section>
      </section>
      <section class="hidden astrosign_resources">
         <section id="ARIES_SVG" v-html="ARIES_SVG"></section>
         <section id="TORUS_SVG" v-html="TORUS_SVG"></section>
         <section id="GEMINI_SVG" v-html="GEMINI_SVG"></section>
         <section id="CANCER_SVG" v-html="CANCER_SVG"></section>
         <section id="LION_SVG" v-html="LION_SVG"></section>
         <section id="VIRG_SVG" v-html="VIRG_SVG"></section>
         <section id="LIBRA_SVG" v-html="LIBRA_SVG"></section>
         <section id="SCORPION_SVG" v-html="SCORPION_SVG"></section>
         <section id="SAGITARIUS_SVG" v-html="SAGITARIUS_SVG"></section>
         <section id="CAPRICORN_SVG" v-html="CAPRICORN_SVG"></section>
         <section id="AQUARIUS_SVG" v-html="AQUARIUS_SVG"></section>
         <section id="PICES_SVG" v-html="PICES_SVG"></section>
      </section>
   </section>
</template>
*/
<script>
   /* @flow */
   //noinspection JSUnresolvedVariable
   import {_} from '../lodash_addon'
   import {setProperties} from '../Utils'
   import {easingMAP} from '../easing'
   import {
      paper, Path, PointText, Circle, Point, view, Group, Matrix,
      SegmentRing, rotateRing, getIsoPolygonsPoints, drawPie, drawArcByCenter, rotateCustomPoint, rotatePoint,
      shiftVector, createText,
      AnimeObject, AnimationGroup, AnimeStack
   } from '../paperjsUtils'

   import {gates_in_serial} from '../humandesign'

   window._     = _
   window.paper = paper
   paper.install(window)

   const SUN_SVG     = require('../statics/astro_sign_sun.svg')
   const MOON_SVG    = require('../statics/astro_sign_moon.svg')
   const MERCURY_SVG = require('../statics/astro_sign_mercury.svg')
   const VENUS_SVG   = require('../statics/astro_sign_venus.svg')
   const MARS_SVG    = require('../statics/astro_sign_mars.svg')
   const JUPITER_SVG = require('../statics/astro_sign_jupiter.svg')
   const SATURN_SVG  = require('../statics/astro_sign_saturn.svg')
   const URANUS_SVG  = require('../statics/astro_sign_uranus.svg')
   const NEPTUNE_SVG = require('../statics/astro_sign_neptune.svg')
   const PLUTO_SVG   = require('../statics/astro_sign_pluto.svg')
   const CHIRON_SVG  = require('../statics/astro_sign_chiron.svg')
   const JUNO_SVG    = require('../statics/astro_sign_juno.svg')
   const VESTA_SVG   = require('../statics/astro_sign_vesta.svg')
   const CERES_SVG   = require('../statics/astro_sign_ceres.svg')
   const PALLAS_SVG  = require('../statics/astro_sign_pallas.svg')
   const SOUTH_SVG   = require('../statics/astro_sign_southnode.svg')
   const NORTH_SVG   = require('../statics/astro_sign_northnode.svg')
   const EARTH_SVG   = require('../statics/astro_sign_earth.svg')
   const planetsSigns =
            ['SUN_SVG', 'MOON_SVG', 'MERCURY_SVG', 'VENUS_SVG', 'MARS_SVG', 'JUPITER_SVG', 'SATURN_SVG', 'URANUS_SVG',
             'NEPTUNE_SVG', 'PLUTO_SVG', 'CHIRON_SVG',
             'JUNO_SVG', 'VESTA_SVG', 'CERES_SVG', 'PALLAS_SVG', 'SOUTH_SVG', 'NORTH_SVG', 'EARTH_SVG']

   const ARIES_SVG      = require('../statics/aries.svg')
   const TORUS_SVG      = require('../statics/torus.svg')
   const GEMINI_SVG     = require('../statics/gemini.svg')
   const CANCER_SVG     = require('../statics/cancer.svg')
   const LION_SVG       = require('../statics/lion.svg')
   const VIRG_SVG       = require('../statics/virgo.svg')
   const LIBRA_SVG      = require('../statics/libra.svg')
   const SCORPION_SVG   = require('../statics/scorpion.svg')
   const SAGITARIUS_SVG = require('../statics/sagitarius.svg')
   const CAPRICORN_SVG  = require('../statics/capricorn.svg')
   const AQUARIUS_SVG   = require('../statics/aquarius.svg')
   const PICES_SVG      = require('../statics/pices.svg')
   let astroSigns       = ['ARIES_SVG', 'TORUS_SVG', 'GEMINI_SVG', 'CANCER_SVG', 'LION_SVG', 'VIRG_SVG', 'LIBRA_SVG',
                           'SCORPION_SVG', 'SAGITARIUS_SVG',
                           'CAPRICORN_SVG', 'AQUARIUS_SVG', 'PICES_SVG']

   function reorderAstroSign() {
      let ret   = new Array(12)
      let shift = 6
      _.forEach(astroSigns, (v, i) => {
         console.log((i + shift) % 12, v)
         ret[(i + shift) % 12] = v
      })
      astroSigns = ret.reverse()
   }

   reorderAstroSign()

   let planetsPlacement =
          {
             "Sun"     : {
                "sign"    : "Capricon魔羯",
                "degree"  : 7.8195999999625405,
                "minutes" : " 57",
                "sign_no" : 10,
                "gateInfo": {
                   "sign"  : "Capricon魔羯",
                   "degree": "7.8195999999625405",
                   "gate"  : "58.72348444443779",
                   "line"  : "5.340906666626701",
                   "tone"  : "1.2726399985612318",
                   "color" : "3.0454399997602053"
                },
                "eclipse" : 82.18040000003747
             },
             "Moon"    : {
                "sign"    : "Aquarius水瓶",
                "degree"  : 14.70823418963797,
                "minutes" : " 51",
                "sign_no" : 11,
                "gateInfo": {
                   "sign"  : "Aquarius水瓶",
                   "degree": "14.70823418963797",
                   "gate"  : "13.281463855935637",
                   "line"  : "2.688783135613825",
                   "tone"  : "1.7961928820976993",
                   "color" : "5.13269881368295"
                },
                "eclipse" : 45.29176581036203
             },
             "Mercury" : {
                "sign"    : "Capricon魔羯",
                "degree"  : 18.77534313370912,
                "minutes" : " 55",
                "sign_no" : 10,
                "gateInfo": {
                   "sign"  : "Capricon魔羯",
                   "degree": "18.77534313370912",
                   "gate"  : "54.6711721126594",
                   "line"  : "5.0270326759563915",
                   "tone"  : "1.973176334430093",
                   "color" : "1.1621960557383488"
                },
                "eclipse" : 71.22465686629087
             },
             "Venus"   : {
                "sign"    : "Aquarius水瓶",
                "degree"  : 8.687874529176291,
                "minutes" : " 49",
                "sign_no" : 11,
                "gateInfo": {
                   "sign"  : "Aquarius水瓶",
                   "degree": "8.687874529176291",
                   "gate"  : "19.211177694075783",
                   "line"  : "2.2670661644546968",
                   "tone"  : "4.614381920369084",
                   "color" : "2.6023969867281807"
                },
                "eclipse" : 51.31212547082371
             },
             "Mars"    : {
                "sign"    : "Libra天秤",
                "degree"  : 5.994106624625252,
                "minutes" : " 8",
                "sign_no" : 7,
                "gateInfo": {
                   "sign"  : "Libra天秤",
                   "degree": "5.994106624625252",
                   "gate"  : "18.398952288822265",
                   "line"  : "3.393713732933602",
                   "tone"  : "3.1736943856096644",
                   "color" : "3.3622823976016107"
                },
                "eclipse" : 174.00589337537474
             },
             "Jupiter" : {
                "sign"    : "Scorpio天蝎",
                "degree"  : 5.612778156569809,
                "minutes" : " 45",
                "sign_no" : 8,
                "gateInfo": {
                   "sign"  : "Scorpio天蝎",
                   "degree": "5.612778156569809",
                   "gate"  : "28.664493894501298",
                   "line"  : "4.986963367007789",
                   "tone"  : "6.530681212280399",
                   "color" : "6.921780202046733"
                },
                "eclipse" : 144.38722184343018
             },
             "Saturn"  : {
                "sign"    : "Libra天秤",
                "degree"  : 21.19662453997781,
                "minutes" : " 20",
                "sign_no" : 7,
                "gateInfo": {
                   "sign"  : "Libra天秤",
                   "degree": "21.19662453997781",
                   "gate"  : "32.1016221404405",
                   "line"  : "1.6097328426429947",
                   "tone"  : "4.950382335147808",
                   "color" : "4.658397055857968"
                },
                "eclipse" : 158.80337546002218
             },
             "Uranus"  : {
                "sign"    : "Sagitarius射手",
                "degree"  : 2.445413347717383,
                "minutes" : " 35",
                "sign_no" : 9,
                "gateInfo": {
                   "sign"  : "Sagitarius射手",
                   "degree": "2.445413347717383",
                   "gate"  : "34.43474015070531",
                   "line"  : "3.608440904231877",
                   "tone"  : "4.903872552347565",
                   "color" : "4.650645425391261"
                },
                "eclipse" : 117.55458665228262
             },
             "Neptune" : {
                "sign"    : "Sagitarius射手",
                "degree"  : 24.94011017882618,
                "minutes" : " 5",
                "sign_no" : 9,
                "gateInfo": {
                   "sign"  : "Sagitarius射手",
                   "degree": "24.94011017882618",
                   "gate"  : "11.433797365124654",
                   "line"  : "3.6027841907479257",
                   "tone"  : "4.700230866925324",
                   "color" : "4.616705144487554"
                },
                "eclipse" : 95.05988982117381
             },
             "Pluto"   : {
                "sign"    : "Libra天秤",
                "degree"  : 26.52062636367082,
                "minutes" : " 39",
                "sign_no" : 7,
                "gateInfo": {
                   "sign"  : "Libra天秤",
                   "degree": "26.52062636367082",
                   "gate"  : "50.04811135354148",
                   "line"  : "1.2886681212488753",
                   "tone"  : "5.392052364959511",
                   "color" : "2.732008727493252"
                },
                "eclipse" : 153.47937363632917
             },
             "Chiron"  : {
                "sign"    : "Torus金牛",
                "degree"  : 17.70680475871618,
                "minutes" : " 51",
                "sign_no" : 2,
                "gateInfo": {
                   "sign"  : "Torus金牛",
                   "degree": "17.70680475871618",
                   "gate"  : "2.18545693178379",
                   "line"  : "5.88725840929726",
                   "tone"  : "2.9413027347013667",
                   "color" : "6.323550455783561"
                },
                "eclipse" : 312.2931952412838
             },
             "Vesta"   : {
                "sign"    : "Sagitarius射手",
                "degree"  : 15.790960380042314,
                "minutes" : " 56",
                "sign_no" : 9,
                "gateInfo": {
                   "sign"  : "Sagitarius射手",
                   "degree": "15.790960380042314",
                   "gate"  : "5.807281845340857",
                   "line"  : "5.843691072045139",
                   "tone"  : "1.3728785936250176",
                   "color" : "6.062146432270836"
                },
                "eclipse" : 104.20903961995768
             },
             "Pallas"  : {
                "sign"    : "Libra天秤",
                "degree"  : 15.88973229935339,
                "minutes" : " 1",
                "sign_no" : 7,
                "gateInfo": {
                   "sign"  : "Libra天秤",
                   "degree": "15.88973229935339",
                   "gate"  : "57.15817463099616",
                   "line"  : "1.9490477859769442",
                   "tone"  : "5.16572029516999",
                   "color" : "6.694286715861665"
                },
                "eclipse" : 164.1102677006466
             },
             "Juno"    : {
                "sign"    : "Sagitarius射手",
                "degree"  : 12.435334484379062,
                "minutes" : " 34",
                "sign_no" : 9,
                "gateInfo": {
                   "sign"  : "Sagitarius射手",
                   "degree": "12.435334484379062",
                   "gate"  : "5.210726130556278",
                   "line"  : "2.264356783337668",
                   "tone"  : "4.516844200156044",
                   "color" : "2.5861407000260073"
                },
                "eclipse" : 107.56466551562093
             },
             "Ceres"   : {
                "sign"    : "Scorpio天蝎",
                "degree"  : 9.422197030789043,
                "minutes" : " 33",
                "sign_no" : 8,
                "gateInfo": {
                   "sign"  : "Scorpio天蝎",
                   "degree": "9.422197030789043",
                   "gate"  : "44.34172391658472",
                   "line"  : "3.0503434995083047",
                   "tone"  : "2.812365982298971",
                   "color" : "1.3020609970498285"
                },
                "eclipse" : 140.57780296921095
             },
             "North"   : {
                "sign"    : "Cancer巨蝎",
                "degree"  : 22.576498745169395,
                "minutes" : " 43",
                "sign_no" : 4,
                "gateInfo": {
                   "sign"  : "Cancer巨蝎",
                   "degree": "22.576498745169395",
                   "gate"  : "62.65306688974766",
                   "line"  : "3.081598661514027",
                   "tone"  : "3.937551814504978",
                   "color" : "1.489591969084163"
                },
                "eclipse" : 247.4235012548306
             },
             "South"   : {
                "sign"    : "Capricon魔羯",
                "degree"  : 22.277415442937432,
                "minutes" : " 25",
                "sign_no" : 10,
                "gateInfo": {
                   "sign"  : "Capricon魔羯",
                   "degree": "22.277415442937432",
                   "gate"  : "61.2937627454111",
                   "line"  : "2.762576472466584",
                   "tone"  : "4.452753008797032",
                   "color" : "5.575458834799505"
                },
                "eclipse" : 67.72258455706256
             },
             "sunrise" : {
                "sign"     : "Scorpio天蝎",
                "degree"   : 4.4613910447386536,
                "minutes"  : " 36",
                "sign_no"  : 8,
                "gateInfo" : {
                   "sign"  : "Scorpio天蝎",
                   "degree": "4.4613910447386536",
                   "gate"  : "28.45980285239798",
                   "line"  : "3.758817114387888",
                   "tone"  : "4.3174161179639725",
                   "color" : "5.552902686327329"
                },
                "eclipse"  : 145.53860895526134,
                "time"     : "1981-12-30 06:38:06.739508",
                "daylong"  : "636",
                "nightlong": "804"
             },
             "sunset"  : {
                "sign"     : "Torus金牛",
                "degree"   : 4.461391044738625,
                "minutes"  : " 36",
                "sign_no"  : 2,
                "gateInfo" : {
                   "sign"  : "Torus金牛",
                   "degree": "4.461391044738625",
                   "gate"  : "27.540197147602022",
                   "line"  : "3.758817114387867",
                   "tone"  : "4.317416117963205",
                   "color" : "5.552902686327201"
                },
                "eclipse"  : 325.5386089552614,
                "time"     : "1981-12-30 17:14:13.477175",
                "daylong"  : "636",
                "nightlong": "804"
             },
             "Observer": {"date": "1981-12-30 01:54:59.999996", "lon": "121:34:06.0", "lat": "25:02:09.0"},
             "Earth"   : {
                "sign"    : "Cancer巨蝎",
                "degree"  : 7.8195999999625405,
                "minutes" : " 57",
                "sign_no" : 4,
                "gateInfo": {
                   "sign"  : "Cancer巨蝎",
                   "degree": "7.8195999999625405",
                   "gate"  : "52.27651555556221",
                   "line"  : "5.3409066666267115",
                   "tone"  : "1.2726399985616155",
                   "color" : "3.0454399997602692"
                },
                "eclipse" : 262.1804000000375
             }
          }


   let ret = []
   _.forEach(planetsPlacement, function (v, k) {
      if (k !== 'Observer') {
         ret.push([v.eclipse, k, v])
         v.resourceName = k.toUpperCase() + '_SVG'
      }
   })
   planetsPlacement        = _.sortBy(ret, (x) => x[0])
   window.planetsPlacement = planetsPlacement


   async function _sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms))
   }

   async function sleep(ms:number) {
      return await _sleep(ms)
   }

   function pathify(...shapes) {
      return shapes.map((x) => paper.project.importJSON(x.exportJSON()))
   }

   function createBolleanedShapde(master, slave, methodname) {
      let pathdata = pathify(master, slave)
      return paper.project.activeLayer.importJSON(pathdata[0][methodname](pathdata[1]).exportJSON())
   }


   //   NOTE:                                                           :
   //   NOTE:                  VUE COMPONENT                            :
   export default {
      components: {},
      data() {
         return {
            name          : 'testComp_paperjs',
            SAGITARIUS_SVG: SAGITARIUS_SVG,
            ARIES_SVG     : ARIES_SVG,
            TORUS_SVG     : TORUS_SVG,
            GEMINI_SVG    : GEMINI_SVG,
            CANCER_SVG    : CANCER_SVG,
            LION_SVG      : LION_SVG,
            VIRG_SVG      : VIRG_SVG,
            LIBRA_SVG     : LIBRA_SVG,
            SCORPION_SVG  : SCORPION_SVG,
            CAPRICORN_SVG : CAPRICORN_SVG,
            AQUARIUS_SVG  : AQUARIUS_SVG,
            PICES_SVG     : PICES_SVG,
            SUN_SVG       : SUN_SVG,
            MOON_SVG      : MOON_SVG,
            MERCURY_SVG   : MERCURY_SVG,
            VENUS_SVG     : VENUS_SVG,
            MARS_SVG      : MARS_SVG,
            JUPITER_SVG   : JUPITER_SVG,
            SATURN_SVG    : SATURN_SVG,
            NEPTUNE_SVG   : NEPTUNE_SVG,
            PLUTO_SVG     : PLUTO_SVG,
            CHIRON_SVG    : CHIRON_SVG,
            JUNO_SVG      : JUNO_SVG,
            VESTA_SVG     : VESTA_SVG,
            CERES_SVG     : CERES_SVG,
            PALLAS_SVG    : PALLAS_SVG,
            URANUS_SVG    : URANUS_SVG,
            SOUTH_SVG     : SOUTH_SVG,
            NORTH_SVG     : NORTH_SVG,
            EARTH_SVG     : EARTH_SVG
         }
      },
      methods   : {
         sixtyFourGatesDrawingClassVer(center) {
            center                        = new Point(center)
            let twoDigit                  = (x) => (' ' + x).slice(-2)
            let iradius                   = 240
            let segments                  = 64
            let oradius                   = iradius + ((iradius * 6.28) / segments)
            let gates_ring_calibration    = 30 //+ 360/64
            let textsize                  = 10
            let mradius                   = oradius + (iradius - oradius) / 2
            let ichingNumbers             = _.clone(gates_in_serial).reverse().map((x) => twoDigit(x))
            let params: TSegmentRingParam = {
               paths    : {
                  segments  : segments,
                  oradius   : iradius,
                  iradius   : oradius,
                  rotation  : gates_ring_calibration,
                  center    : center,
                  mouseEvent: false,
                  isometric : true,
                  style     : {strokeColor: 'white', fillColor: 'white', 'strokeColor.alpha': 0.3, 'fillColor.alpha': 0.05}
               },
               resources: {size: textsize, type: 'text', data: ichingNumbers},
               name     : 'Iching'
            }

            let ichingRing = new SegmentRing(params)

            let paramsB: TSegmentRingParam = {
               paths    : {
                  segments  : 12,
                  oradius   : iradius,
                  iradius   : iradius - 80,
                  rotation  : 0,
                  center    : center,
                  mouseEvent: true,
                  isometric : true,
                  style     : {strokeColor: 'white', fillColor: 'white', 'strokeColor.alpha': 0.3, 'fillColor.alpha': 0.05}
               },
               resources: {
                  size : 24, type: 'icon', data: astroSigns.map(x => document.querySelector(`section#${x} > svg`)),
                  style: {fillColor: '#fff', opacity: 0.4}
               }, name  : 'astro'
            }
            let astroRing                  = new SegmentRing(paramsB)
            let canvasSize = 600
            let iconsize = 24
            let paramsC: TSegmentRingParam = {
               paths    : {
                  segments  : window.planetsPlacement.map((x) => [x[0], x[1], x[2]]),
                  oradius   : oradius,
                  iradius   : oradius + 20,
                  rotation  : 0,
                  center    : center,
                  extrude   : 16,
                  mouseEvent: true,
                  isometric : false,
                  dedensity : 'parallel'
               },
               resources: {
                  size : 16,
                  type : 'icon',
                  data : window.planetsPlacement.map((x) => document.querySelector(`section#${x[2].resourceName} > svg`)),
                  style: {  scaling: iconsize/canvasSize}
               }
               , name   : 'planet'
            }
            let planetRing                 = new SegmentRing(paramsC)
            window.ichingRing              = ichingRing
            window.astroRing               = astroRing
            window.planetRing              = planetRing

            astroRing.onMosueEnter(function (id: number, path: Path) {
               path.fillColor             = 'red'
               path.fillColor.alpha       = 0.5
               document.body.style.cursor = 'pointer'
            })
            astroRing.onMouseLeave(function (id: number, path: Path) {
               path.fillColor             = 'white'
               path.fillColor.alpha       = 0.05
               document.body.style.cursor = 'default'
            })


            function positionSetter(ratio, destination, target, linked) {
               target.position.x += ratio * (destination[0] - target.position.x)
               target.position.y += ratio * (destination[0] - target.position.y)
            }

            function skewGetter(target) {
               console.log('getter:', [target.matrix._skewX, target.matrix._skewY])
               return {skewTo: [target.matrix._skewX, target.matrix._skewY]}
            }

            function skewSetter(ratio, dest, origin, target, linked) {
               console.log(ratio, dest, origin, linked)
               let x = origin[1][0] + ratio * (dest[1][0] - origin[1][0])
               let y = origin[1][1] + ratio * (dest[1][1] - origin[1][1])
               target.matrix.skewTo(x, y)
               //               TODO: need define getter seeter in animation configuration, or let user named a several comon configurations
               //TODO: for better integration with other libraries                                                          ;
            }

            let wholeRing = new Group([ichingRing.rootRing, astroRing.rootRing, planetRing.rootRing])

            //let animeA = window.animeA = new AnimeObject({
            //   to    : [{prop: 'position', value: [400, 400]}], decay: 1000, duration: 1100,
            //   target: astroRing.rootRing, fromOrigin: true,
            //   easing: easingMAP['quadOut'], reusable: true
            //})
            //
            //let animeB = window.animeB = new AnimeObject({
            //   to    : [{prop: 'position.x', value: 400}, {prop: 'position.y', value: 430}], decay: 1100, duration: 900,
            //   target: ichingRing.rootRing, fromOrigin: true,
            //   easing: easingMAP['quadOut'], reusable: true
            //})

            let animeC = window.animeC = new AnimeObject({
               to    : [{prop: 'matrix.skewTo', value: [-13, 0]}, {prop: 'position', value: [400, 400]}], decay: 1000, duration: 900,
               target: wholeRing, fromOrigin: true,
               easing: easingMAP['quadOut'], reusable: true, linked: {skew: [0, 0], _skew: [0, 0]},
            })

            window.AnimationGroup = AnimationGroup


            let counter        = 0
            let time           = Date.now()
            let i, len
            paper.view.onFrame = function (event) {
               if (event.count % 2 === 0) {
                  time = Date.now()
                  len  = AnimeStack.length
                  for (i = 0; i < len; i++) {
                     if (!AnimeStack[i].finished) {
                        if (!AnimeStack[i].calc(time)) {
                           i   = i - 1
                           len = len - 1
                        }
                     }
                  }
               }
            }

         },
         sixtyFourGatesDrawing(center) {
            center         = new Point(center)
            let twoDigit   = (x) => (' ' + x).slice(-2)
            let oradius    = 200
            let iradius    = 150
            let astro_span = 360 / 12
            let gate_span  = 360 / 64
            let _from, _inc, pie
            let astro_pies = []
            let gates_pies = []
            let gates_text = []
            // NOTE: 算法似乎是由下降點開始，往第五宮位移一個宮位，再往六宮移一個閘門
            // NOTE: 59 始於五宮，而排的時後在六宮
            let gates_ring_calibration          = 30 //+ 360/64
            let astro_ring, gates_ring
            let x, y, text
            let textsize                        = 10
            let gates_mradius                   = oradius + ((oradius * 6.28) / 64) / 2
            let gates_number_anchor_points      = getIsoPolygonsPoints(center, gates_mradius, 64, gates_ring_calibration + 360
               / 128)
            gates_number_anchor_points.position = center
            let ichingNumbers                   = _.clone(gates_in_serial).reverse()
            console.log(gates_number_anchor_points)

            //             NOTE:                                                              :
            //             NOTE: drawing iching ring with mouse on enter event                :
            for (let gate = 0; gate < 64; gate++) {
               _from                 = gate_span * gate + gates_ring_calibration
               _inc                  = gate_span
               pie                   = drawPie(center, oradius + (oradius * 6.28) / 64, oradius, _from, _inc)
               pie.strokeColor       = 'white'
               pie.strokeColor.alpha = 0.3

               x                    = gates_number_anchor_points[gate].x
               y                    = gates_number_anchor_points[gate].y
               text                 = createText(x - textsize / 2, y + textsize / 2, twoDigit(ichingNumbers[gate]))
               text.fillColor       = 'white'
               text.fillColor.alpha = 0.5
               text.fontSize        = textsize

               gates_text.push(text)
               gates_pies.push(pie)
               pie.onMouseEnter = function () {
                  this.fillColor       = 'red'
                  this.fillColor.alpha = 0.5
               }
               pie.onMouseLeave = function () {
                  this.fillColor       = 'white'
                  this.fillColor.alpha = 0.05
               }
            }

            function matrix<T>(number, fn: (number, T) => T, acc = 0) {
               for (let i = 0; i < number; i++) {
                  acc = fn(i, acc)
               }
            }

            //            NOTE:                                                            :
            //            NOTE: Drawing astology ring with mouse on enter event            :
            matrix(12, function drawingAstroRing(id, acc) {
               let gap               = 1
               let increment         = astro_span
               pie                   = drawPie(center, oradius, iradius, acc, increment)
               pie.strokeColor       = 'white'
               pie.strokeColor.alpha = .1
               pie.fillColor         = 'grey'
               pie.fillColor.alpha   = 0.3

               pie.onMouseEnter = function () {
                  this.fillColor             = 'red'
                  this.fillColor.alpha       = 0.5
                  document.body.style.cursor = 'pointer'
               }
               pie.onMouseLeave = function () {
                  this.fillColor             = 'grey'
                  this.fillColor.alpha       = 0.1
                  document.body.style.cursor = 'default'
               }

               astro_pies.push(pie)
               acc += increment
               return acc
            }, 0)

            matrix(12, function drawingAstroRing(id, acc) {
               let gap               = 1
               let increment         = astro_span
               pie                   = drawPie(center, iradius, iradius - 40, acc + gap / 2, increment - gap)
               pie.strokeColor       = 'white'
               pie.strokeColor.alpha = .1
               pie.fillColor         = 'grey'
               pie.fillColor.alpha   = 0.4
               astro_pies.push(pie)
               acc += increment
               return acc
            }, 0)


            astro_ring = new Group(astro_pies)
            gates_ring = new Group(gates_pies)
            gates_ring.sendToBack()
            //            gates_text  = new Group(gates_text)
            //            let hd_ring = new Group([astro_ring, gates_ring, gates_text])
            //            console.log('export SVG:.....')
            //            console.log(hd_ring.exportSVG())
            //            rotateCustomPoint(30,gates_mradius,gates_number_anchor_points,center)
            //            rotateRing(30, gates_ring, gates_text, gates_number_anchor_points, center, 64)
            //


            function rotateRing(rotation, ring, _center, segments, resources, resources_origpoint, radius, resource_size) {
               let point
               for (let i = 0; i < segments; i++) {
                  point                = rotateCustomPoint(rotation, radius, resources_origpoint[i], _center)
                  resources[i].point.x = point[0] - resource_size / 2
                  resources[i].point.y = point[1] + resource_size / 2
               }
               ring.rotate(rotation)
            }

            function rotateCustomPoint(degree: number, radius: number, point: object, center: Point): number[] {
               degree         = degree % 360
               let px, py
               let shiftx     = point.radius * Math.cos(Math.radians(point.rotation + degree))
               let shifty     = point.radius * Math.sin(Math.radians(point.rotation + degree))
               point.rotation = point.rotation + degree
               return [center.x + shiftx, center.y + shifty]
            }

            let counter = 0
            let point

            for (let i = 0; i < 64; i++) {
               point = rotateCustomPoint(30, gates_mradius, gates_number_anchor_points[i], center)

               gates_text[i].point.x = point[0] - textsize / 2
               gates_text[i].point.y = point[1] + textsize / 2
            }
            gates_ring.rotate(30)
            console.log(gates_text)
            rotateRing(60, gates_ring, center, 64, gates_text, gates_number_anchor_points, gates_mradius, textsize)
            //            paper.view.onFrame = function(){
            //               if (counter <100){
            //                  counter += 0.1
            //                  rotateRing(counter, gates_ring, gates_text, gates_number_anchor_points, center, 64)
            //               }
            //            }

         },

         async pieDrawing(center) {

            let input_outerRad = 160
            let input_innerRad = 80
            let input_pieAngle = 30
            center             = new Point(...center)

            let circle                                                   = Circle({center: center, radius: input_outerRad})
            circle.strokeColor                                           = 'white'
            createText(center.x, center.y, `center:${center}`).fillColor = 'white'

            let circle2         = Circle({center: center, radius: input_innerRad})
            circle2.strokeColor = 'white'

            let pie             = drawPie(center, input_outerRad, input_innerRad, 0, 30)
            pie.fillColor       = 'gray'
            pie.fillColor.alpha = 0.4

            let pie2             = drawPie(center, input_outerRad, input_innerRad, 35, 30)
            pie2.fillColor       = 'gray'
            pie2.fillColor.alpha = 0.4

            // -----------------------------------
            let arc               = drawArcByCenter(center, input_outerRad, 0, 30, true)
            arc.strokeColor       = 'red'
            arc.strokeColor.alpha = 0.4

            let arc2               = drawArcByCenter(center, input_innerRad, 30, -30, false)
            arc.segments           = arc.segments.concat(arc2.segments)
            arc.closed             = true
            // -----------------------------------
            let arc3               = drawArcByCenter(center, input_outerRad, 35, 30, true)
            arc3.strokeColor       = 'red'
            arc3.strokeColor.alpha = 1

            let arc4      = drawArcByCenter(center, input_innerRad, 65, -30, false)
            arc3.segments = arc3.segments.concat(arc4.segments)
            arc3.closed   = true

            function matrix<T>(number, fn: (number, T) => T, acc = 0) {
               for (let i = 0; i < number; i++) {
                  acc = fn(i, acc)
               }
            }

            matrix(3, (id, acc) => {
               let increment          = 30
               let gap                = 4
               let arc3               = drawArcByCenter(center, input_outerRad, acc - gap / 2, increment - gap / 2, false)
               arc3.strokeColor       = 'red'
               arc3.strokeColor.alpha = 1
               acc += increment
               let arc4               = drawArcByCenter(center, input_innerRad, acc - gap / 2, -increment + gap / 2, false)
               arc3.segments          = arc3.segments.concat(arc4.segments)
               arc3.closed            = true
               return acc
            }, 90)

            matrix(3, (id, acc) => {
               let increment       = 30
               let gap             = 4
               let pie             = drawPie(center, input_outerRad, input_innerRad, acc - gap / 2, 30 - gap / 2)
               pie.fillColor       = 'gray'
               pie.fillColor.alpha = 0.4
               acc += increment
               return acc
            }, 190)


            console.log('arc3:', arc3)


            let counter = 10
            //            paper.view.draw()
            await sleep(13000)
            console.log('..............')
            return

            let _from, _to
            paper.view.onFrame = function (event) {
               // Each frame, rotate the path by 3 degrees:
               counter += 0.5
               arc2.remove()
               arc.debugText1.remove()
               arc.debugText2.remove()
               arc.remove()
               pie.remove()

               _from                 = counter * .75
               _to                   = counter
               arc                   = drawArcByCenter(center, input_outerRad, _from, _to, true)
               arc.strokeColor       = 'red'
               arc.strokeColor.alpha = 0.4

               arc2         = drawArcByCenter(center, input_innerRad, _from + _to, _from - (_from + _to), false)
               arc.segments = arc.segments.concat(arc2.segments)
               arc.closed   = true

               pie                 = drawPie(center, input_outerRad, input_innerRad, _from, _to)
               pie.fillColor       = 'gray'
               pie.fillColor.alpha = 0.4
            }


         },

         testA(center) {
            console.log('paperjs')

            let project    = paper.project
            let shiftA     = [0, 0]
            let text       = createText(100, center[1] - 120, 'Shapes Drawing and Boolean Opperation')
            text.fillColor = 'white'

            let circleA = new paper.Path.Circle({
               center   : center,
               fillColor: 'green',
               radius   : 100
            })

            let rectangle = new paper.Path.Rectangle({
               point    : center,
               size     : [200, 200],
               fillColor: 'blue'
            });

            let united_path             = createBolleanedShapde(circleA, rectangle, 'unite')
            united_path.fillColor       = 'yellow'
            united_path.fillColor.alpha = 0.1
            united_path.position.x += 300
            united_path.fullySelected   = true
            console.log(united_path.position, united_path)

            let textl       = createText(center[0], center[1] + 150, 'Drawing Shapes')
            let textR       = createText(center[0] + 300, center[1] + 150, 'unite Shapes with union opperation')
            textl.fillColor = 'white'
            textR.fillColor = 'white'

         }
         ,
         run_test() {
            paper.setup('canvas_testA')
            let top                                = [320, 400]
            let sectionh                           = 450
            this.el.querySelector('canvas').width  = 600
            this.el.querySelector('canvas').height = 2200
            this.sixtyFourGatesDrawingClassVer([top[0], 300])
            this.sixtyFourGatesDrawing([top[0], top[1] + 1 * sectionh])
            this.pieDrawing([top[0], top[1] + 2 * sectionh])
            this.testA([top[0] - 100, top[1] + 3 * sectionh])
         }
      },
      mounted() {
         this.el = this.$el
         paper.setup('canvas_testA')
         let top = [300, 400]
         this.sixtyFourGatesDrawingClassVer([top[0], 300])
      }
   }

</script>


<style lang="stylus">
   canvas#canvas_testA
      width 600px
      height 600px

   h1, h2, h3, h4, h5, p
      color white

   section.hidden
      display none !important

   section.astrosign_resources
      section
         display inline-block
         width: 32px
         height: 32px
         path
            fill white !important
            fill-opacity 0.8 !important

   section.planetsign_resources
      section
         display: inline-block
         width 16px
         height 16px
         path
            fill white !important
            fill-opacity 0.8 !important

   html
      background: #005556 !important /* Old browsers */
      background: -moz-linear-gradient(-45deg, #005556 0%, #ffb600 78%) !important
      background: -webkit-linear-gradient(-45deg, #005556 0%, #ffb600 78%) !important
      background: linear-gradient(135deg, #005556 0%, #ffb600 78%) !important
      background-repeat: no-repeat !important
      background-attachment: fixed !important
</style>
