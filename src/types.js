// @flow

type TProperty<T> = {
   type: Function,
   default: T,
   required: boolean,
   validator: ?Function
}

type TEventFnPair = {
   evt: string,
   fn: Function
}
type TEventRegisters = [HTMLElement, TEventFnPair]

type
   TSettings = {
   trigger: {
      show: boolean,
      enter: {
         name: string,
         posy: string,
         color: string
      },
      leave: {
         name: string,
         posy: string,
         color: string
      }
   },
   anime: Object
}

type eSTAGE = 'compass' | 'topWithin' | 'bottomWithin'

type TInstance =  TAnimeInst

type TParam    =  TAnimeParam

type ProportionSt = {name:string, value:Function, anim_order:number, frame_id:number, elts: HTMLElement[]}

type StageConfig = {name:string, scrollHeight:()=>number, ratio:number}

type SceneConfig = StageConfig[]

type TSpliters = {spliter:string, subspliter:string}

type TStorageRecs = string[]


//-----------------------------------------
//             vue types
//-----------------------------------------

function TType<T>(type: Function, _default: T, required: boolean,
                  validator: ?Function): TProperty<T> {
   
   let ret: TProperty<T> = {
      type     : type,
      'default': _default,
      required : required,
      validator: null
   }
   if (validator === null) {
      return ret
   }
   ret.validator = validator
   return ret
}
const TString   = (d: string            = '', required: boolean = false,
                   validator: ?Function = null): TProperty<string> => TType(String, d, required, validator)
const TNumber   = (d: number            = 0, required: boolean = false,
                   validator: ?Function = null): TProperty<number> => TType(Number, d, required, validator)
const TObject   = (d: Object            = {}, required: boolean = false,
                   validator: ?Function = null): TProperty<Object> => TType(Object, d, required, validator)
const TBoolean  = (d: boolean           = true, required: boolean = false,
                   validator: ?Function = null): TProperty<boolean> => TType(Boolean, d, required, validator)
const TFunction = (d: Function          = () => {}, required: boolean = false,
                   validator: ?Function = null): TProperty<Function> => TType(Function, d, required, validator)
const TArray    = (d: Array<any>        = [], required: boolean = false,
                   validator: ?Function = null): TProperty<Array<any>> => TType(Array, d, required, validator)
const TSymbol   = (d: Symbol            = Symbol.for('default'), required: boolean = false,
                   validator: ?Function = null): TProperty<Symbol> => TType(Symbol, d, required, validator)
const eSTATE    = {
   compass       : 'compass',
   within        : 'within',
   above         : 'above',
   below         : 'below',
   topWithin     : 'topWithin',
   bottomWithin  : 'bottomWithin',
   //----------------------------------------
   onTopEnterL   : 'onTopEnterL',
   onTopLeaveL   : 'onTopLeaveL',
   onTopEnterR   : 'onTopEnterR',
   onTopLeaveR  :  'onTopLeaveR',
   //----------------------------------------
   onBottomLeaveL: 'onBottomLeaveL',
   onBottomEnterL: 'onBottomEnterL',
   onBottomLeaveR: 'onBottomLeaveR',
   onBottomEnterR: 'onBottomEnterR',
   //----------------------------------------
   onTopWithin   : 'onTopWithin',
   onCompass     : 'onCompass',
   onBottomWithin: 'onBottomWithin'
}

const S               = (w:number, v:boolean, c:string) => {return {weight: w, visible: v, ch: c}}
const PLANETS_SETTING = {
   Sun    : S(2, true, "??????"),
   Earth  : S(2, true, "??????"),
   Moon   : S(1.5, true, "??????"),
   Venus  : S(1, true, "??????"),
   Mercury: S(1, true, "??????"),
   Mars   : S(1, true, "??????"),
   Jupiter: S(1, true, "??????"),
   Saturn : S(1, true, "??????"),
   Uranus : S(1, true, "?????????"),
   Neptune: S(1, true, "?????????"),
   Pluto  : S(1, true, "?????????"),
   North  : S(1, true, "??????"),
   South  : S(1, true, "??????"),
   // asteroid
   Ceres  : S(0.1, true, "??????"),
   Juno   : S(0.1, true, "??????"),
   Pallas : S(0.1, true, "??????"),
   Vesta  : S(0.1, true, "??????"),
   Chiron : S(0.5, true, "??????"),
}

// ---------------------------------
//          paperjs
// ---------------------------------


// ----------------------------------
//             components
// ----------------------------------

const dSETTING: TSettings = {
   trigger: {
      show : true,
      length: 100,
      enter: {
         name : 'default',
         posy : '20%',
         color: '#fc1'
      },
      leave: {
         name : 'default',
         posy : '80%',
         color: '#fc1'
      }
   },
   anime : {},
   update: null
}


export {
   TString, TNumber, TObject, TBoolean, TFunction, TArray, TSymbol, eSTATE, dSETTING ,PLANETS_SETTING
}

export type{
   TSettings, TEventRegisters, TEventFnPair, TProperty, eSTAGE, TInstance, TParam, SceneConfig, StageConfig, ProportionSt ,TSpliters, TStorageRecs
}