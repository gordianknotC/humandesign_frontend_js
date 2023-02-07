/* eslint-disable spaced-comment,block-spacing,one-var,operator-linebreak */
/**
 * Created by gordianknot on 10/5/17.
 */
   // import {mobileConsoleInit} from '../util'
   // human design
import {LocalDataBase} from 'storage'
const {TConsole, eCOLORS, TConsoleInstances} = require('../src/console_addon')
const _                                      = require("lodash")
const fetch                                  = require('node-fetch')
const Log                                    = new TConsole('humandesign', eCOLORS.info)

export const SACRAL    = "Sacral"
export const SOLAR     = "SolarPlexus"
export const ROOT      = "Root"
export const SPLEEN    = "Spleen"
export const HEART     = "Heart"
export const GCENTER   = "Gcenter"
export const THROAT    = "Throat"
export const AJNA      = "Ajna"
export const HEAD      = "Head"
const TIntegral        = "Integration Channel, self empowerment"
const TIndividual      = "Individual, Knowing and Centering Circuits"
const TKnowing         = "Individual, Knowing Circuit"
const TCentering       = "Individual, Centering Circuit"
const TCollective      = "Collective, Understanding and Sensing Ciruits"
const TUnderstanding   = "Collective, Understanding Circuite"
const TSensing         = "Collective, Sensing Circuit"
const TTribal          = "Tribal Circuit Group"
const TDefense         = "Tribal, Defense Circuit"
const THeart           = "Tribal, Ego Circuit"
const TGenerated       = "type of Generated"
const TGenManifestor   = "type of Manifesting Generated"
const TManifested      = "type of Manifested"
const TProjected       = "type of Projected"
const THTransform      = "Purpose fulfilled through Transformation"
const THBonding        = "Purpose fulfilled through Bonding"
const THForm           = "Purpose fulfilled through Form"
const THMind           = "Purpose fulfilled through Mind"
const THDuality        = "Purpose fullfilled through Duality"
const QMutation        = "Mutation"
const QDuality         = "Duality"
const QInitiate        = "Initiation"
const QCivil           = "Civilization"
const _themeQuarterMap = {
   Mutation    : THTransform,
   Duality     : THBonding,
   Initiation  : THMind,
   Civilization: THForm
}
const _getThemes       = (quarters) => { }
const gates            = 64
const gate_span        = 360 / gates
const house_span       = 360 / 12
const gates_per_house  = house_span / gate_span
const lbound_house     = 5
const lbound_degree    = gate_span * lbound_house
const lbound_gate      = 59
//NOTE: ZODIAC names used in python server              :
export const ZODIAC         = 'Aries Torus Gemini Cancer Lion Virgo Libra Scorpio Sagitarius Capricon Aquarius Pices'.split(' ')
const ARIES          = 'Aries牧羊'
const TORUS          = 'Torus金牛'
const GEMINI         = 'Gemini雙子'
const CANCER         = 'Cancer巨蝎'
const LION           = 'Lion獅子'
const VIRGO          = 'Virgo處女'
const LIBRA          = 'Libra天秤'
const SCORPIO        = 'Scorpio天蝎'
const SAGITARIUS     = 'Sagitarius射手'
const CAPRICON       = 'Capricon魔羯'
const AQUARIUS       = 'Aquarius水瓶'
const PICES          = 'Pices雙魚'
const sARIES         = 'aries'
const sTORUS         = 'torus'
const sGEMINI        = 'gemini'
const sCANCER        = 'cancer'
const sLION          = 'lion'
const sVIRGO         = 'virgo'
const sLIBRA         = 'libra'
const sSCORPIO       = 'scorpio'
const sSAGITARIUS    = 'sagitarius'
const sCAPRICON      = 'capricon'
const sAQUARIUS      = 'aquarius'
const sPICES         = 'pices'
const options        = [
   {text: ARIES, value: 1},
   {text: TORUS, value: 2},
   {text: GEMINI, value: 3},
   {text: CANCER, value: 4},
   {text: LION, value: 5},
   {text: VIRGO, value: 6},
   {text: LIBRA, value: 7},
   {text: SCORPIO, value: 8},
   {text: SAGITARIUS, value: 9},
   {text: CAPRICON, value: 10},
   {text: AQUARIUS, value: 11},
   {text: PICES, value: 12}
]
const astro_signs    = options.map((e) => { return e.text })
const shortToLongMap = {
   aries     : ARIES,
   torus     : TORUS,
   gemini    : GEMINI,
   cancer    : CANCER,
   lion      : LION,
   virgo     : VIRGO,
   libra     : LIBRA,
   scorpio   : SCORPIO,
   sagitarius: SAGITARIUS,
   capricon  : CAPRICON,
   aquarius  : AQUARIUS,
   pices     : PICES
}
const longToShortMap = _.zipObject(astro_signs, _.keys(shortToLongMap))

const astroRulerMap = {
   short: {
      aries     : "mars",
      torus     : "venus",
      gemini    : "merrcurius",
      cancer    : "moon",
      lion      : "sun",
      virgo     : "merrcurius",
      libra     : "venus",
      scorpio   : ["mars", "pluto"],
      sagitarius: "jupyter",
      capricon  : "saturn",
      aquarius  : ["saturn", "uranus"],
      pices     : ["jupyter", "neptune"]
   }
}
astroRulerMap.long  = _.zipObject(astro_signs, _.values(astroRulerMap.short))


const rulerAstroMap = {
   short: {
      sun       : sLION,
      mars      : [sARIES, sSCORPIO],
      venus     : [sLIBRA, sTORUS],
      merrcurius: [sVIRGO, sGEMINI],
      moon      : [sCANCER],
      jupyter   : [sPICES, sSAGITARIUS],
      saturn    : [sCAPRICON, sAQUARIUS],
      uranus    : sAQUARIUS,
      neptune   : sPICES,
      pluto     : sSCORPIO
   },
   long : {
      sun       : LION,
      mars      : [ARIES, SCORPIO],
      venus     : [LIBRA, TORUS],
      merrcurius: [VIRGO, GEMINI],
      moon      : [CANCER],
      jupyter   : [PICES, SAGITARIUS],
      saturn    : [CAPRICON, AQUARIUS],
      uranus    : AQUARIUS,
      neptune   : PICES,
      pluto     : SCORPIO
   }
}

// FIXME: esoteric ruler....
const esotericAstroRulerMap = {
   aries     : "mars",
   torus     : "venus",
   gemini    : "merrcurius",
   cancer    : "moon",
   lion      : "sun",
   virgo     : "merrcurius",
   libra     : "venus",
   scorpio   : ["mars", "pluto"],
   sagitarius: "jupyter",
   capricon  : "saturn",
   aquarius  : ["saturn", "uranus"],
   pices     : ["jupyter", "neptune"]
}


const CARDINALS    = [ARIES, LIBRA, CANCER, CAPRICON]
const FIXEDS       = [TORUS, SCORPIO, AQUARIUS, LION]
const MUTATIONS    = [PICES, VIRGO, GEMINI, SAGITARIUS]
const sCARDINALS   = [sARIES, sLIBRA, sCANCER, sCAPRICON]
const sFIXEDS      = [sTORUS, sSCORPIO, sAQUARIUS, sLION]
const sMUTATIONS   = [sPICES, sVIRGO, sGEMINI, sSAGITARIUS]
const astroModes   = {
   cardinal: {long: CARDINALS, short: sCARDINALS},
   fixed   : {long: FIXEDS, short: sFIXEDS},
   mutation: {long: MUTATIONS, short: sMUTATIONS},
}
const astroModeMap = {
   short: {
      aries     : "cardinal",
      torus     : "fixed",
      gemini    : "mutation",
      cancer    : "cardinal",
      lion      : "fixed",
      virgo     : "mutation",
      libra     : "cardinal",
      scorpio   : "fixed",
      sagitarius: "mutation",
      capricon  : "cardinal",
      aquarius  : "fixed",
      pices     : "mutation"
   }
}
astroModeMap.long  = _.zipObject(astro_signs, _.values(astroModeMap.short))

const WATER  = [SCORPIO, CANCER, PICES]
const FIRE   = [SAGITARIUS, LION, ARIES]
const EARTH  = [TORUS, CAPRICON, VIRGO]
const WIND   = [LIBRA, GEMINI, AQUARIUS]
const sWATER = [sSCORPIO, sCANCER, sPICES]
const sFIRE  = [sSAGITARIUS, sLION, sARIES]
const sEARTH = [sTORUS, sCAPRICON, sVIRGO]
const sWIND  = [sLIBRA, sGEMINI, sAQUARIUS]

const astroElements   = {
   water: {short: sWATER, long: WATER},
   fire : {short: sFIRE, long: FIRE},
   wind : {short: sWIND, long: WIND},
   earth: {short: sEARTH, long: EARTH}
}
const astroElementMap = {
   short: {
      aries     : "fire",
      torus     : "earth",
      gemini    : "wind",
      cancer    : "water",
      lion      : "fire",
      virgo     : "earth",
      libra     : "wind",
      scorpio   : "water",
      sagitarius: "fire",
      capricon  : "earth",
      aquarius  : "wind",
      pices     : "water"
   }
}
astroElementMap.long  = _.zipObject(options.map((e) => {return e.text}), _.values(astroElementMap.short))

