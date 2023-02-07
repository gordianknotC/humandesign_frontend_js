<template>
   <section id="kabalaTree">
      <section id="kabala_svg" v-html="KABALA"></section>
      <div class="kabala_gates_count_for_channel">
      </div>
      <div class="kabala_channel_count"></div>

   </section>
</template>
<script type="javascript">
   //import {mobileConsoleInit} from '../util'
   // human design
   import type {TSettings} from  '../types'
   import {TNumber, TString, TObject, TBoolean, PLANETS_SETTING} from '../types'
   import {Property, setStyles} from '../Utils'
   import {datGUI, setting_preset} from '../datGUI'
   import {TConsole, eCOLORS} from '../console_addon'

   const Log             = new TConsole('Kabala', eCOLORS.current, [/VueComponent./, 'Kabala.'])
   const _               = require("lodash")
   const fetch           = require('node-fetch')
   const KABALA_SVG      = require('../statics/svgtest.svg')
   const __              = module.exports
   const ASTEROID        = ['Ceres', "Juno", "Pallas", "Vesta", "Chiron"]


   const WEIGHT  = _.mapValues(PLANETS_SETTING, (value, key) => value.weight)
   const VISIBLE = _.mapValues(PLANETS_SETTING, (value, key) => value.visible)

//   Log.suppressLevel([eCOLORS.info])
   Log.suppressLevel([eCOLORS.info, eCOLORS.log])

   function isUnion(a, b) {
      let l = _.union(a, b).length
      return l >= a.length && l <= a.length + b.length - 1
   }

   //TODO: 600行太多，將它分開。。。。。

   export default {
      props   : {
         width       : TNumber(1280),
         height      : TNumber(720),
         scale       : TNumber(1),
         rad         : TNumber(10),
         gateTextSize: TNumber(14),
         cBgCenter   : TString('rgb(61, 231, 232)'),
         cBgBoundary : TString('rgb(0, 88, 89)'),
         cGate       : TObject(() => {
            return {
               cGateActive        : "#313131", // gate color of personality
               cGateTxtActive     : "#ffffff",
               cGateSubActive     : "#d52d2c",
               cGateTxtSubActive  : "#ffffff",
               cGateSubInactive   : "#c5c5c5",  // gate color of asteroid
               cGateTxtSubInactive: "#ffffff",
               cGateInactive      : "#fff",
               cGateTxtInactive   : "#a8a8a8"

            }
         }),
         cCenter     : TObject(() => {
            return {
               head       : '#ff0b9e',
               ajna       : '#8e52ff',
               throat     : '#00a3c8',
               gcenter    : '#a2e700',
               heart      : '#dacc1b',
               spleen     : '#00c677',
               solarplexus: '#ff7000',
               sacral     : '#ff9a00',
               root       : '#9a0903'
            }
         }),
         cChannel    : TObject(() => {
            return {
               personality: '#222222BB',
               design     : '#DD2222BB',
               blended    : '#dcff00BB'
            }
         })
      },
      data () {
         return {
            KABALA                 : KABALA_SVG,
            kabala_svg_elt         : null,
            CHANNELS               : [],
            ALL_CHANNELS           : [],
            GATES                  : Array(64),
            centers                : [],
            svgid_channel          : null,
            weight_data            : {},
            WEIGHT                 : WEIGHT,
            VISIBLE                : VISIBLE,
            _weightData            : null,
            _visibleData           : null,
            gates_count_for_channel: null,
            design_gates_count     : null,
            personality_gates_count: null,
            personalityGates       : null,
            designGates            : null,
            hd                     : null,
            intialHTML             : null,
            datGUI                 : null,
            datMENUS               : {},
            rulerOrderedGates      : {personality: {}, design: {}},
            lineOrderedGates       : {personality: {}, design: {}},
            weightStatistics       : {},

            dSun: null,
            dMoon:null
         }
      },
      methods : {
         setChannels(ch){
            this.CHANNELS       = ch
            this.weight_data.d  = this.getDesignWeight()
            this.weight_data.p  = this.getPersonalityWeight()
            this.weight_data.pd = this.getWeightStatistic()
            // undefined == null
            if (this._weightData == null) {
               this._weightData  = _.clone(WEIGHT)
               this._visibleData = _.clone(VISIBLE)
               new Property(this.WEIGHT, this.onWEIGHT_changed.bind(this), this._weightData)
               new Property(this.VISIBLE, this.onVISIBLE_changed.bind(this), this._visibleData)
            }
            Log.l('design weight', this.weight_data.d)
            Log.l('personality weight', this.weight_data.p)
            this.setGatesCount()

         },
         onVISIBLE_changed(k, v){
//          FIXME: instead of redrawing all the graphics, just redraw whatever changes
            console.info('onVISIBLE_changed:', k, v)
            _.scheduleOnce(this.initialize, 1000, {args: [this.hd, this.ALL_CHANNELS]})
         },
         onWEIGHT_changed(k, v){
//            FIXME:instead of redrawing all the graphics, just redraw whatever changes
            console.info('onWEIGHT_changed:', k, v)
            _.scheduleOnce(this.initialize, 1000, {args: [this.hd, this.ALL_CHANNELS]})
         },
         setGatesState(){
            let self = this, fn, is_asteroid, elt
            for (let e of  this.designGates) {
               is_asteroid = _.includes(ASTEROID, e.ruler)
               fn          = is_asteroid ? self.setGateSubInactive.bind(self) : self.setGateSubActive.bind(self)
               elt         = document.querySelector('g[id=channels_1_]>g[id=gate' + e.gate + ']')
               Log.i('set deisgn gate:', e.gate, fn.name, e.ruler, e)
               fn(elt, this.WEIGHT[e.gate])
            }
            for (let e of  this.personalityGates) {
               is_asteroid = _.includes(ASTEROID, e.ruler)
               fn          = is_asteroid ? self.setGateSubInactive.bind(self) : self.setGateActive.bind(self)
               elt         = document.querySelector('g[id=channels_1_]>g[id=gate' + e.gate + ']')
               Log.i('set personality gate:', e.gate, fn.name, e.ruler, e)
               if (!(is_asteroid && elt.getAttribute('activation') === 'subactivated')) fn(elt, this.WEIGHT[e.gate])
            }
         },
         getWeightStatistic(){
            let ret = {}
            _.forEach(['p', 'd'], (v) => {
               for (let e of _.toPairs(this.weight_data[v])) {
                  ret[e[0]] = ret[e[0]] === undefined ? e[1] : ret[e[0]] + e[1]
               }
            })
            return ret
         },
         setGatesCount(){
            let p = ""
            let d = ""
            for (let e of _.toPairs(this.weight_data.p)) {
               p += `${e[0]}: ${e[1]}\n`
            }
            for (let e of _.toPairs(this.weight_data.d)) {
               d += `${e[0]}: ${e[1]}\n`
            }
            Log.i('gates count:', p)
            this.gates_count_for_channel = `personalit:\n${p}design:\n${d}`
         },
         getGateByIndex(index){
            return this.GATES[index]
         },
         onGateClick(e, ellipse, text, evt){
            //            FIXME BUG
            let state    = e.getAttribute('state'),
                rad      = this.rad,
                active   = this.cGate.cGateTxtActive,
                inactive = this.cGate.cGateTxtInactive
            Log.l(state, state === "false" ? "green" : "yellow")
            e.setAttribute('state', state === "false" ? "true" : "false")
            ellipse.setAttribute('fill', state === "false" ? "green" : "black")
            text.setAttribute('fill', state === "false" ? active : inactive)
            ellipse.setAttribute('rx', state === "false" ? rad * 1.2 : rad)
            ellipse.setAttribute('ry', state === "false" ? rad * 1.2 : rad)
            evt.preventDefault()
         },
         dataInitialize(){
            let centers = this.centers = document.querySelectorAll('g#centers')

         },
         getCenter(center){
            return this.centers.querySelector('#' + center)
         },
         setBgColor(center_color, boundary_color){
            let color = document.querySelectorAll('g[id=background]')[0].querySelectorAll('stop')
            let g1    = color[0]
            let g2    = color[1]
            g1.setAttribute('style', 'stop-color:' + center_color)
            g2.setAttribute('style', 'stop-color:' + boundary_color)
         },
         setGateStateByWeight(elt, weight){

         },
         setGateActive(elt, weight){
            elt.setAttribute('activation', 'activated')
            elt.children[0].setAttribute('fill', this.cGate.cGateActive)
            elt.children[1].setAttribute('fill', this.cGate.cGateTxtActive)
            elt.children[1].setAttribute('font-size', this.gateTextSize)
         },
         setGateSubActive(elt, weight){
            elt.setAttribute('activation', 'subactivated')
            elt.children[0].setAttribute('fill', this.cGate.cGateSubActive)
            elt.children[1].setAttribute('fill', this.cGate.cGateTxtSubActive)
            elt.children[1].setAttribute('font-size', this.gateTextSize)
         },
         setGateSubInactive(elt){
            elt.setAttribute('activation', 'subinactivated')
            elt.children[0].setAttribute('fill', this.cGate.cGateSubInactive)
            elt.children[1].setAttribute('fill', this.cGate.cGateTxtSUBINACTIVE)
            elt.children[1].setAttribute('font-size', this.cGateTxtSubInactive)
         },
         setGateInactive(elt){
            elt.setAttribute('activation', 'none')
            elt.children[0].setAttribute('fill', this.cGate.cGateInactive)
            elt.children[1].setAttribute('fill', this.cGate.cGateTxtInactive)
            elt.children[1].setAttribute('font-size', this.gateTextSize)
         },
         getPos(gate){
            return [Number(gate.querySelector('ellipse').getAttribute('cx')),
                    Number(gate.querySelector('ellipse').getAttribute('cy'))]
         },
         getPointAlongLine(p1, p2, ratio){
            return [p1[0] - (p1[0] - p2[0]) * ratio, p1[1] - (p1[1] - p2[1]) * ratio]
         },
         drawLine(path, id, dist = 1, color = '#fff', weight = 0, dash = false, type = 'empty',
                  baseThickness  = 3){
            // FIXME: wieght behavior -
            // TODO: 1) highlight defined center 2)
            // console.log('draw:', id, 'weight:', weight)
            weight *= 1.5
            let line      = document.createElement('line')
            let thickness = baseThickness * weight
            dash          = dash ? "6" : "0"
            line.setAttribute('id', id)
            line.setAttribute('type', type)

            if (path.length === 2) {
               let p1 = path[0],
                   p2 = path[1]
               line.setAttribute('x1', p1[0])
               line.setAttribute('y1', p1[1])
               line.setAttribute('x2', p1[0] - (p1[0] - p2[0]) * dist)
               line.setAttribute('y2', p1[1] - (p1[1] - p2[1]) * dist)
               line.setAttribute('style', `stroke:${color};stroke-width:${thickness};stroke-dasharray:${dash}`)
            } else {

               line       = document.createElement('path')
               let result = ''
               if (dist === 1) {
                  for (var i = 0; i < path.length; i += 1) {
                     let p      = path[i]
                     let prefix = i === 0 ? 'M ' : ' L '
                     result += prefix + parseInt(p[0]) + ', ' + parseInt(p[1])
                  }
               } else {
                  let midindex   = parseInt(path.length / 2) + 1
                  let midpoint   = this.getPointAlongLine(path[midindex][0], path[midindex][1], dist)
                  path[midindex] = midpoint
                  path           = path.slice(0, midindex)
                  for (var i = 0; i < midindex; i += 1) {
                     let p      = path[i]
                     let prefix = i === 0 ? 'M ' : ' L '
                     result += prefix + parseInt(p[0]) + ', ' + parseInt(p[1])
                  }
               }

               line.setAttribute('d', result)
               line.setAttribute('id', id)
               line.setAttribute('style', `stroke:${color};stroke-width:${thickness};stroke-dasharray:${dash};fill:none`)
            }
            return line

         },
         createLines(lines, type){
            let g  = document.createElement('g'),
                id = type + 'line'
            g.setAttribute('id', id)
            g.setAttribute('type', type)

            for (let e of lines) { g.append(e)}
            if (type === 'empty') this.svgid_channel.insertBefore(g, this.svgid_channel.children[0])
            if (type === 'channel') this.svgid_channel.insertBefore(g,
               document.querySelector('g[type=empty]').nextSibling)
         },
         drawEmptyTunnels(all_channels){
            let self = this, lines = []
            if (document.querySelector('g[type=empty]') !== null) return


            for (let rec of all_channels) {
               let fn        = rec.gates[0]
               let tn        = rec.gates[1]
               let from_gate = document.querySelectorAll(`g[id=gate${fn}]`)[0]
               let to_gate   = document.querySelectorAll(`g[id=gate${tn}]`)[0]
               let pos0      = self.getPos(from_gate),
                   pos1      = self.getPos(to_gate),
                   pos       = [pos1, pos0],
                   turningline, a1, a2, a3, a4

               if (isUnion([34, 10, 57], [fn, tn])) {
                  a1 = self.getPos(document.querySelectorAll(`g[id=gate20]`)[0])
                  a2 = self.getPos(document.querySelectorAll(`g[id=gate57]`)[0])
                  if (_.includes([fn,
                                  tn], 10)) pos.splice(pos.length - 1, 0, this.getPointAlongLine(a1, a2, 0.6))
                  if (_.includes([fn,
                                  tn], 34)) pos.splice(pos.length - 1, 0, this.getPointAlongLine(a1, a2, 0.8))
               }
               lines.push(self.drawLine(pos, `p${fn}_${tn}`, 1, '#fff', 3, false, "empty"))
            }

            this.createLines(lines, 'empty')
         },
         getWeight(){
            let d = this.getDesignWeight()
            let p = this.getPersonalityWeight()
            _.mapValues(p, (value, key) => {
               return d[key] ? value + d[key] : value
            })
         },
         getDesignWeight(): {number:string}[] {
            //TODO: relate all gates to channels              ;
            let result = {}
            for (let e of this.designGates) {
               result[e.gate] = result[e.gate] === undefined
                  ? Number(WEIGHT[e.ruler])
                  : Number(result[e.gate]) + Number(WEIGHT[e.ruler])
               //               result[e.gate] = Number(WEIGHT[e.ruler])
            }
            return result
         },
         getPersonalityWeight(){
            // FIXME: all gates not channel related
            let result = {}
            for (let e of this.personalityGates) {
               result[e.gate] = result[e.gate] === undefined
                  ? Number(WEIGHT[e.ruler])
                  : Number(result[e.gate]) + Number(WEIGHT[e.ruler])
               //               result[e.gate] = Number(WEIGHT[e.ruler])
            }

            return result
         },
         resetCenterColor(){
            _.forEach(document.querySelector('g[id=centers]').children, (e) => {
               e.setAttribute('fill', '#fff')
            })
         },
         paintCenter(name){
            let elt = document.querySelector(`g[id=centers]>#${name.toLowerCase()}`)
            Log.i('paintCenter', name, elt, `g[id=centers]>#${name.toLowerCase()}`)
            elt.setAttribute('fill', this.cCenter[name.toLowerCase()])

         },
         defineCentersByChannel(channel_data){
            let gates       = channel_data.gates,
                design_hit,
                person_hit,
                asteroid    = _.map(ASTEROID, (e) => {return e.toLowerCase()}),
                paint_count = 0

            for (let gnb_center of _.zip(gates, channel_data.center)) {
               design_hit = _.filter(this.designGates, (e) => {
                  return e.gate === gnb_center[0] && !_.includes(asteroid, e.ruler.toLowerCase())
               })
               if (design_hit.length > 0) {
                  paint_count += 1
                  continue
               }
               person_hit = _.filter(this.personalityGates, (e) => {
                  return e.gate === gnb_center[0] && !_.includes(asteroid, e.ruler.toLowerCase())
               })
               if (person_hit.length > 0) paint_count += 1
            }
            Log.l('defineCenterByChannel', channel_data.center)
            if (paint_count >= 2) {
               this.paintCenter(channel_data.center[0])
               this.paintCenter(channel_data.center[1])
            }
         },
         drawSemiChannels(){
            let nonSingleGates = this.hd.nonSingleGates
            Log.l('nonSingleGate:', nonSingleGates)
            Log.l('singleGateData:', this.hd.singleGateData)
         },
         drawLineBetweenGates(rec, personWeightData, designWeightData){
            let fn        = rec.gates[0]
            let tn        = rec.gates[1]
            let self      = this
            let from_gate = document.querySelectorAll(`g[id=gate${fn}]`)[0]
            let to_gate   = document.querySelectorAll(`g[id=gate${tn}]`)[0]
            let lines     = []
            let pos0      = self.getPos(from_gate),
                pos1      = self.getPos(to_gate),
                pos       = [pos1, pos0],
                rpos      = [pos0, pos1],
                a1, a2, gate_n, color

            this.defineCentersByChannel(rec)

            if (isUnion([34, 10, 57], [fn, tn])) {
               a1 = self.getPos(document.querySelectorAll(`g[id=gate20]`)[0])
               a2 = self.getPos(document.querySelectorAll(`g[id=gate57]`)[0])
               if (_.includes([fn, tn], 10)) {
                  rpos.splice(1, 0, this.getPointAlongLine(a1, a2, 0.6))
                  pos.splice(pos.length - 1, 0, this.getPointAlongLine(a1, a2, 0.6))
               }
               if (_.includes([fn, tn], 34)) {
                  rpos.splice(1, 0, this.getPointAlongLine(a1, a2, 0.8))
                  pos.splice(pos.length - 1, 0, this.getPointAlongLine(a1, a2, 0.8))
               }
            }

            color = this.cChannel.design
            if (rec.conscious.d[0].length) {
               // display design and personaity simutaniously, determins wheather to draw dash or straight line
               // draw design dash line or straight line
               gate_n = rec.conscious.d[0][0].gate

               //               rec.conscious.p[0] ?
               //                  lines.push(self.drawLine(rpos, `d${fn}_${tn}`, 0.5, color, designWeightData[gate_n] * 1.5, true, "channel"))
               //                  : lines.push(self.drawLine(rpos, `d${fn}_${tn}`, 0.5, color, designWeightData[gate_n] * 1.5, false, "channel"))
               let w = this.WEIGHT[rec.conscious.d[0][0].ruler] * 1.5
               rec.conscious.p[0] ?
                  lines.push(self.drawLine(rpos, `d${fn}_${tn}`, 0.5, color, w, true, "channel"))
                  : lines.push(self.drawLine(rpos, `d${fn}_${tn}`, 0.5, color, w, false, "channel"))
               from_gate.setAttribute('activation', 'sub')
            }

            if (rec.conscious.d[1].length) {
               // display design and personaity simutaniously, determins wheather to draw dash or straight line
               // draw design dash line or straight line
               gate_n = rec.conscious.d[1][0].gate
               //               rec.conscious.p[1] ?
               //                  lines.push(self.drawLine(pos, `d${tn}_${fn}`, 0.5, color, designWeightData[gate_n] * 1.5, true, "channel"))
               //                  : lines.push(self.drawLine(pos, `d${tn}_${fn}`, 0.5, color, designWeightData[gate_n] * 1.5, false, "channel"))
               let w = this.WEIGHT[rec.conscious.d[1][0].ruler] * 1.5
               rec.conscious.p[1] ?
                  lines.push(self.drawLine(pos, `d${tn}_${fn}`, 0.5, color, w, true, "channel"))
                  : lines.push(self.drawLine(pos, `d${tn}_${fn}`, 0.5, color, w, false, "channel"))
               to_gate.setAttribute('activation', 'sub')
            }

            color = this.cChannel.personality
            if (rec.conscious.p[0].length) {
               gate_n = rec.conscious.p[0][0].gate
               //               lines.push(self.drawLine(rpos, `p${fn}_${tn}`, 0.5, color, personWeightData[gate_n] * 1.5, false, "channel"))
               let w  = this.WEIGHT[rec.conscious.p[0][0].ruler] * 1.5
               lines.push(self.drawLine(rpos, `p${fn}_${tn}`, 0.5, color, w, false, "channel"))
               from_gate.setAttribute('activation', 'activated')
            }

            if (rec.conscious.p[1].length) {
               gate_n = rec.conscious.p[1][0].gate
               //               lines.push(self.drawLine(pos, `p${tn}_${fn}`, 0.5, color, personWeightData[gate_n] * 1.5, false, "channel"))
               let w  = this.WEIGHT[rec.conscious.p[1][0].ruler] * 1.5
               lines.push(self.drawLine(pos, `p${tn}_${fn}`, 0.5, color, w, false, "channel"))
               to_gate.setAttribute('activation', 'activated')
            }
            return lines
         },
//         TODO: fix channel id from {gate}_{gate} to {planet}_{gate}_{gate} for preventing naming confliction
         drawChannels(){
            let self              = this,
                preExists         = document.querySelectorAll('g[type=channel]'),
                lines             = [],
                designWeightData  = this.weight_data.d,
                personWeightData  = this.weight_data.p,
                gatesAlreadyDrawn = new Set()

            for (let rec of preExists) {rec.remove()}
            //FIXME: 1) weight behavior 2) highlight defined center
            Log.l('weight_data:', this.weight_data)
            Log.l('CHANNELS:', this.CHANNELS)

            for (let rec of self.CHANNELS) {
               lines = lines.concat(self.drawLineBetweenGates(rec, personWeightData, designWeightData))
            }
            for (let rec of this.hd.singleGateData) {
               lines = lines.concat(self.drawLineBetweenGates(rec, personWeightData, designWeightData))
            }
            this.createLines(_.reverse(lines), 'channel')
         },
         updateSVG(){
            document.querySelector('section[id=kabala_svg]>svg').innerHTML += ''
         },
         gateOnClickInit(svgids){
            let GATES = this.GATES,
                self  = this
            for (let e of svgids) {
               let id     = e.getAttribute('id')
               let isgate = id.slice(0, 4) === "gate"
               let ellipse, text, rad, tcolor
               if (isgate) {
                  GATES[id.slice(4)] = e
                  text               = e.children[1]
                  ellipse            = e.children[0]
                  //						console.log(e, e.getAttribute('activation'))
                  if (e.getAttribute('activation') === null) self.setGateInactive(e)
                  if (e.getAttribute('state') === 'true') e.click()
                  e.setAttribute('state', "false")
                  e.addEventListener('click', function (evt) {
                     self.onGateClick(e, ellipse, text, evt)
                  })
               }
            }
         },
         updateGraphic(all_channels){
            this.svgid_channel = document.querySelector('g[id=channels_1_]')
            this.setBgColor(this.cBgCenter, this.cBgBoundary)
            this.resetCenterColor()
            this.drawEmptyTunnels(all_channels)
            this.drawChannels()
            this.setGatesState()
            this.updateSVG()
         },
         updateEvent(){
            let GATES   = this.GATES
            let centers = this.centers = document.querySelectorAll('g#centers')[0]
            let svgids = this.svgids = document.querySelectorAll('g[id]')
            this.gateOnClickInit(svgids)
         },
         update(){
            this.updateGraphic(this.ALL_CHANNELS)
            this.updateEvent()
         },
         datGUIInit(){
            let weightStatisticsInit = (menu)=>{
               menu.removeAllControllers()
               _.forEach(this.weight_data.pd, (v,k)=>{
                  menu.addConst(this.weight_data.pd, k)
               })
            }
            if (!_.isEmpty(this.datMENUS)) {
               _.forEach(this.datMENUS.consts, (menu) => {
                  _.forEach(menu.__controllers, (c) => {
                     c.updateDisplay()
                  })
               })
               weightStatisticsInit(this.datMENUS.breaklink[0])
               return
            }
            // --------------------------------
            // NOTE: dat gui ..................
            const cPersonality = '#00c2ff'
            const cDesign      = '#ffbe00'
            const LOCAL = localStorage.getItem('setting')
            const SETTING =  LOCAL !== null ? JSON.parse(LOCAL) : setting_preset
            let gui = this.datGUI = new datGUI.GUI({width: 336})

//            function loadPreset(index, preset,obj, name='Default'){
//               _.forEach(preset.remembered[name][index], (v, k)=>{
//                  obj[k] =  preset.remembered[name][index][k]
//               })
//            }
//            loadPreset(0, SETTING, this.WEIGHT)
//            loadPreset(1, SETTING, this.VISIBLE)
            _.forEach(SETTING.remembered.Default[0], (v, k)=>{
               this.WEIGHT[k] =  SETTING.remembered.Default[0][k]
            })
            _.forEach(SETTING.remembered.Default[1], (v, k)=>{
               this.VISIBLE[k] =  SETTING.remembered.Default[1][k]
            })

            function saveLocalStorage(data){
               localStorage.setItem('setting', JSON.stringify(data))
            }

            function onFinishChange(_gui, controller, remembered_index){
               function wrapper(v){
                  if (SETTING.remembered.Default[remembered_index] === undefined) SETTING.remembered.Default[remembered_index] = {}
                  SETTING.remembered.Default[remembered_index][controller.property] = v
                  _.debounce(saveLocalStorage,700)(SETTING)
               }
               return wrapper
            }
            let menu = gui.addFolder(' 行星權重設定')
            menu.getTitle(menu).classList.add('setting_icon')
            _.forEach(this.WEIGHT, (v, k) => {
               let controller = menu.add(this.WEIGHT, k, 0, 4).step(0.2).name(k + PLANETS_SETTING[k].ch)
               controller.__onFinishChange = onFinishChange(gui, controller, 0)
            })

            let menu2 = gui.addFolder(' 行星顯示設定(尚未實作)')
            menu2.getTitle(menu2).classList.add('check_icon')
            _.forEach(this.VISIBLE, (v, k) => {
               let controller = menu2.add(this.VISIBLE, k).name(k + PLANETS_SETTING[k].ch)
               controller.__onFinishChange = onFinishChange(gui, controller, 1)
            })

            let menu3 = gui.addFolder(' 行星與閘門對應')
            menu3.getTitle(menu3).classList.add('statistic_icon')

            _.forEach(['personality', 'design'], (key) => {
               let color = key === 'personality' ? cPersonality : cDesign
               menu3.addSpliter(key.toUpperCase() + ':', color)
               _.forEach(PLANETS_SETTING, (v, k) => {
                  menu3.addConst(this.rulerOrderedGates[key], k, color).name(k + PLANETS_SETTING[k].ch)
               })
            })

            let menu4 = gui.addFolder(' 爻線與閘門對應')
            menu4.getTitle(menu4).classList.add('statistic_icon')

            _.forEach(['personality', 'design'], (key) => {
               let color = key === 'personality' ? cPersonality : cDesign
               menu4.addSpliter( key.toUpperCase() + ':', color)
               _.forEach(['1', '2', '3', '4', '5', '6'], (v) => {
                  menu4.addConst(this.lineOrderedGates[key], v, color).name('line' + v)
               })
            })

            let menu5     = gui.addFolder(' 閘門權重統計')
            menu5.getTitle(menu5).classList.add('statistic_icon')
            this.datMENUS = {normal: [menu, menu2], consts: [menu3, menu4], breaklink: [menu5]}


            weightStatisticsInit(menu5)
         },
         initialize(hd, all_channels){
            this.hd               = hd
            this.ALL_CHANNELS     = all_channels
            this.personalityGates = hd.personalGates
            this.designGates      = hd.designGates

            this.kabala_svg_elts.innerHTML = this.intialHTML
            this.setChannels(hd.channelsData)
            this.update()
            //            _.scheduleOnce(this.update, 1000, {args: [this.hd, this.ALL_CHANNELS]})
            Log.l('hd:', hd)
            let stringify = (dA, dB, fn) => {
               _.forEach(dB.personality, (v, k) => {dA.personality[k] = fn(v)})
               _.forEach(dB.design, (v, k) => {dA.design[k] = fn(v)})
            }
            stringify(this.rulerOrderedGates, this.hd.rulerOrderedGates, (v) => v.join(','))
            stringify(this.lineOrderedGates, this.hd.lineOrderedGates,
               (v) => v.map((x) => x.gate + '.' + parseInt(x.gateInfo.line)).join(', '))


            this.datGUIInit()
         },
         setSize(scale){
            let svg = this.kabala_svg_elts
            Log.i('setSize:', this.kabala_svg_elts, document.querySelector('selector[id=kabala_svg]'))
            let width  = parseInt(svg.getAttribute('width'))
            let height = parseInt(svg.getAttribute('height'))
            svg.setAttribute('width', width * scale)
            svg.setAttribute('height', height * scale)
         }
      },
      watch   : {},
      computed: {},
      mounted(){
         this.kabala_svg_elts = this.$el.children[0].children[0] // section > svg
         this.intialHTML      = this.kabala_svg_elts.innerHTML
         this.setSize(this.scale)

      }

   }
</script>
<style lang="styl">
   @import '../themes/humandesign.styl'
</style>
