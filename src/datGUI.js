/**
 * Created by gordianknot on 2/24/2018.
 */
import datGUI from 'dat.gui'
import _ from 'lodash'
const STORAGE_HASH               = location.href + '.gui'
let $P                           = datGUI.GUI.prototype
$P.getTitle                      = (ctlr) => ctlr.domElement.parentElement.querySelector('li.title')
$P.getRow                        = (ctlr) => ctlr.domElement.parentElement.parentElement
$P.getLabel                      = (ctlr) => ctlr.domElement.parentElement
$P.setStyles                     = (el, styles) => {
   for (let propname in styles) {
      el.style[propname] = styles[propname]
   }
}
$P.customAdd                     = function (obj, labelname, options = {args: null, labelStyle: null, rowStyle: null}) {
   let ret = options.args ? this.add(obj, labelname, ...options.args) : this.add(obj, labelname)
   if (options.labelStyle) this.setStyles(this.getLabel())
   if (options.rowStyle) this.setStyles(this.getRow())
   return ret
}
$P.addSpliter                    = function (content, color) {
   let obj = {
      'spliter': ''
   }
   let ret = this.add(obj, 'spliter').name(content)
   this.getRow(ret).setAttribute('style',
      `background-color:#555;border-left:3px solid ${color}`)
   this.getLabel(ret).setAttribute('style', `color:${color};text-shadow:none`)
   ret.domElement.innerHTML = ''
   return ret
}
$P.addConst                      = function (obj, labelname, color) {
   let ret = this.add(obj, labelname)
   let el  = ret.domElement.querySelector('input')
   if (el) {
      el.setAttribute('disabled', true)
      el.style.background = '#1a1a1a'
   }
   if (color) this.getRow(ret).style.borderLeft = `3px solid ${color}`
   return ret
}
$P.removeAllControllers          = function () {
   while (this.__controllers.length > 0) {
      for (let c of this.__controllers) {
         c.remove()
      }
   }
}
$P.rememberProperties            = function (controllers) {
   for (let controller of controllers) {
      _.forEach(controller, (value, index) => {
      
      })
   }
}
const _getSaveObject             = $P.getSaveObject
$P._saveToLocalStorageIfPossible = $P.saveToLocalStorageIfPossible

$P.saveToLocalStorageIfPossible = function () {

}




let default_preset = {
   "preset"    : "Elton John",
   "closed"    : false,
   "remembered": {
      "Elton John"    : {
         "0": {
            "birth_year"   : 1986,
            "birth_month"  : 6,
            "birth_day"    : 10,
            "birth_hour"   : 10,
            "birth_minutes": 18,
            "birth_date"   : "1986/6/10 10:18"
         },
         "1": {
            "Sun"    : 2.4000000000000001,
            "Earth"  : 1.2000000000000002,
            "Moon"   : 1.2000000000000002,
            "Venus"  : 1.2000000000000002,
            "Mercury": 1,
            "Mars"   : 1,
            "Jupiter": 1,
            "Saturn" : 1,
            "Uranus" : 1,
            "Neptune": 1,
            "Pluto"  : 1,
            "North"  : 1,
            "South"  : 1,
            "Ceres"  : 0.1,
            "Juno"   : 0.1,
            "Pallas" : 0.1,
            "Vesta"  : 0.1,
            "Chiron" : 0.5
         },
         "2": {
            "Sun"    : true,
            "Earth"  : true,
            "Moon"   : true,
            "Venus"  : true,
            "Mercury": true,
            "Mars"   : true,
            "Jupiter": true,
            "Saturn" : true,
            "Uranus" : true,
            "Neptune": true,
            "Pluto"  : true,
            "North"  : true,
            "South"  : true,
            "Ceres"  : true,
            "Juno"   : true,
            "Pallas" : true,
            "Vesta"  : true,
            "Chiron" : true
         }
      }
   },
   "folders"   : {
      "輪入出生日期": {
         "preset" : "Default",
         "closed" : false,
         "folders": {}
      }
   }
}


let setting_preset = {
   "preset"    : "Default",
   "closed"    : false,
   "remembered": {
      "Default": {
         "0": {
            "Sun"    : 2.4000000000000001,
            "Earth"  : 1.2000000000000002,
            "Moon"   : 1.2000000000000002,
            "Venus"  : 1.2000000000000002,
            "Mercury": 1,
            "Mars"   : 1,
            "Jupiter": 1,
            "Saturn" : 1,
            "Uranus" : 1,
            "Neptune": 1,
            "Pluto"  : 1,
            "North"  : 1,
            "South"  : 1,
            "Ceres"  : 0.1,
            "Juno"   : 0.1,
            "Pallas" : 0.1,
            "Vesta"  : 0.1,
            "Chiron" : 0.5
         },
         "1": {
            "Sun"    : true,
            "Earth"  : true,
            "Moon"   : true,
            "Venus"  : true,
            "Mercury": true,
            "Mars"   : true,
            "Jupiter": true,
            "Saturn" : true,
            "Uranus" : true,
            "Neptune": true,
            "Pluto"  : true,
            "North"  : true,
            "South"  : true,
            "Ceres"  : true,
            "Juno"   : true,
            "Pallas" : true,
            "Vesta"  : true,
            "Chiron" : true
         }
      }
   },
   "folders"   : {
      " 行星權重設定"      : {
         "preset" : "Default",
         "closed" : true,
         "folders": {}
      },
      " 行星顯示設定(尚未實作)": {
         "preset" : "Default",
         "closed" : true,
         "folders": {}
      }
   }
}

export{
   datGUI, default_preset, setting_preset, STORAGE_HASH
}