const readableZodiacSigns = [ARIES, TORUS, GEMINI, CANCER, LION, VIRGO, LIBRA, SCORPIO, SAGITARIUS,
                             CAPRICON, AQUARIUS, PICES]
const zodiacSignsInShort  = [sARIES, sTORUS, sGEMINI, sCANCER, sLION, sVIRGO, sLIBRA, sSCORPIO, sSAGITARIUS,
                             sCAPRICON, sAQUARIUS, sPICES]
const readableNameMap     = _.zipObject(readableZodiacSigns, zodiacSignsInShort)


const astroRulers_ch  = _.zipObject(astro_signs, _.values(astroRulerMap.short))
export const gates_in_serial = [59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1,
                         43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60, 41, 19, 13, 49, 30, 55, 37, 63,
                         22, 36,
                         25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62,
                         56, 31,
                         33, 7, 4, 29]

// TODO:
const esotericRulerAstroMap = _.zipObject(_.keys(esotericAstroRulerMap), _.values(esotericAstroRulerMap))

// TODO: Channel Names......
const channel_names_list  = [
   // Integration: self Empoerment
   "Channel of Power: A Design of an Archetype",
   "Channnel of Charisma: A Design where Awareness must Become Deed",
   "Channel of Perfected Form: A Design of Survival",
   "Channel of Awakening: A Design of Commitment to Higher Principles",
   // Individual, Knowing Circuite
   "Channel of Mutation: A Design of Energy which Initiates and Fluctuates - Pulse",
   "Channel of the Beat: A Design of being a Keeper of Keys",
   ""

]
// TODO: Circuits
const circuits            = [
   {name: "Integration", key: "Self Empowerment"},
   {
      name: "Knowing",
      key : "to be empowered to live as themselves and empower others by being an individual example of uniquness"
   },
   {
      name: "Centering",
      key : "focused on empowering people to love themselves, and follow their unique path in life by living according to their Sacral's' purpose."
   },
   {name: "Understanding", key: ""},
   {name: "Sensing", key: ""},
   {name: "Defense", key: ""},
   {name: "Ego", key: ""},
]
export const channelsData = [
   // Integration Self empowerment
   {
      gates          : [34, 57],
      center         : [SACRAL, SPLEEN],
      type           : [TIntegral, TGenerated],
      quarter        : [QMutation, QDuality],
      theme          : [THTransform, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [34, 20],
      center         : [SACRAL, THROAT],
      type           : [TIntegral, TGenManifestor],
      quarter        : [QMutation, QCivil],
      theme          : [THTransform, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [57, 10],
      center         : [SPLEEN, GCENTER],
      type           : [TIntegral, TProjected],
      quarter        : [QDuality, QMutation],
      theme          : [THBonding, THTransform],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [10, 20],
      center         : [GCENTER, THROAT],
      type           : [TIntegral, TProjected],
      quarter        : [QMutation, QCivil],
      theme          : [THTransform, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   // Knowing and Centering Circuits
   // Knowing Circuite
   {
      gates          : [3, 60],
      center         : [SACRAL, ROOT],
      type           : [TKnowing, TGenerated],
      quarter        : [QInitiate, QMutation],
      theme          : [THMind, THTransform],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [14, 2],
      center         : [SACRAL, GCENTER],
      type           : [TKnowing, TGenerated],
      quarter        : [QMutation, QCivil],
      theme          : [THTransform, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [1, 8],
      center         : [GCENTER, THROAT],
      type           : [TKnowing, TProjected],
      quarter        : [QMutation, QCivil],
      theme          : [THTransform, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [61, 24],
      center         : [HEAD, AJNA],
      type           : [TKnowing, TProjected],
      quarter        : [QMutation, QInitiate],
      theme          : [THTransform, THMind],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [43, 23],
      center         : [AJNA, THROAT],
      type           : [TKnowing, TProjected],
      quarter        : [QMutation, QCivil],
      theme          : [THTransform, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [38, 28],
      center         : [ROOT, SPLEEN],
      type           : [TKnowing, TProjected],
      quarter        : [QMutation, QDuality],
      theme          : [THTransform, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [57, 20],
      center         : [SPLEEN, THROAT],
      type           : [TKnowing, TProjected],
      quarter        : [QDuality, QCivil],
      theme          : [THBonding, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [39, 55],
      center         : [ROOT, SOLAR],
      type           : [TKnowing, TProjected],
      quarter        : [QCivil, QInitiate],
      theme          : [THForm, THMind],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [22, 12],
      center         : [SOLAR, THROAT],
      type           : [TKnowing, TManifested],
      quarter        : [QInitiate, QCivil],
      theme          : [THMind, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   // Centering Circuit: Empowerment
   {
      gates          : [34, 10],
      center         : [SACRAL, GCENTER],
      type           : [TCentering, TGenerated],
      quarter        : [QMutation, QMutation],
      theme          : [THTransform, THTransform],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [51, 25],
      center         : [HEART, GCENTER],
      type           : [TCentering, TProjected],
      quarter        : [QInitiate, QInitiate],
      theme          : [THMind, THMind],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   // Understanding (Logic) Circuit, Sharing
   {
      gates          : [52, 9],
      center         : [ROOT, SACRAL],
      type           : [TUnderstanding, TGenerated],
      quarter        : [QCivil, QMutation],
      theme          : [THForm, THTransform],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [5, 15],
      center         : [SACRAL, GCENTER],
      type           : [TUnderstanding, TGenerated],
      quarter        : [QMutation, QCivil],
      theme          : [THTransform, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [7, 31],
      center         : [GCENTER, THROAT],
      type           : [TUnderstanding, TProjected],
      quarter        : [QDuality, QCivil],
      theme          : [THBonding, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [58, 18],
      center         : [ROOT, SPLEEN],
      type           : [TUnderstanding, TProjected],
      quarter        : [QMutation, QDuality],
      theme          : [THTransform, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [48, 16],
      center         : [SPLEEN, THROAT],
      type           : [TUnderstanding, TProjected],
      quarter        : [QDuality, QCivil],
      theme          : [THBonding, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [63, 4],
      center         : [HEAD, AJNA],
      type           : [TUnderstanding, TProjected],
      quarter        : [QInitiate, QDuality],
      theme          : [THMind, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [17, 62],
      center         : [AJNA, THROAT],
      type           : [TUnderstanding, TProjected],
      quarter        : [QInitiate, QCivil],
      theme          : [THMind, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   // Sensing Circuit
   {
      gates          : [53, 42],
      center         : [ROOT, SACRAL],
      type           : [TSensing, TGenerated],
      quarter        : [QCivil, QInitiate],
      theme          : [THForm, THMind],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [29, 46],
      center         : [SACRAL, GCENTER],
      type           : [TSensing, TGenerated],
      quarter        : [QDuality, QDuality],
      theme          : [THDuality, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [13, 33],
      center         : [GCENTER, THROAT],
      type           : [TSensing, TProjected],
      quarter        : [QInitiate, QCivil],
      theme          : [THMind, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [41, 30],
      center         : [ROOT, SOLAR],
      type           : [TSensing, TProjected],
      quarter        : [QMutation, QInitiate],
      theme          : [THTransform, THMind],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [36, 35],
      center         : [SOLAR, THROAT],
      type           : [TSensing, TManifested],
      quarter        : [QInitiate, QCivil],
      theme          : [THMind, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [64, 47],
      center         : [HEAD, AJNA],
      type           : [TSensing, TProjected],
      quarter        : [QDuality, QDuality],
      theme          : [THBonding, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [11, 56],
      center         : [AJNA, THROAT],
      type           : [TSensing, TProjected],
      quarter        : [QMutation, QCivil],
      theme          : [THTransform, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   // Trribal Defense Circuit
   {
      gates          : [59, 6],
      center         : [SACRAL, SOLAR],
      type           : [TDefense, TGenerated],
      quarter        : [QDuality, QDuality],
      theme          : [THBonding, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [27, 50],
      center         : [SACRAL, SPLEEN],
      type           : [TDefense, TGenerated],
      quarter        : [QInitiate, QDuality],
      theme          : [THMind, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   // Tribal Ego CCircuit
   {
      gates          : [54, 32],
      center         : [ROOT, SPLEEN],
      type           : [THeart, TProjected],
      quarter        : [QMutation, QDuality],
      theme          : [THTransform, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [44, 26],
      center         : [SPLEEN, HEART],
      type           : [THeart, TProjected],
      quarter        : [QDuality, QMutation],
      theme          : [THBonding, THTransform],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [19, 49],
      center         : [ROOT, SOLAR],
      type           : [THeart, TProjected],
      quarter        : [QMutation, QInitiate],
      theme          : [THTransform, THMind],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [37, 40],
      center         : [SOLAR, HEART],
      type           : [THeart, TProjected],
      quarter        : [QInitiate, QDuality],
      theme          : [THMind, THBonding],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   },
   {
      gates          : [21, 45],
      center         : [HEART, THROAT],
      type           : [THeart, TManifested],
      quarter        : [QInitiate, QCivil],
      theme          : [THMind, THForm],
      aspect         : null,
      signs          : [],
      conscious      : [],
      elements       : [],
      modes          : [],
      rulers         : [],
      esoteric_rulers: []
   }
]

// TODO: 記得改回來
//const PORT    = 12345
//const BASEURL = "http://localhost"
const PORT    = 80
const BASEURL = "http://yesdesign.dynu.net"


function prettyPrint(obj, level = 0) {
   for (let label in obj) {
      let _value = obj[label]
      if (_.isArray(_value)) {
         Log.l(_.repeat('\t', level) + label + ":", _value)
      } else if (typeof (_value) === 'object') {
         Log.l(_.repeat('\t', level) + label + ":")
         prettyPrint(_value, level + 1)
      } else {
         Log.l(_.repeat('\t', level) + label + ":", _value)
      }
   }
}
export function printGateInfo(data) {
   function readable(s) {
      return Math.floor(Number(s) * 100) / 100
   }
   
   function getGateInfo(info) {
      let gate = readable(info.gate), line = readable(info.line), color = readable(info.color),
          tone                                                          = readable(info.color)
      return `gate:${gate}, line:${line}, color:${color}, tone:${tone}`
   }
   
   let d1    = `Personality(${data.zodiacInfo.Observer.date}) planets and asteroids:\n`
   let d2    = `\nDesign(${data.designZodiac.Observer.date})  planets and asteroids:\n`
   let pc    = data.zodiacInfo
   let dc    = data.designZodiac
   let cross = `Incarnation Cross:
        Personality:
            (Sun)     ${getGateInfo(pc.Sun.gateInfo)}
            (Earth)   ${getGateInfo(pc.Earth.gateInfo)}
        Design:
            (Sun)     ${getGateInfo(dc.Sun.gateInfo)}
            (Earth)   ${getGateInfo(dc.Earth.gateInfo)}\n\n`
   
   _.forEach(data.zodiacInfo, (v, k) => {
      d1 += `\t(${k})\n`
      _.forEach(v, (v2, k2) => {
         if (k2 === 'sign') d1 += `\t\t${k2}:\t${v2}\n`
         if (k2 === 'gateInfo') {
            _.forEach(v2, (v3, k3) => {
               if (_.includes(["gate", "line", "color", "tone"], k3)) d1 += `\t\t${k3}:\t${v3}\n`
            })
         }
      })
      switch (k) {
         case 'Observer':
            d1 += `\t\tdate:\t${v.date}\n`
            d1 += `\t\tlat:\t${v.lat}\n`
            d1 += `\t\tlon:\t${v.lon}\n`
            break
         case 'sunrise':
         case 'sunset':
            d1 += `\t\ttime:\t${v.time}\n`
            d1 += `\t\tdaylong:\t${v.daylong}\n`
            d1 += `\t\tnightlong:\t${v.nightlong}\n`
            break
      }
   })
   _.forEach(data.designZodiac, (v, k) => {
      d2 += `\t(${k})\n`
      _.forEach(v, (v2, k2) => {
         if (k2 === 'sign') d2 += `\t\t${k2}:\t${v2}\n`
         if (k2 === 'gateInfo') {
            _.forEach(v2, (v3, k3) => {
               if (_.includes(["gate", "line", "color", "tone"], k3)) d2 += `\t\t${k3}:\t${v3}\n`
            })
         }
      })
      switch (k) {
         case 'Observer':
            d2 += `\t\tdate:\t${v.date}\n`
            d2 += `\t\tlat:\t${v.lat}\n`
            d2 += `\t\tlon:\t${v.lon}\n`
            break
         case 'sunrise':
         case 'sunset':
            d2 += `\t\ttime:\t${v.time}\n`
            d2 += `\t\tdaylong:\t${v.daylong}\n`
            d2 += `\t\tnightlong:\t${v.nightlong}\n`
            break
      }
   })
   let lineOrdered = data.lineOrderedGates
   let plist       = '', dlist = ''
   _.forEach(lineOrdered.personality, (v, k) => {
      plist += `\n\t\tline${k}:`
      plist += '\t' + v.map((x) => x.gate).join(', ')
   })
   _.forEach(lineOrdered.design, (v, k) => {
      dlist += `\n\t\tline${k}:`
      dlist += '\t' + v.map((x) => x.gate).join(', ')
   })
   d2 += '\n---------------------------------------------------\n'
   d2 += '\tsix hexagrams statistics includes asteroid         '
   d2 += `
         Personality:
            ${plist}
         Design:
            ${dlist}
   `
   Log.l(data)
   return cross + d1 + d2
}


// ----------------------------------------------------
//              Astro to Gates, Gates to Astro sign converter
export function getGatesByCenter(center) {
   let chs    = getChannelsByCenter(center)
   let result = chs.map((e) => { return e.gates[e.center.indexOf(center)] })
   return _.uniq(result)
}
export function getChannelsByCenter(center) {
   return channelsData.filter((e) => { return e.center.indexOf(center) !== -1 })
}

export function getChannelsByAspects(fn) {
   return channelsData.filter((e) => { return fn(e.aspect) })
}

export function getChannelInfoByGate(gate_num) {
   // filter channels with gate
   return channelsData.filter((e) => { return e.gates.indexOf(gate_num) !== -1 })
}
export function getAstroAspectByGates(g1, g2) {
   let a1 = gates_in_serial.indexOf(g1),
       a2 = gates_in_serial.indexOf(g2)
   return Math.abs(a2 - a1) * gate_span
}


function getDecimal(a) {
   return a - parseInt(a)
}

function within(n, a, b) {
   let _n = Math.abs(n)
   return _n >= a && _n <= b
}

function getAspect(n) {
   return n <= 180 ? n : -180 - (180 - n)
}
function isUnion(a, b) {
   let l = _.union(a, b).length
   return l >= a.length && l <= a.length + b.length - 1
   // return _.union(a, b).length > a.length + b.length -1
}

// log(isUnion([1,2],[3,4]))
// log(isUnion([1,2],[2]))
// log(isUnion([1,2],[2,3]))
// log(isUnion([1,2],[2,1]))
// ----------------------------------------------------
//              UI data manipulator
function getCenterColors(centers) {
   return centers.map((e) => { return colorMap[e] })
}
function getAstroColors(astro) {
   return astro.map((e) => { return colorMap[e] })
}

// ----------------------------------------------------------------------
//        get Gates by astroSign, astroRuler, astroMode, astroAspect

export function getGatesRelatedToCenter(center, fn) {
   return _.uniq(_.flatten(channelsData.filter((rec) => {
      if (rec.center.map((e) => { return e.toLowerCase() }).indexOf(center) !== -1) {
         return fn(rec)
      }
   }).map((e) => { return e.gates })))
}

export function getGatesByAstroSign(gate_astro_map, sign) {
   return _.keys(_.omitBy(gate_astro_map, (e) => {
      if (_.isArray(e)) return e.indexOf(sign) === -1
      return e !== sign
   }))
}

export function getGatesByCenters(centers) {
   let channels = channelsData.filter((e) => {
      let lowerctr = e.center.map((a) => { return a.toLowerCase() })
      let l        = _.union(lowerctr, centers).length
      return l >= centers.length && l <= 2
   })
   return _.flatten(channels.map((e) => { return e.gates }))
}

export function getGatesInfoByCenters(centers) {
   let channels = channelsData.filter((e) => {
      let lowerctr = e.center.map((a) => { return a.toLowerCase() })
      let l        = _.union(lowerctr, centers).length
      return l >= centers.length && l <= 2
   })
   return _.flatten(channels.map((e) => { return e.gates })).map((e) => { return gatesData[e - 1] })
}

export function getGatesInfoByAstroSign(center, sign) {
   let ret = []
   gatesData.map((rec) => {
      if (rec.signs.indexOf(sign) !== -1) {
         if (rec.center.toLowerCase() === center) {
            ret.push(rec)
         }
      }
   })
   return ret
}

export function getGatesByRuler(gate_astro, ruler) {
   let _gate_ruler = _.mapValues(gate_astro, (astro) => {
      if (astro.length === 1) return astroRulers_ch[astro[0]]
      return _.uniq(_.flatten([astroRulers_ch[astro[0]], astroRulers_ch[astro[1]]]))
   })
   return _.keys(_.omitBy(_gate_ruler, (_rulers) => {
      if (_.isArray(_rulers)) return _rulers.indexOf(ruler) === -1
      return _rulers !== ruler
   }))
}

export function getGatesInfoByRuler(center, ruler) {
   let ret    = [],
       astros = rulerAstroMap.long[ruler]
   gatesData.map((rec) => {
      if (rec.center.toLowerCase() === center) {
         if (isUnion(rec.signs, astros)) ret.push(rec)
         // if (_.union(rec.signs, astros).length <= astros.length) ret.push(rec)
      }
   })
   return ret
}

export function getAstroModeByGate(gate_num) {
   let signs
   signs = getAstroSignByGate(gate_num)
   
   return signs.map((e) => {return astroModeMap.long[e]})
}

export function getGatesByAstroMode(gate_astro, mode) {
   let astros = astroModes[mode].long
   return _.keys(_.omitBy(gate_astro, (astro) => {
      return !isUnion(astros, astro)
      // return _.union(astros, astro).length > astros.length + astro.length -1
   }))
}

export function getGatesInfoByAstroMode(center, mode) {
   let astros = astroModes[mode].long,
       ret    = []
   gatesData.map((rec) => {
      if (rec.center.toLowerCase() === center) {
         if (isUnion(rec.signs, astros)) ret.push(rec)
         // if ( _.union(rec.signs, astros).length <= astros.length + rec.signs.length - 1 ){
         //     ret.push(rec)
         // }
      }
   })
   return ret
}


export function getGatesByAstroElements(gate_astro, elt) {
   let astros = astroElements[elt].long
   return _.keys(_.omitBy(gate_astro, (astro) => {
      return !isUnion(astros, astro)
   }))
}


export function getGatesInfoByAstroElement(center, elt) {
   let astros = astroElements[elt].long,
       ret    = []
   gatesData.map((rec) => {
      if (rec.center.toLowerCase() === center) {
         if (isUnion(rec.signs, astros)) {
            ret.push(rec)
         }
         // if ( _.union(rec.signs, astros).length <= astros.length ){
         //     ret.push(rec)
         // }
      }
   })
   return ret
}


export function getGatesByAstroAspects(center, aspect_name) {
   let data = aspectChannelsMap[aspect_name], ret = []
   data.map((rec) => {
      let id = rec.center.map((e) => { return e.toLowerCase() }).indexOf(center)
      if (id !== -1) ret.push(rec.gates[id])
   })
   return ret
}

export function getGatesInfoByAstroAspects(center, aspect_name) {
   return getGatesByAstroAspects(center, aspect_name)
}
//NOTE:                                                                     :
//NOTE: astro sign mapping to hd gates                                      :
export function getAstroSignByGate(_gate_number) {
   let gate       = Number(_gate_number.toString().split('.')[0])
   let line       = Number(_gate_number.toString().split('.')[1]) || 0
   let gate_index = gates_in_serial.indexOf(gate)
   let astro_span = gate_index / gates_per_house + (line / 6) / gates_per_house
   let astro_num  = (5 + astro_span) % 12 + 1
   // astro_sign  = astro_signs[parseInt(astro_num) - 1],
   let shiftness  = getDecimal(astro_span) > (1 - 1 / gates_per_house) ? 1 - getDecimal(astro_span) : 0
   let result     = shiftness === -0
      ? [astro_signs[parseInt(astro_num) - 1]]
      : [astro_signs[parseInt(astro_num) - 1], astro_signs[parseInt(astro_num) % 12]]
   return result
}

export function getAstroRulerByGate(gate_num) {
   let signs = getAstroSignByGate(gate_num)
   return signs.map((e) => { return astroRulerMap.long[e] })
}

export function getElementByGate(gate_num) {
   let signs = getAstroSignByGate(gate_num)
   return signs.map((e) => { return astroElementMap.long[e] })
}

function getGateInfoByAstroNo(astro_sign_number = 2, degree = 0) {
   if (degree < 0) {
      astro_sign_number -= 1
      degree = 30 + Number(degree)
   }
   let astro_div        = lbound_house - (astro_sign_number - 1)
   let gates            = Math.abs(gates_per_house * astro_div - degree / gate_span)
   let direction        = astro_div > 0 ? 1 : -1
   let shiftment        = astro_div > 0 ? 1 - (gates - parseInt(gates)) : gates - parseInt(gates)
   let shiftment_degree = shiftment * gate_span
   // let shiftment_arc = parseInt(shiftment_degree) + getDecimal(shiftment_degree) * 0.6
   let gate             = direction > 0 ? gates_in_serial[gates_in_serial.length - parseInt(gates + 1)] : gates_in_serial[parseInt(Math.abs(gates))]
   let line             = shiftment / (1 / 6) + 1
   let color            = getDecimal(line) / (1 / 6) + 1
   let tone             = getDecimal(color) / (1 / 6) + 1
   let base             = getDecimal(tone) / (1 / 5)
   return `{"sign": "${astro_signs[astro_sign_number - 1]}", "degree":"${degree}", "gate":"${gate + getDecimal(gates)}", "line":"${line}", "tone":"${tone}", "color":"${color}"}`
}


// ----------------
//           data:
//           astro signs in serial => arrange zodiac signs in serial
//           gates_astro_map       => iching gates map to zodiac signs
//           gatesData             => iching gates ordered by gates' number'
const astro_in_iching_serial = gates_in_serial.map((e) => { return getAstroSignByGate(e) })
const gates_astro_map        = _.zipObject(gates_in_serial, astro_in_iching_serial)
_.forEach(channelsData, (e) => {
   e.aspect   = getAspect(getAstroAspectByGates(e.gates[0], e.gates[1]))
   e.signs    = [gates_astro_map[e.gates[0]], gates_astro_map[e.gates[1]]]
   // TODO:  esoteric_rulers
   e.modes    = [getAstroModeByGate(e.gates[0]), getAstroModeByGate(e.gates[1])]
   e.rulers   = [getAstroRulerByGate(e.gates[0]), getAstroRulerByGate(e.gates[1])]
   e.elements = [getElementByGate(e.gates[0]), getElementByGate(e.gates[1])]
})

export const gatesData = []

_.forEach(channelsData, (e) => {
   if (e === undefined) throw Error('uncaught Exception')
   gatesData[Number(e.gates[0]) - 1] = {
      center  : e.center[0],
      type    : e.type,
      quarter : e.quarter[0],
      theme   : e.theme[0],
      aspect  : e.aspect,
      signs   : e.signs[0],
      modes   : e.signs[0].map((s) => { return astroModeMap.long[s] }),
      rulers  : e.signs[0].map((s) => { return astroRulerMap.long[s] }),
      elements: e.signs[0].map((s) => { return astroElementMap.long[s] })
   }
   gatesData[Number(e.gates[1]) - 1] = {
      center  : e.center[1],
      type    : e.type,
      quarter : e.quarter[1],
      theme   : e.theme[1],
      aspect  : e.aspect,
      signs   : e.signs[1],
      modes   : e.signs[1].map((s) => { return astroModeMap.long[s] }),
      rulers  : e.signs[1].map((s) => { return astroRulerMap.long[s] }),
      elements: e.signs[1].map((s) => { return astroElementMap.long[s] })
   }
})


// ------------------------------------------------------------------------------
//     Calculate aspects between two gates composed of one of 36 channels
export function getSemisquareChannels() {
   return getChannelsByAspects((a) => { return within(a, 43, 47) || within(a, -47, -43) || within(a, 133, 137) || within(a, -137, -133) })
}
export function getSquareChannels() {
   return getChannelsByAspects((a) => { return within(a, 84, 96) || within(a, -96, -84) })
}
export function getOppositionChannels() {
   return getChannelsByAspects((a) => { return within(a, 174, 180) || within(a, -179, -174) })
}
export function getSemisextileChannels() {
   return getChannelsByAspects((a) => { return within(a, 28, 32) || within(a, 118, 122) || within(a, -32, -28) || within(a, -122, -118) })
}
export function getSextileChannels() {
   return getChannelsByAspects((a) => { return within(a, 54, 66) || within(a, 144, 156) || within(a, -66, -54) || within(a, -156, -144) })
}
export function getTrineChannels() {
   return getChannelsByAspects((a) => { return within(a, 114, 126) || within(a, -126, -114) })
}
export function getConjunctionChannels() {
   return getChannelsByAspects((a) => { return within(a, 0, 9) || within(a, -9, 0) })
}
function countByCenter(ch, center) {
   return _.countBy(ch, (e) => { return e.center.indexOf(center) !== -1 }).true || 0
}


function filterByExcludes(data, excludes = ['sunrise', 'sunset']) {
   let counter = 0, hasSunRiseSet = false, notSunRiseSet
   let count   = (list) => {
      for (let gates of list) {
         for (let gate of gates) {
            if (gate) {
               notSunRiseSet = excludes.indexOf(gate.ruler) === -1
               if (notSunRiseSet) {
                  counter++
               } else {
                  hasSunRiseSet = true
               }
            }
         }
      }
   }
   return data.filter((e) => {
      counter       = 0
      hasSunRiseSet = false
      count(e.conscious.p)
      if (counter === 0 && hasSunRiseSet) return false
      if (counter >= 2 && e.conscious.p.length >= 2) return true
      counter = 1
      count(e.conscious.d)
      return counter >= 2
   })
}



// --------------------------------------------
// NOte:         HD gates and astrology data parser
export class HDnAstroParser{

}

// -------------------------------------------
// NOTE:         Horoscope Fetcher

export class RawHoroscope {
   constructor(date = "1981/12/30 1:55", city = 'Taipei') {
      let _date = this.assertDate(date)
      if (!_date) {
         console.error('null hd')
         return null
      }
      const baseUrl        = BASEURL + ':' + PORT + "/api?year="
      // const baseUrl      = "http://localhost:12345/api?year="
      city = encodeURIComponent(city)
      this.url             = `${baseUrl}${_date[0]}&month=${_date[1]}&day=${_date[2]}&time=${_date[3]}&city=${city}`
      this.zodiacInfo      = {}
      this.designZodiac    = {}
      this.personalityHD   = {}
      this.designHD        = {}
      this.channelsInfo    = []
      this.personalGates   = {}
      this.designGates     = {}
      this.channelsData    = []
      this.singleGateData  = []
      this.nonSingleGates  = []
      this.nextGateData    = []
      this.lineOrderedGates = {}
      this.rulerOrderedGates = {}
      this.parsedQueryData = {}
      this.p_sunrise       = null
      this.p_sunset        = null
      this.d_sunrise       = null
      this.d_sunset        = null
      
      let DB = new LocalDataBase("birthCache")
      this.getDB = () => DB
      return this
   }
   
   assertDate(date) {
      date        = date.trim()
      let _detime = date.split(' '), year, month, day
      if (_detime.length > 2)                   return
      year  = _detime[0].split('/')[0]
      month = _detime[0].split('/')[1]
      day   = _detime[0].split('/')[2]
      if (!day) return
      return [year, month, day, _detime[1] || "00:00"]
   }
   
   
   fetch(success_cb, failed_cb, url = this.url) {
      let self = this
      Log.l('fetch:', url)
      let loc = url.trim()
      let DB = this.getDB()
      if (url in DB){
         let response =  DB[url]
         Log.l('fetched form localdb res:',response)
         self.parseData(response)
         response.status = 'cached'
         success_cb(self, response.status)
         return
      }
      try{
         fetch(loc).then(function(response){
            if (response.ok){
               let ret = response.json()
               ret.status = 'ok'
               return ret
            }else{
               failed_cb(response)
               throw new Error('error to fetch url:' + url)
            }
         }).then(function(response){
            Log.l('fetched res:', response)
            DB[url] = response
            self.parseData(response)
            success_cb(self, response.status)
         }).catch(function(error){
            console.error(error)
            failed_cb(error)
         })
      } catch(e){
         console.error(e)
         failed_cb()
      }
      
      
   }
   
   genSortGatesByIChingLine() {
      function proc(data, ret) {
         _.forEach(data, (e) => {
            let lino = parseInt(e.gateInfo.line)
            ret[lino].push(e)
         })
         return ret
      }
      function reset(obj){
         if (!_.isEmpty(obj)){
            _.forEach(['personality', 'design'], (v)=>{
               _.forEach(obj[v], (v2, k2)=>{
                  obj[v][k2] = []
               })
            })
         }else{
            obj.personality = {'1': [], '2': [], '3': [], '4': [], '5': [], '6': []}
            obj.design = {'1': [], '2': [], '3': [], '4': [], '5': [], '6': []}
         }
      }
      reset(this.lineOrderedGates)
      proc(this.personalGates, this.lineOrderedGates.personality)
      proc(this.designGates, this.lineOrderedGates.design)
   }
   
   genSortGatesByRuler() {
      let result = {personality: {}, design: {}}
   
      function proc(data, ret) {
         _.forEach(data, (e) => {
            let ruler = e.ruler
            let gate = `${e.gate}.${parseInt(e.gateInfo.line)}`
            if(ret[ruler]) {
               ret[ruler].push(gate)
            }else{
               ret[ruler] = [gate]
            }
         })
       
      }
   
      function reset(obj){
         if (!_.isEmpty(obj)){
            _.forEach(['personality', 'design'], (v)=>{
               _.forEach(obj[v], (v2, k2)=>{
                  obj[v][k2] = []
               })
            })
         }else{
            _.forEach(['personality', 'design'], (v)=>{
               obj[v] = {
                  Sun    : [],
                  Earth  : [],
                  Moon   : [],
                  Venus  : [],
                  Mercury: [],
                  Mars   : [],
                  Jupiter: [],
                  Saturn : [],
                  Uranus : [],
                  Neptune: [],
                  Pluto  : [],
                  North  : [],
                  South  : [],
                  // asteroid
                  Ceres  : [],
                  Juno   : [],
                  Pallas : [],
                  Vesta  : [],
                  Chiron : [],
               }
            })
         }
      }
      reset(this.rulerOrderedGates)
      proc(this.personalGates, this.rulerOrderedGates.personality)
      proc(this.designGates, this.rulerOrderedGates.design)
   }
   
   parseChannels() {
      let personality  = this.zodiacInfo
      let design       = this.designZodiac
      let person_gates = this.personalGates = _.toPairs(personality).map((e) => {
         if (e[0] === "Observer") return
         return {
            conscious: 'personality',
            ruler    : e[0],
            gate     : parseInt(e[1].gateInfo.gate),
            sign     : e[1].sign,
            sign_no  : e[1].sign_no,
            gateInfo : e[1].gateInfo
         }
      }).filter((e) => { return e !== undefined })
      
      let design_gates = this.designGates = _.toPairs(design).map((e) => {
         if (e[0] === "Observer") return
         return {
            conscious: 'design',
            ruler    : e[0],
            gate     : parseInt(e[1].gateInfo.gate),
            sign     : e[1].sign,
            sign_no  : e[1].sign_no,
            gateInfo : e[1].gateInfo
         }
      }).filter((e) => { return e !== undefined })
      
      let nonSingleGate = []
      let push          = (a, b) => {
         a.push(b)
      }
      this.p_sunrise    = this.personalGates.find((x) => x.ruler === 'sunrise')
      this.p_sunset     = this.personalGates.find((x) => x.ruler === 'sunset')
      this.d_sunrise    = this.designGates.find((x) => x.ruler === 'sunrise')
      this.d_sunset     = this.designGates.find((x) => x.ruler === 'sunset')
      
      
      for (let e of channelsData) {
         let conscious = {p: [[], []], d: [[], []]}
         for (let rec of person_gates) {
            if (rec.gate === e.gates[0]) push(conscious.p[0], rec)
            if (rec.gate === e.gates[1]) push(conscious.p[1], rec)
         }
         for (let rec of design_gates) {
            if (rec.gate === e.gates[0]) push(conscious.d[0], rec)
            if (rec.gate === e.gates[1]) push(conscious.d[1], rec)
         }
         
         e.conscious = conscious
         if ((conscious.p[0].length !== 0 || conscious.d[0].length !== 0) && (conscious.p[1].length !== 0 || conscious.d[1].length !== 0)) {
            this.channelsData.push(e)
            nonSingleGate.push(e.gates[0])
            nonSingleGate.push(e.gates[1])
         } else {
            this.singleGateData.push(e)
         }
      }
      this.channelsData  = filterByExcludes(this.channelsData)
      this.personalGates = this.personalGates.filter((e) => ['sunrise', 'sunset'].indexOf(e.ruler) === -1)
      this.designGates   = this.designGates.filter((e) => ['sunrise', 'sunset'].indexOf(e.ruler) === -1)
      
      this.nonSingleGates = Array.from(new Set(nonSingleGate))
      this.singleGateData = this.singleGateData.filter((e) =>
         !isUnion(this.nonSingleGates, e.gates)
         && !((e.conscious.p[0].length === 0 && e.conscious.d[0].length === 0) && (e.conscious.p[1].length === 0 && e.conscious.d[1].length === 0)
            && ['sunrise', 'sunset'].indexOf(e.ruler) === -1
         )
      )
      // TODO: implementation.... 六爻的下一閘門, the six line always looking for the next gate
      this.nextGateData   = null
   }
   
   mapValue(data) {
      // FIXME: may be buggy ?? 似乎只能用div來修正偏移量，有更好的做法嗎？
      let div    = 0.13505529068019317, _result, _readable_sign, _no, _gate, _ret = {}
      let result = _.mapValues(data, (value, key) => {
         if (['Observer', 'sunrise', 'sunset'].indexOf(key) !== -1) {
            _ret = _.fromPairs(value.split(',').map((x) => _.lsplit(x.trim(), ':')))
            if (key === 'Observer') {
               return _ret
            } else {
               _result   = _ret.sign.split('-')
               _ret.sign = _readable_sign = shortToLongMap[_result[0].toLowerCase()]
            }
         } else {
            _result        = value.split('-')
            _readable_sign = shortToLongMap[_result[0].toLowerCase()]
         }
         _no   = readableZodiacSigns.indexOf(_readable_sign) + 1
         // eval('gate = ' + getGateInfoByAstroNo( no , _result[1] - div ))
         _gate = JSON.parse(getGateInfoByAstroNo(_no, _result[1] - div))
         
         return _.extend({
            sign    : _readable_sign,
            degree  : _result[1] - div,
            minutes : _result[2],
            sign_no : _no,
            gateInfo: _gate,
            //NOTE: 轉換成 —— 下降點 180，天頂90，上昇0，天底270
            eclipse : (12 - ZODIAC.indexOf(_readable_sign.slice(0,-2))) * 30 - parseFloat(_result[1] - div)
         }, _ret)
      })
      
      _no             = result.Sun.sign_no - 6 > 0 ? result.Sun.sign_no - 6 : result.Sun.sign_no + 6
      // eval('gate='+ getGateInfoByAstroNo( sign_no , result.Sun.degree ))
      _gate           = JSON.parse(getGateInfoByAstroNo(_no, result.Sun.degree))
      result['Earth'] = {
         sign    : readableZodiacSigns[_no - 1],
         degree  : result.Sun.degree,
         minutes : result.Sun.minutes,
         sign_no : _no,
         gateInfo: _gate,
         eclipse :  (12 - ZODIAC.indexOf(readableZodiacSigns[_no - 1].slice(0,-2))) * 30  - parseFloat(result.Sun.degree)
      }
      
      return result
   }
   
   parseData(data) {
      let result = JSON.parse(data.astro)
      Log.l(result)
      this.zodiacInfo       = this.mapValue(result.personality)
      this.designZodiac     = this.mapValue(result.design)
      this.channelsInfo     = this.parseChannels()
      this.genSortGatesByIChingLine()
      this.genSortGatesByRuler()
   }
}


// NOTE:       Human design Graphics Utility            ;

class GraphicIdentity {
   constructor(planet:string, gate:number, visibility:boolean, weight:number, linked_channels:[number, number][]){
      this.planet = planlet
      this.gate = gate
      this.visibility = visibility
      this.weight = weight
      this.linked_channels = linked_channels
   }
}








// ----------------------------------------------------------------------------
// NOTE:                   statistc  utils
function countBySigns(ch, sign) {
   let acc = 0, ret
   ret     = _.countBy(ch, (e) => {
      let _signs = _.flatten(e.signs)
      if (_signs.indexOf(sign) !== -1) {
         acc += _.countBy(_signs)[sign] - 1
         return true
      } else {
         return false
      }
   })
   if (acc) ret.true += acc
   return ret.true || 0
}
function countZodiacAspect(gates_astro_map) {
   let gates = _.keys(gates_astro_map)
   let signs = _.uniq(_.flatten(_.values(gates_astro_map)))
   let ret   = _.zipObject(signs, signs.map(() => { return [] }))
   _.forEach(gates, (e) => {
      let _data  = gatesData[Number(e) - 1]
      let _signs = _data.signs
      if (_signs.length > 1) {
         _signs.map((e) => { ret[e].push(_data.aspect) })
      } else {
         ret[_signs[0]].push(_data.aspect)
      }
   })
   _.forEach(ret, (v, k) => {
      ret[k] = _.countBy(v)
   })
   return ret
}

function countZodiacModes(data) {
   let cardinals = 0, fixeds = 0, mutations = 0
   let result    = _.countBy(_.keys(data), (sign) => {
      if (sCARDINALS.indexOf(sign) !== -1 && data[sign] !== 0) {
         cardinals += (data[sign] - 1)
         return "cardinal"
      }
      if (sFIXEDS.indexOf(sign) !== -1 && data[sign] !== 0) {
         fixeds += (data[sign] - 1)
         return "fixed"
      }
      if (sMUTATIONS.indexOf(sign) !== -1 && data[sign] !== 0) {
         mutations += (data[sign] - 1)
         return "mutation"
      }
   })
   delete result.undefined
   if (cardinals) result.cardinal += cardinals
   if (fixeds) result.fixed += fixeds
   if (mutations) result.mutation += mutations
   return result
}

function countZodiacRuler(data, ruler) {
   let ret = {
      sun       : 0,
      moon      : 0,
      venus     : 0,
      merrcurius: 0,
      earth     : 0,
      mars      : 0,
      jupyter   : 0,
      saturn    : 0,
      uranus    : 0,
      neptune   : 0,
      pluto     : 0
   }
   _.keys(data).map((e) => {
      let r = ruler[e]
      if (data[e]) {
         if (_.isArray(r)) {
            r.map((n) => { ret[n] += data[e] })
         } else {
            ret[r] += data[e]
         }
      }
      return ruler[e]
   })
   return _.omitBy(ret, (e) => { return e === 0 })
}
function countZodiacElements(data) {
   let waters = 0, earths = 0, winds = 0, fires = 0
   let result = _.countBy(_.keys(data), (sign) => {
      if (sWATER.indexOf(sign) !== -1 && data[sign] !== 0) {
         waters += (data[sign] - 1)
         return "water"
      }
      if (sEARTH.indexOf(sign) !== -1 && data[sign] !== 0) {
         earths += (data[sign] - 1)
         return "earth"
      }
      if (sWIND.indexOf(sign) !== -1 && data[sign] !== 0) {
         winds += (data[sign] - 1)
         return "wind"
      }
      if (sFIRE.indexOf(sign) !== -1 && data[sign] !== 0) {
         fires += (data[sign] - 1)
         return "fire"
      }
   })
   if (waters) result.water += waters
   if (earths) result.earth += earths
   if (winds) result.wind += winds
   if (fires) result.fire += fires
   
   delete result.undefined
   return result
}


function signsStatistic(signs) {
   let ret            = {}
   let signs_counts   = _.countBy(_.flatten(signs))
   let signs_inshort  = _.mapKeys(signs_counts, (value, key) => {
      return readableNameMap[key]
   })
   ret.astroSigns     = signs_counts
   ret.zodiacModes    = countZodiacModes(signs_inshort)
   ret.zodiacElements = countZodiacElements(signs_inshort)
   ret.astroRuler     = countZodiacRuler(signs_inshort, astroRulerMap.short)
   return ret
}

function aspectStatistic(data) {
   let square       = data.filter((e) => { return squareChannels.indexOf(e) !== -1 }),
       semisquare   = data.filter((e) => { return semisquareChannels.indexOf(e) !== -1 }),
       opposition   = data.filter((e) => { return oppositionChannels.indexOf(e) !== -1 }),
       conjunction  = data.filter((e) => { return conjunctionChannels.indexOf(e) !== -1 }),
       trine        = data.filter((e) => { return trineChannels.indexOf(e) !== -1 }),
       sextiles     = data.filter((e) => { return sextileChannels.indexOf(e) !== -1 }),
       semisextiles = data.filter((e) => { return semisextileChannels.indexOf(e) !== -1 }),
       rest         = _.difference(data, square.concat(semisquare, opposition, conjunction, trine, sextiles, semisextiles)),
       others       = _.countBy(rest.map((e) => { return Math.abs(e.aspect) })),
       ret          = {
          conjunction: conjunction.length,
          semisquare : semisquare.length,
          sextile    : sextiles.length,
          semisextile: semisextiles.length,
          square     : square.length,
          trine      : trine.length,
          opposition : opposition.length,
          others     : others
       }
   return _.omitBy(ret, (e) => { return e === 0 })
}
function channelStatics(ch, extra = "") {
   let sacral     = countByCenter(ch, SACRAL),
       root       = countByCenter(ch, ROOT),
       spleen     = countByCenter(ch, SPLEEN),
       solar      = countByCenter(ch, SOLAR),
       heart      = countByCenter(ch, HEART),
       gcenter    = countByCenter(ch, GCENTER),
       throat     = countByCenter(ch, THROAT),
       ajna       = countByCenter(ch, AJNA),
       head       = countByCenter(ch, HEAD),
   
       aries      = countBySigns(ch, astro_signs[0]),
       torus      = countBySigns(ch, astro_signs[1]),
       gemini     = countBySigns(ch, astro_signs[2]),
       cancer     = countBySigns(ch, astro_signs[3]),
       lion       = countBySigns(ch, astro_signs[4]),
       virgo      = countBySigns(ch, astro_signs[5]),
       libra      = countBySigns(ch, astro_signs[6]),
       scorpio    = countBySigns(ch, astro_signs[7]),
       sagitarius = countBySigns(ch, astro_signs[8]),
       capricon   = countBySigns(ch, astro_signs[9]),
       aquarius   = countBySigns(ch, astro_signs[10]),
       pices      = countBySigns(ch, astro_signs[11])
   
   let _result           = {
          centers   : {
             sacral : sacral,
             root   : root,
             spleen : spleen,
             solar  : solar,
             heart  : heart,
             gcenter: gcenter,
             throat : throat,
             ajna   : ajna,
             head   : head
          },
          astroSigns: {
             aries     : aries,
             torus     : torus,
             gemini    : gemini,
             cancer    : cancer,
             lion      : lion,
             virgo     : virgo,
             libra     : libra,
             scorpio   : scorpio,
             sagitarius: sagitarius,
             capricon  : capricon,
             aquarius  : aquarius,
             pices     : pices
          }
       },
       result            = {}
   result.centers        = _.omitBy(_result.centers, (v) => { return v === 0 })
   result.astroSigns     = _.omitBy(_result.astroSigns, (v) => { return v === 0 })
   result.zodiacModes    = countZodiacModes(_result.astroSigns)
   result.zodiacElements = countZodiacElements(_result.astroSigns)
   delete result.zodiacModes.undefined
   return result
}

// -----------------------------------------
//          Channels within each center
const rootChannels             = getChannelsByCenter(ROOT)
const sacralChannels           = getChannelsByCenter(SACRAL)
const spleenChannels           = getChannelsByCenter(SPLEEN)
const solarChannels            = getChannelsByCenter(SOLAR)
const heartChannels            = getChannelsByCenter(HEART)
const gcenterChannels          = getChannelsByCenter(GCENTER)
const throatChannels           = getChannelsByCenter(THROAT)
const ajnaChannels             = getChannelsByCenter(AJNA)
const headChannels             = getChannelsByCenter(HEAD)
export const centerChannelsMap = {}

// ------------------------------------------------
//          Gataes within each center
const rootGates    = getGatesByCenter(ROOT)
const sacralGates  = getGatesByCenter(SACRAL)
const spleenGates  = getGatesByCenter(SPLEEN)
const solarGates   = getGatesByCenter(SOLAR)
const heartGates   = getGatesByCenter(HEART)
const gcenterGates = getGatesByCenter(GCENTER)
const throatGates  = getGatesByCenter(THROAT)
const ajnaGates    = getGatesByCenter(AJNA)
const headGates    = getGatesByCenter(HEAD)

// ------------------------------------------------
//          Signs within each center
const rootSigns    = rootGates.map(getAstroSignByGate)
const sacralSigns  = sacralGates.map(getAstroSignByGate)
const spleenSigns  = spleenGates.map(getAstroSignByGate)
const solarSigns   = solarGates.map(getAstroSignByGate)
const heartSigns   = heartGates.map(getAstroSignByGate)
const gcenterSigns = gcenterGates.map(getAstroSignByGate)
const throatSigns  = throatGates.map(getAstroSignByGate)
const ajnaSigns    = ajnaGates.map(getAstroSignByGate)
const headSigns    = headGates.map(getAstroSignByGate)

// ----------------------------------------------------------
//          Gates to Astro mapp within each center
export const rootMap    = _.zipObject(rootGates, rootSigns)
export const sacralMap  = _.zipObject(sacralGates, sacralSigns)
export const spleenMap  = _.zipObject(spleenGates, spleenSigns)
export const solarMap   = _.zipObject(solarGates, solarSigns)
export const heartMap   = _.zipObject(heartGates, heartSigns)
export const gcenterMap = _.zipObject(gcenterGates, gcenterSigns)
export const throatMap  = _.zipObject(throatGates, throatSigns)
export const ajnaMap    = _.zipObject(ajnaGates, ajnaSigns)
export const headMap    = _.zipObject(headGates, headSigns)

// -------------------------------------------------------
//              Channels filtered by astralogical aspect
const oppositionChannels       = getOppositionChannels()
const squareChannels           = getSquareChannels()
const semisquareChannels       = getSemisquareChannels()
const trineChannels            = getTrineChannels()
const sextileChannels          = getSextileChannels()
const semisextileChannels      = getSemisextileChannels()
const conjunctionChannels      = getConjunctionChannels()
const otherChannels            = _.difference(channelsData, _.concat(oppositionChannels, squareChannels, semisquareChannels, trineChannels, sextileChannels, semisextileChannels, conjunctionChannels))
export const aspectChannelsMap = {
   opposition : oppositionChannels,
   square     : squareChannels,
   semisquare : semisquareChannels,
   trine      : trineChannels,
   sextile    : sextileChannels,
   semisextile: semisextileChannels,
   conjunction: conjunctionChannels,
   other      : otherChannels
}

// ------------------------------------------------------
//                 Data feed for UI
export const statisticRoot    = signsStatistic(rootSigns)
export const statisticSpleen  = signsStatistic(spleenSigns)
export const statisticSolar   = signsStatistic(solarSigns)
export const statisticGcenter = signsStatistic(gcenterSigns)
export const statisticHeart   = signsStatistic(heartSigns)
export const statisticThroat  = signsStatistic(throatSigns)
export const statisticAjna    = signsStatistic(ajnaSigns)
export const statisticHead    = signsStatistic(headSigns)
export const statisticSacral  = signsStatistic(sacralSigns)


// -------------------------------------------------------
//              UI Colors
const cSacral     = '#ffca2b'
const cRoot       = '#ca0005'
const cSpleen     = '#39fdc2'
const cSolar      = '#ff7c1c'
const cGcenter    = '#73ff2f'
const cHeart      = '#00bcf2'
const cThroat     = '#094dff'
const cAjna       = '#b800f4'
const cHead       = '#f400ab'
const cAries      = "#ce0005"
const cSagitarius = "#f2005b"
const cLion       = "#f2005b"
const cTorus      = "#bf8200"
const cVirgo      = "#d56e24"
const cCapricon   = "#bf9500"
const cCancer     = "#006fbf"
const cPices      = "#006fbf"
const cScorpio    = "#00acbf"
const cLibra      = "#96d217"
const cGemini     = "#8fbe01"
const cAquarius   = "#4dbf00"
const cCardinal   = cAries
const cFixed      = cCapricon
const cMutation   = cLibra
const colorMap    = {
   aries     : cAries,
   sagitarius: cSagitarius,
   lion      : cLion,
   torus     : cTorus,
   virgo     : cVirgo,
   capricon  : cCapricon,
   pices     : cPices,
   cancer    : cCancer,
   scorpio   : cScorpio,
   gemini    : cGemini,
   libra     : cLibra,
   aquarius  : cAquarius,
   cardinal  : cCardinal,
   mutation  : cMutation,
   fixed     : cFixed,
   fire      : cAries,
   earth     : cCapricon,
   water     : cPices,
   wind      : cGemini,
   saturn    : cCapricon,
   sun       : cLion,
   moon      : cCancer,
   merrcurius: cGemini,
   venus     : cTorus,
   mars      : cAries,
   jupyter   : cSagitarius,
   neptune   : cPices,
   uranus    : cAquarius,
   pluto     : cScorpio,
   sacral    : cSacral,
   root      : cRoot,
   spleen    : cSpleen,
   solar     : cSolar,
   gcenter   : cGcenter,
   heart     : cHeart,
   throat    : cThroat,
   ajna      : cAjna,
   head      : cHead
}


export const rootChannelAspectStatics    = aspectStatistic(rootChannels)
export const rootChannelStatics          = channelStatics(rootChannels)
export const sacralChannelAspectStatics  = aspectStatistic(sacralChannels)
export const sacralChannelStatics        = channelStatics(sacralChannels)
export const spleenChannelAspectStatics  = aspectStatistic(spleenChannels)
export const spleenChannelStatics        = channelStatics(spleenChannels)
export const heartChannelAspectStatics   = aspectStatistic(heartChannels)
export const heartChannelStatics         = channelStatics(heartChannels)
export const solarChannelAspectStatics   = aspectStatistic(solarChannels)
export const solarChannelStatics         = channelStatics(solarChannels)
export const gcenterChannelAspectStatics = aspectStatistic(gcenterChannels)
export const gcenterChannelStatics       = channelStatics(gcenterChannels)
export const throatChannelAspectStatics  = aspectStatistic(throatChannels)
export const throatChannelStatics        = channelStatics(throatChannels)
export const ajnaChannelAspectStatics    = aspectStatistic(ajnaChannels)
export const ajnaChannelStatics          = channelStatics(ajnaChannels)
export const headChannelAspectStatics    = aspectStatistic(headChannels)
export const headChannelStatics          = channelStatics(headChannels)
rootChannelStatics.astroAspects          = countZodiacAspect(rootMap)
sacralChannelStatics.astroAspects        = countZodiacAspect(sacralMap)
spleenChannelStatics.astroAspects        = countZodiacAspect(spleenMap)
heartChannelStatics.astroAspects         = countZodiacAspect(heartMap)
solarChannelStatics.astroAspects         = countZodiacAspect(solarMap)
gcenterChannelStatics.astroAspects       = countZodiacAspect(gcenterMap)
throatChannelStatics.astroAspects        = countZodiacAspect(throatMap)
ajnaChannelStatics.astroAspects          = countZodiacAspect(ajnaMap)
headChannelStatics.astroAspects          = countZodiacAspect(headMap)


// ---------------------------------------------
//            UI Utils

function getTooltip(tooltipItem, data) {
   var label = data.labels[tooltipItem.index]
   var all   = _.reduce(data.datasets[tooltipItem.datasetIndex].data, (sum, n) => { return sum + n }, 0)
   var val   = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
   return {label: label, all: all, val: val}
}


const dropDownOptions = [
   {
      center: ROOT.toLowerCase(),
      text  : 'RootCenter',
      value : 1,
      data  : [statisticRoot, rootMap, rootChannelAspectStatics, rootChannelStatics]
   },
   {
      center: SACRAL.toLowerCase(),
      text  : 'SacralCenter',
      value : 2,
      data  : [statisticSacral, sacralMap, sacralChannelAspectStatics, sacralChannelStatics]
   },
   {
      center: SPLEEN.toLowerCase(),
      text  : 'SpleenCenter',
      value : 3,
      data  : [statisticSpleen, spleenMap, spleenChannelAspectStatics, spleenChannelStatics]
   },
   {
      center: HEART.toLowerCase(),
      text  : 'HeartCenter',
      value : 4,
      data  : [statisticHeart, heartMap, heartChannelAspectStatics, heartChannelStatics]
   },
   {
      center: SOLAR.toLowerCase(),
      text  : 'SolarPlexus',
      value : 5,
      data  : [statisticSolar, solarMap, solarChannelAspectStatics, solarChannelStatics]
   },
   {
      center: GCENTER.toLowerCase(),
      text  : 'GCenter',
      value : 6,
      data  : [statisticGcenter, gcenterMap, gcenterChannelAspectStatics, gcenterChannelStatics]
   },
   {
      center: THROAT.toLowerCase(),
      text  : 'ThroatCenter',
      value : 7,
      data  : [statisticThroat, throatMap, throatChannelAspectStatics, throatChannelStatics]
   },
   {
      center: AJNA.toLowerCase(),
      text  : 'AjnaCenter',
      value : 8,
      data  : [statisticAjna, ajnaMap, ajnaChannelAspectStatics, ajnaChannelStatics]
   },
   {
      center: HEAD.toLowerCase(),
      text  : 'HeadCenter',
      value : 9,
      data  : [statisticHead, headMap, headChannelAspectStatics, headChannelStatics]
   },
   {center: "", text: 'Aspects Statistics', value: 9, data: []},
   //   { text: 'Root-Sacral', value   : 10 },
   //   { text: 'Root-Spleen', value   : 11 },
   //   { text: 'Root-Solar', value    : 12 },
   //   { text: 'Spleen-Throat', value : 13 },
   //   { text: 'Spleen-Sacral', value : 14 },
   //   { text: 'Spleen-Heart', value    : 15 },
   //   { text: 'Spleen-GCenter', value: 16 },
   //   { text: 'Solar-Sacral', value  : 17 },
   //   { text: 'Solar-Heart', value     : 18 },
   //   { text: 'Solar-Throat', value  : 19 },
   //   { text: 'Heart-Gcenter', value   : 20 },
   //   { text: 'Heart-Throat', value    : 21 },
   //   { text: 'Gcenter-Throat', value: 22 },
   //   { text: 'Throat-Ajna', value   : 23 },
   //   { text: 'Ajna-Head', value     : 24 }
]


var ctx1, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7, ctx8, ctx9,
    chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8, chart9


function renewChart() {
   chart1.destroy()
   chart2.destroy()
   chart3.destroy()
   chart4.destroy()
   chart5.destroy()
   chart6.destroy()
   chart7.destroy()
   chart8.destroy()
   _.forEach(document.querySelectorAll('iframe.chartjs-hidden-iframe'), (e) => {
      e.remove()
   })
}


function renderChart(inputData, inputMap, inputData2, inputData3, centerName) {
   const labelcb      = function (tooltipItem, data) {
      var label = data.labels[tooltipItem.index]
      var all   = _.reduce(data.datasets[tooltipItem.datasetIndex].data, (sum, n) => { return sum + n }, 0)
      var val   = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
      var ret   = label + ':' + val + ' (' + val / all * 100 + '%)'
      return ret
   }
   const footercb     = function (tooltipItem, data) {
      var label = data.labels[tooltipItem[0].index]
      return getGatesByAstroSign(inputMap, label)
   }
   const percent_opts = {
      responsive: true,
      hover     : {mode: 'label',},
      tooltips  : {
         enabled  : true,
         callbacks: {
            label : labelcb,
            footer: footercb
         },
      }
   }
   
   function genData(obj) {
      return {
         type   : obj.type,
         data   : {
            labels  : obj.labelKeys,
            datasets: [{
               backgroundColor: obj.colorData,
               data           : obj.data
            }]
         },
         options: {
            responsive: true,
            hover     : {mode: 'label',},
            tooltips  : {
               enabled  : true,
               callbacks: {
                  label : obj.labelCb,
                  footer: obj.labelFooter
               },
            }
         }
      }
   }
   
   ctx1   = document.getElementById("root1")
   chart1 = new Chart(ctx1, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(inputData.astroSigns),
         datasets: [{
            backgroundColor: getAstroColors(_.keys(inputData.astroSigns).map((e) => { return readableNameMap[e] })),
            data           : _.values(inputData.astroSigns)
         }]
      },
      options: percent_opts
   })
   
   
   // <h2>根輪閘門星座主宰行星分布</h2>
   ctx2   = document.getElementById("root2")
   chart2 = new Chart(ctx2, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(inputData.astroRuler),
         datasets: [{
            backgroundColor: getAstroColors(_.keys(inputData.astroRuler)),
            data           : _.values(inputData.astroRuler)
         }]
      },
      options: {
         tooltips: {
            callbacks: {
               label : labelcb,
               footer: function (item, data) {
                  var label = data.labels[item[0].index]
                  return getGatesByRuler(inputMap, label)
               }
            }
         }
      }
   })
   
   
   ctx3   = document.getElementById("root3")
   chart3 = new Chart(ctx3, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(inputData.zodiacModes),
         datasets: [{
            backgroundColor: getAstroColors(_.keys(inputData.zodiacModes)),
            data           : _.values(inputData.zodiacModes)
         }]
      },
      options: {
         tooltips: {
            callbacks: {
               label : labelcb,
               footer: function (item, data) {
                  var label = data.labels[item[0].index]
                  return getGatesByAstroMode(inputMap, label)
               }
            }
         }
      }
      
   })
   // 根輪閘門星座元素分布
   ctx4   = document.getElementById("root4")
   chart4 = new Chart(ctx4, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(inputData.zodiacElements),
         datasets: [{
            backgroundColor: getAstroColors(_.keys(inputData.zodiacElements)),
            data           : _.values(inputData.zodiacElements)
         }]
      },
      options: {
         tooltips: {
            callbacks: {
               label : labelcb,
               footer: function (item, data) {
                  var label = data.labels[item[0].index]
                  return getGatesByAstroElements(inputMap, label)
               }
            }
         }
      }
   })
   
   
   // =====================================================
   /// 與根輪相連的通道其相位分布
   var temp = _.omitBy(inputData2, _.isObject)
   _.merge(temp, inputData2.others)
   
   ctx5   = document.getElementById("root5")
   chart5 = new Chart(ctx5, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(temp),
         datasets: [{
            backgroundColor: _.values(colorMap),
            data           : _.values(temp)
         }]
      },
      options: {
         tooltips: {
            callbacks: {
               label : labelcb,
               footer: function (item, data) {
                  var label = data.labels[item[0].index],
                      ret   = getGatesByAstroAspects(centerName, label)
                  Log.l('footer this', centerName, label)
                  return ret
               }
            }
         }
      }
   })
   
   // 與根輪相連的通道其星座分布
   ctx6   = document.getElementById("root6")
   chart6 = new Chart(ctx6, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(inputData3.astroSigns),
         datasets: [{
            backgroundColor: getAstroColors(_.keys(inputData3.astroSigns)),
            data           : _.values(inputData3.astroSigns)
         }]
      },
      options: {
         tooltips: {
            callbacks: {
               label : labelcb,
               footer: function (item, data) {
                  var label = data.labels[item[0].index]
                  return getGatesRelatedToCenter(centerName, (e) => {
                     return _.flatten(e.signs).indexOf(shortToLongMap[label]) !== -1
                  })
               }
            }
         }
      }
   })
   
   // 與根輪相連的通道其星座模式
   ctx7   = document.getElementById("root7")
   chart7 = new Chart(ctx7, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(inputData3.zodiacModes),
         datasets: [{
            backgroundColor: getAstroColors(_.keys(inputData3.astroSigns)),
            data           : _.values(inputData3.zodiacModes)
         }]
      },
      options: {
         tooltips: {
            callbacks: {
               label : labelcb,
               footer: function (item, data) {
                  var label  = data.labels[item[0].index]
                  let astros = astroModes[label].long
                  return getGatesRelatedToCenter(centerName, (e) => {
                     let signs = _.uniq(_.flatten(e.signs))
                     return isUnion(signs, astros)
                  })
               }
            }
         }
      }
   })
   
   ctx8   = document.getElementById("root8")
   chart8 = new Chart(ctx8, {
      type   : 'polarArea',
      data   : {
         labels  : _.keys(inputData3.zodiacElements),
         datasets: [{
            backgroundColor: getAstroColors(_.keys(inputData3.zodiacElements)),
            data           : _.values(inputData3.zodiacElements)
         }]
      },
      options: {
         tooltips: {
            callbacks: {
               label : labelcb,
               footer: function (item, data) {
                  var label  = data.labels[item[0].index]
                  let astros = astroElements[label].long
                  return getGatesRelatedToCenter(centerName, (e) => {
                     let signs = _.uniq(_.flatten(e.signs))
                     return isUnion(signs, astros)
                  })
               }
            }
         }
      }
   })
}

