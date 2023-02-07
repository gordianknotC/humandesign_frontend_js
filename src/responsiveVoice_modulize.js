/* eslint-disable flowtype/require-parameter-type */
/** @namespace window.speechSynthesis
 * @namespace window.SpeechSynthesisUtterance*/

var Compress                   = LZString.compress                // eslint-disable-line
var Compress64                 = LZString.compressToBase64        // eslint-disable-line
var Decompress                 = LZString.decompress              // eslint-disable-line
var Decompress64               = LZString.decompressFromBase64    // eslint-disable-line
var PRIVATE_ARTICLE_EL         = document.querySelector('div#decompress')
var doDecompressPrivateArticle = PRIVATE_ARTICLE_EL === null ? false : true  // eslint-disable-line

function compressPrivateArticle() {
   return Compress64(PRIVATE_ARTICLE_EL.innerHTML)
}
function decompressPrivateArticle() {
   return Decompress64(PRIVATE_ARTICLE_EL.innerText)
}

var clientId        = null
var __gordianknot__ = ["1125557323.1503479257", '621466816.1503534299']
var IDS             = []
var permission      = {showOriginal: false}
var LANGUAGE

ga((x) => {                      // eslint-disable-line
   clientId = x.get('clientId')
   LANGUAGE = x.b.data.values[':language']
})

permission.showOriginal = IDS.concat(__gordianknot__).indexOf(clientId) !== -1 ? true : false   // eslint-disable-line

if (doDecompressPrivateArticle === true && permission.showOriginal === true) {
   console.log('original code:', document.querySelector('div#decompress').innerHTML)
   console.log('decompressed code:', decompressPrivateArticle())
   document.querySelector('div#decompress').innerHTML = decompressPrivateArticle()
}
//-------------------------------
var playHistoryData = {}
var vocData         = {}

var origs                  = document.querySelectorAll('orig')
var origs2                 = document.querySelectorAll('blockquote.original')
var voiceName              = "UK English Female"
var playing                = false
var overallUterances       = []
var longestScentence       = 270
var musicStartTime         = 121
var bgVolume               = 0.6
var bgMusic                = document.querySelector('#bgMusic')
var speechRate             = 0.95
var speechLoop             = 1
var speechVoice            = 0
var pathName               = window.location.pathname
var current_scentenceIndex = 0
var speechInterupted       = false
var currentBlock           = ''
var idDisplaySelector      = "#Text1 > div.widget-content > span > blockquote"
var raw_vocabulary         = document.querySelector('div#vocabulary')
var DB                     = null

document.querySelector(idDisplaySelector).append('ID: ' + clientId)
bgMusic.enable = false

// ------------------ voice settings --------------------------
var VOICES   = [], GOOGLE_VOICES = [], AMAZON_VOICES = [], VOICES_PICKUP = []
var DICT_API = 'http://apii.dict.cn/mini.php?q='

function genVoices() {
   VOICES        = speechSynthesis.getVoices()
   GOOGLE_VOICES = VOICES.filter((x) => ['Google UK English Female', 'Google UK English Male', 'Google US English',
                                         'Google 國語（臺灣）'].indexOf(x.name) !== -1)
   AMAZON_VOICES = VOICES.filter((x) => x.name.indexOf('Amazon British') !== -1)
   VOICES_PICKUP = GOOGLE_VOICES.concat(AMAZON_VOICES)
   console.log('genVoices', VOICES_PICKUP, speechSynthesis.getVoices())
}

class ComponentHelper {
   setAttributes(elt /*: HTMLElement*/, attributes /*:Attributes*/) {
      if (attributes) {
         for (let key in attributes) {
            elt.setAttribute(key, attributes[key])
         }
      }
   }
   
   genButton(name/*:string*/, attributes/*:Attributes*/) {
      let element       = document.createElement('button')
      element.innerHTML = `<i></i><span>${name}</span>`
      this.setAttributes(element, attributes)
      return element
   }
   
   genInput(attributes) {
      let element = document.createElement('input')
      this.setAttributes(element, attributes)
      return element
   }
   
   genOption(name, values, attributes, selected = 0) {
      let options = ''
      for (let i = 0; i < values.length; i++) {
         options += `<option value="value${i}">${values[i]}</option>`
      }
      let select           = document.createElement('select')
      select.name          = name
      select.innerHTML     = options
      select.selectedIndex = selected
      this.setAttributes(select, attributes)
      return select
   }
   
   genDiv(componentList/*:[HTMLElement]*/, attributes/*:Attributes*/) {
      let div = document.createElement('div')
      for (let i = 0; i < componentList.length; i++) {
         div.appendChild(componentList[i])
      }
      this.setAttributes(div, attributes)
      return div
   }
   
   lookup(word/*:string*/) {
      let url  = DICT_API + word
      let oReq = new XMLHttpRequest()
      
      function reqListener() {
         console.log(this.responseText)
      }
      
      oReq.addEventListener("load", reqListener)
      oReq.open("GET", url)
      oReq.send()
   }
}

const Helper = new ComponentHelper()

// -------------------------------------------------------
// NOTE: -------------- other utils -----------------------

function speakSacral() {
   let area      = document.querySelector('textarea.tts')
   let raw_value = area.value
   let value     = raw_value.split(/@[^@]+}/)[1].split('\n').map((x) => x.trim()).filter((x) => x ? true : false)
   let setting   = null
   eval('setting = ' + raw_value.split(raw_value.split(/@[^@]+}/)[1])[0].trim().split('@setting:')[1])
   setting.voice       = "Google 國語（臺灣）"
   let voice           = speechSynthesis.getVoices().filter((x) => x.voiceURI === setting.voice)
   let _utterances_mod = []
   let scentence_pause = parseInt(setting.pause)
   
   for (let j = 0; j < value.length; j++) {
      let v = value[j]
      for (let i = 0; i < setting.repeat; i++) {
         let ret  = new SpeechSynthesisUtterance(v)
         ret.lang = voice
         _utterances_mod.push(ret)
      }
      
      for (let i = j * setting.repeat; i < j * setting.repeat + setting.repeat; i++) {
         _utterances_mod[i].onend = () => {
            setTimeout(() => {
               console.log(_utterances_mod, i + 1)
               speechSynthesis.speak(_utterances_mod[i + 1])
            }, scentence_pause)
            console.log(i, _utterances_mod[i])
         }
      }
   }
   speechSynthesis.speak(_utterances_mod[0])
}


function weightTTS() {
   for (let key in playHistoryData) {
      let ab    = key.split(',').map((x) => parseInt(x))
      let quote = document.querySelectorAll('blockquote.original')[ab[0]]
      if (quote) {
         let tts = quote.querySelector(`tts:nth-child(${ab[1] + 1})`)
         if (tts) tts.setAttribute('weight', playHistoryData[key])
      }
   }
}


function showAllBlocks() {
   document.querySelectorAll('section.tts').forEach((e) => {
      if (e.style.display !== 'show') e.click()
   })
}

function hideAllBlocks() {
   document.querySelectorAll('section.tts').forEach((e) => {
      if (e.style.display === 'show') e.click()
   })
}

function fadeIn(acc = 0.03) {
   console.log('fadeIn:', bgMusic.volume)
   if (bgMusic.volume + acc >= bgVolume) {
      bgMusic.volume = bgVolume
      return
   }
   bgMusic.volume += acc
   setTimeout(() => { fadeIn(acc) }, 100)
}

function fadeOut(acc = 0.03) {
   console.log('fadeOut:', bgMusic.volume)
   if (bgMusic.volume - acc <= 0) {
      bgMusic.volume = 0
      bgMusic.pause()
      return
   }
   bgMusic.volume -= acc
   setTimeout(() => { fadeOut(acc) }, 100)
}

/*
tts module, 選好人種與選手
 */
class SpeechModule {
   constructor(setting /*:{[string]:any}*/) {
      this.speed            = setting.speed
      this.voice            = setting.voice
      this.ready            = false
      this.speechInterupted = false
      this.pickupVoices     = []
      this._availableVoices = []
      this._trigger_lapse   = 0
      this.loop             = 1
      this.utterances       = []
      this.triggerInitialize()
   }
   
   triggerInitialize() {
      setTimeout(this._initializeVoices.bind(this), 2000)
      this._trigger_lapse += 1
   }
   
   _initializeVoices() {
      let voices = speechSynthesis.getVoices()
      if (voices.length === 0) {
         if (this._trigger_lapse < 10) this.triggerInitialize()
         return
      }
      this.ready = true
      let google = voices.filter((x) => ['Google UK English Female', 'Google UK English Male', 'Google US English',
                                         'Google 國語（臺灣）'].indexOf(x.name) !== -1)
      let amazon = voices.filter((x) => x.name.indexOf('Amazon British') !== -1)
      let pickup = google.concat(amazon)
      console.log('_initializeVoices', pickup, speechSynthesis.getVoices())
      this._availableVoices = voices
      this.pickupVoices     = pickup
   }
   
   
   _splitText(text /*:string*/, spliter = '.') /*:[string[], number[]]*/ {
      console.log('split text:', text, spliter)
      let s          = text.trim()
      let pausePtn   = /[,;]| - | — /
      let ret        = []
      let valid      = true
      let indexes    = []
      let index      = 0
      let scentences = s.split(spliter).filter((e) => {
         if (e) return e
      }).map(function (e, i) {
         let suffix = i === 0 ? spliter : ''
         if (spliter === '.') suffix = '.'
         return e.trim() + suffix
      })
      for (let scentence of scentences) {
         valid = true
         if (scentence.length > longestScentence && scentence.match(pausePtn) !== -1) {
            valid   = false
            let tmp = scentence.split(pausePtn).map((e) => e.trim())
            ret     = ret.concat(tmp)
            indexes = indexes.concat(tmp.map((e) => index))
         }
         if (valid) {
            ret.push(scentence)
            indexes.push(index)
         }
         index++
      }
      return [ret, indexes]
   }
   
   getCurrentVoice() {
      return this.pickupVoices[this.voice]
   }
   
   interuptSpeech() {
      console.log('interuptSpeech!')
      this.speechInterupted = true
      speechSynthesis.pause()
      speechSynthesis.cancel()
   }
   
   continueSpeech() {
      
      console.log('continueSpeech')
      this.speechInterupted = false
      speechSynthesis.resume()
   }
   
   _utterize(text /*:string*/, index = 0, scentence_index = 0, len, rate = 0.95, callbacks = {
                onstart: null,
                onend  : null
             }) {
      let utterance   = new window.SpeechSynthesisUtterance()
      utterance.voice = this.getCurrentVoice()
      
      let ret = new utterance.constructor()
      for (let tag in utterance) {
         ret[tag] = utterance[tag]
      }
      ret.rvIndex        = index
      ret.rvTotal        = 13
      ret.rate           = rate
      ret.text           = text
      ret.onstart        = callbacks.onstart
      ret.onend          = callbacks.onend
      ret.scentenceIndex = scentence_index
      ret.scentenceDivs  = len
      //FIXME: I have unblock the following line but don't know what the side effect is
      //speechSynthesis.resume()
      speechSynthesis.cancel()
      return ret
   }
   
   createSpeech(text /*:string*/, callbacks = {
                   onstart: null,
                   onend  : null
                }) {
      let tmp           = this._splitText(text)
      let splitedSpeech = tmp[0], speechIndex = tmp[1]
      let utterances    = [], len = splitedSpeech.length
      for (let i = 0; i < len; i++) {
         let scentenceLen = speechIndex.filter((x) => x === speechIndex[i]).length
         utterances[i]    = i !== len - 1
            ? this._utterize(splitedSpeech[i], i, speechIndex[i], scentenceLen, 0.95, callbacks)
            : this._utterize(splitedSpeech[i], i, speechIndex[i], scentenceLen, 0.95, {
               onstart: callbacks.onstart,
               onend  : function () {
                  callbacks.onend()
                  console.log('----- end of speech -----')
                  if (bgMusic.enable) {
                     fadeOut()
                  }
               }
            })
      }
      return utterances
   }
   
   speechIt(scentences = this.utterances) {
      if (typeof(scentences) === 'string') return this.speak(scentences)
      for (let i = 0; i < this.loop; i++) {
         for (let utter of scentences) {
            speechSynthesis.speak(utter)
         }
      }
   }
   
   speak(text /*:string*/) {
      let self        = this
      self.utterances = self.createSpeech(text, {
         onstart: self._onstart,
         // NOTE: <untested>.........................
         onerror: self._onerror,
         onpause: self._onpause,
         // NOTE: </untested>------------------------
         onend  : self._onend
      })
      self.speechIt()
   }
   
   _onstart() {console.log('start')}
   
   onstart(fn) { this._onstart = fn}
   
   _onend() {console.log('end')}
   
   onend(fn) { this._onend = fn }
   
   _onerror() {console.log('error')}
   
   onerror(fn) { this._onerror = fn }
   
   _onresume() {console.log('resume')}
   
   onresume(fn) { this.onresume = fn }
   
   _onpause() {console.log('pause')}
   
   onpause(fn) { this.onpause = fn }
   
}


class SpeechContainer {
   /*
   rendering speech content, so that it can be trackable.
   public methods:
   */
   constructor(settings/*:{element:HTMLElement, id:number, initialize:boolean, tts:TTSModule}*/) {
      this.el             = settings.element
      this.initialize     = settings.initialize || false
      this.blockId        = settings.id
      this.tts            = settings.tts
      this.text           = this.el.innerText.trim().replace('\n', '')
      this.origHTML       = this.el.innerHTML
      this.scentenceIndex = 0
      if (this.initialize) this.initializeContent()
      this.setWeight()
      this.initializedHtml = this.el.innerHTML
   }
   
   static wrapTag(tag /*:string*/, text /*:string*/, props /*:{[string]:any} | Function*/) {
      let propInSerial = ''
      if (props.constructor.name === 'Function') props = props()
      for (let key in props) {
         propInSerial += `${key}=${props[key]} `
      }
      return `<${tag} ${propInSerial}  >${text}</${tag}>`
   }
   
   static highLightText(text, color = '#fff') {
      return `<span style="background-color:${color}">${text}</span>`
   }
   
   // FIXME: reimplement
   getWeight(i) {
      return 0
   }
   
   setWeight(fn) {
      let self = this
      if (fn === undefined) {
         this.getWeight = (i) => getWeight(self.blockId, i)
      } else {
         this.getWeight = (i) => fn(i, self.blockId)
      }
   }
   
   initializeContent() {
      let text          = this.text
      let self          = this
      this.el           = this.styleInit()
      this.el.innerHTML = text.split('.').map((e, i) => {
         let w = self.getWeight(i)
         return SpeechContainer.wrapTag('tts', e + '.', () => {
            return {
               index : i,
               weight: w,
               style : `font-size:${parseInt(14 + w / 3)}px`
            }
         })
      }).join('')
      
   }
   
   styleInit() {
      this.el.innerHTML = `<span style="font-family: "verdana" , sans-serif; font-size: x-small;">${this.text}</span>`
      return this.el.querySelector('span')
   }
   
   select(index) {
      let tagtarget       = this.el.children[index]
      let tagHtml         = tagtarget.innerHTML
      let tagText         = tagtarget.innerText
      let renderedHtml    = SpeechContainer.highLightText(tagText)
      this.scentenceIndex = index
      tagtarget.innerHTML = tagHtml.replace(tagText, renderedHtml)
   }
   
   deselect() {
      this.el.innerHTML = this.initializedHtml
   }
   
   makeContentClickable() {
      let self = this
      Array.from(this.el.children).forEach((e, i) => {
         e.addEventListener('click', function () {
            console.log('click', e, i)
            self.tts.interuptSpeech()
            self.scentenceIndex = e.scentenceIndex
            self.tts.speechIt(self.tts.utterances.filter((e) => e.scentenceIndex === i))
         })
      })
   }
   
}


class SpeechController {
   constructor(tts) {
      this.tts        = tts
      this.paragraphs = {}
   }
   
   addContent(el, blockId, initialize = true) {
      this.paragraphs[blockId] = new SpeechContainer({element: el, id: blockId, tts: this.tts, initialize: initialize})
   }
   
   getProgressFn(acc, blockId) {
      let self = this
      return function (e) {
         let len          = self.tts.utterances.length
         let notPlayedYet = len === 0
         let container    = self.paragraphs[blockId]
         if (acc > 0) {
            container.scentenceIndex = container.scentenceIndex >= len - 1 ? 0 : container.scentenceIndex + acc
         } else if (acc < 0) {
            container.scentenceIndex = container.scentenceIndex <= 0 ? len - 1 : container.scentenceIndex + acc
         }
         console.log(container.scentenceIndex, self.tts.utterances[container.scentenceIndex], self.tts.utterances)
         if (speechSynthesis.speaking) self.tts.interuptSpeech()
         if (notPlayedYet) {
            self.playParagraph(blockId)
         } else {
            speechSynthesis.speak(self.tts.utterances[container.scentenceIndex])
         }
      }
   }
   
   nextScentence(blockId) {
      this.getProgressFn(1, blockId)()
   }
   
   prevScentence(blockId) {
      this.getProgressFn(-1, blockId)()
   }
   
   repeatScentence(blockId) {
      this.getProgressFn(0, blockId)()
   }
   
   stopParagraph() {
      
      this.tts.interuptSpeech()
   }
   
   playParagraph(blockId/*:number*/, initialize = true) {
      let tts     = this.tts
      let content = this.paragraphs[blockId]
      if (speechSynthesis.speaking) {        // eslint-disable-line
         if (!playing) {
            speechSynthesis.resume()
         } else {
            speechSynthesis.pause()
         }
      } else {
         tts.onstart(function () {
            console.log('0 start', content.text)
            tts.speechInterupted = false
            content.deselect()
            content.select(this.scentenceIndex)
            // re -register click event
            content.makeContentClickable()
         })
         tts.onend(function () {
            if (tts.speechInterupted) {
               console.log('end - cancel')
               //NOTE: <untested>
               //speechSynthesis.cancel()
               //NOTE: <untested>
               return
            }
            console.log('1 end')
            content.el.innerHTML = content.initializedHtml
            let key              = `${blockId},${this.scentenceIndex}`
            if (key) {
               playHistoryData[key] = playHistoryData[key] === undefined ? 0 : playHistoryData[key]
               playHistoryData[key] = playHistoryData[key] + 1 / this.scentenceDivs
            }
            // re -register click event
            content.makeContentClickable()
         })
         
         tts.speechIt(content.text)
         bgMusic.volume      = 0
         bgMusic.currentTime = musicStartTime
         if (bgMusic.enable) {
            bgMusic.play()
            fadeIn()
         }
      }
   }
}

//FIXME: not tested yet
class SpeechComponentBuilder extends ComponentHelper {
   constructor(speechController) {
      super()
      this.controller = speechController
      this.components = {}
   }
   
   init(content_block, blockId) {
      this.controller.addContent(content_block, blockId)
      let vocabulary_section = document.createElement('section')
      let playback_section   = this.genPlayBackComponent(content_block, blockId)
      let toggleOrig_section = this.genToggleOriginalComponent(vocabulary_section, playback_section, content_block, blockId)
      let progress_section   = this.genProgressControlComponent(content_block, blockId)
      
      content_block.before(toggleOrig_section)
      content_block.prepend(playback_section)
      content_block.append(progress_section)
      content_block.append(vocabulary_section)
      
   }
   
   genToggleOriginalComponent(vocabulary_section, playback_section, content_block, blockId) {
      let toggleOrig_section = document.createElement('section')
      let orderWeight        = getWeightStatisticsByBlockId(blockId)
      let text               = content_block.innerText
      let self               = this
      let voice_bt           = playback_section.querySelector('select[name=voices]')
      let tts                = self.controller.tts
      let container          = self.controller.paragraphs[blockId]
      
      orderWeight = orderWeight === 0 ? '' : orderWeight
      toggleOrig_section.setAttribute('id', 'tts' + blockId)
      toggleOrig_section.setAttribute('class', 'tts')
      
      if (permission.showOriginal || ['zh-tw', 'zh-cn', 'zh-cht'].indexOf(LANGUAGE) !== -1) {
         toggleOrig_section.innerHTML = `<a>[顯示/隱藏 原文]${orderWeight}</a>`
      } else {
         toggleOrig_section.innerHTML = ''
         return toggleOrig_section
      }
      
      // show original
      toggleOrig_section.addEventListener('click', function (link_href) {
         voice_bt.innerHTML     = self.genOption('voices', tts.pickupVoices.map(v => v.name), {}, tts.voice).innerHTML
         voice_bt.selectedIndex = speechVoice
         
         self.renderVocComponent(vocabulary_section, text, content_block, blockId)
         //voice_bt.addEventListener('change', voiceChange)
         
         link_href.preventDefault()
         let display = content_block.style.display
         if (display === 'none' || display === "") {
            console.log('show', this.el)
            content_block.style.display         = "block"
            content_block.children[1].innerHTML = container.initializedHtml
         } else {
            content_block.style.display = 'none'
            console.log('hide', content_block)
         }
      })
      return toggleOrig_section
   }
   
   genProgressControlComponent(content_block, blockId) {
      let controller             = this.controller
      let progress_section       = document.createElement('section')
      let progresshtml           =
             ` <hr><input name="prev" type="button" value=" ⏮ ">
            <input name="repeat" type="button" value=" ️▶️">
            <input name="next" type="button" value=" ⏭️ ">`
      progress_section.innerHTML = progresshtml
      progress_section.className = 'progress_section'
      let repeat_bt              = progress_section.querySelector('input[name=repeat]')
      let prev_bt                = progress_section.querySelector('input[name=prev]')
      let next_bt                = progress_section.querySelector('input[name=next]')
      
      next_bt.addEventListener('click', () => {controller.nextScentence(blockId) })
      prev_bt.addEventListener('click', () => {controller.prevScentence(blockId)})
      repeat_bt.addEventListener('click', () => {controller.repeateScentence(blockId)})
      return progress_section
   }
   
   genPlayBackComponent(content_block, blockId) {
      let playback_section       = document.createElement('section')
      let tts                    = this.controller.tts
      let controller             = this.controller
      let voice_html             = this.genOption('voices', tts.pickupVoices.map(v => v.name), {}, tts.voice).outerHTML
      let bthtml                 = `<input name="play" type="button" value="      ▶️     ">
                     <input name="stop" type="button" value=" ⏹️">
                     <select name="speed">
                        <option value="0.9"> ⚡ slow</option>
                        <option value="1" selected> ⚡ normal</option>
                        <option value="1.1"> ⚡ fast</option>
                     </select>
                     <select name="loop">
                        <option value="1" selected> 🔁 1</option>
                        <option value="3"> 🔁 3</option>
                        <option value="5"> 🔁 5</option>
                     </select>
                     ${voice_html}
                     <input name="bgm" type="button" value="BGM on/off">
                     <a href="http://sampleswa  p.org/mp3/song.php?id=105">BGM</a> `
      playback_section.innerHTML = bthtml
      
      let play_bt  = playback_section.querySelector('input[name=play]')
      let stop_bt  = playback_section.querySelector('input[name=stop]')
      let bgm_bt   = playback_section.querySelector('input[name=bgm]')
      let speed_bt = playback_section.querySelector('select[name=speed]')
      let loop_bt  = playback_section.querySelector('select[name=loop]')
      let voice_bt = playback_section.querySelector('select[name=voices]')
      
      let speedChange = function (e) {
         tts.speed = parseFloat(this.value) || tts.speed
         for (let utterance of tts.utterances) {
            utterance.rate = tts.speed
         }
      }
      
      let loopChange = function (e) {
         tts.loop = parseInt(this.value) || tts.loop
      }
      
      let voiceChange = function (e) {
         console.log('change', this.selectedIndex)
         tts.utterances.forEach(x => {x.voices = tts.pickupVoices[tts.voice]})
         tts.voice = this.selectedIndex || tts.voice
      }
      
      speed_bt.addEventListener('change', speedChange)
      loop_bt.addEventListener('change', loopChange)
      voice_bt.addEventListener('change', voiceChange)
      bgm_bt.addEventListener('click', function (input_bt) {
         if (bgMusic.enable) {
            bgMusic.pause()
         } else {
            bgMusic.play()
         }
         bgMusic.enable = !bgMusic.enable
      })
      
      stop_bt.addEventListener('click', function (input_bt) {
         tts.interuptSpeech()
      })
      play_bt.addEventListener('click', function (input_bt) {
         controller.playParagraph(blockId)
      })
      return playback_section
   }
   
   renderVocComponent(vocabulary_section, paragraph_text, el, blockId) {
      if (!DB) return
      let vocs     = []
      let vocWidth = 14
      
      vocabulary_section.className = 'vocabulary_section'
      for (let key in DB.data) {
         key = key.trim()
         if (paragraph_text.indexOf(key) !== -1 && key) {
            vocs.push([key].concat(DB.data[key]))
         }
      }
      if (vocs.length === 0) vocs = [['', '']]
      //Helper.genOption('vocabulary', vocs.map(x => x[0]).filter(x => x.length > 0), {size: 7}).outerHTML
      let vocListComp                = vocs.map(x => x[0]).filter(x => x.length > 0).map(x => this.genInput({
         type : 'button',
         value: x.slice(0, vocWidth),
         word : x
      }).outerHTML).join('')
      let vocContentComp             = vocs[0].slice(1).map(x => `<section>${x}</section>`).join('')
      let template                   = ` <div class="lcol">
                              <section class="vocabularyList">
                                 ${vocListComp}
                              </section>
                          </div>
                          <div class="rcol editable">
                              <section>
                                 ${vocContentComp}
                              </section>
                           </div>`
      vocabulary_section.innerHTML   = template
      vocContentComp                 = vocabulary_section.querySelector('div.rcol')
      vocContentComp.contentEditable = true
      
      let changeVoc   = function (e) {
         let word                 = this.getAttribute('word')
         let data                 = vocs[vocs.findIndex(x => x[0] === word)]
         vocContentComp.innerHTML = data.slice(1).map(x => `<section>${x}</section>`).join('')
      }
      let editContent = function (e) {
         let voc_key = vocs[vocListComp.selectedIndex][0]
         console.log('edit content under key:', voc_key, this.innerHTML)
         let new_voc = [voc_key].concat(this.querySelectorAll('section').map(x => x.innerText))
         DB.update(new_voc)
      }
      vocListComp     = el.querySelectorAll('section.vocabularyList > input')
      vocListComp.forEach(x => {x.addEventListener('click', changeVoc)})
      vocContentComp.addEventListener('input', editContent)
      console.log('template:', template)
      return vocabulary_section
   }
}

//TODO: articleController
class ArticleController {
   constructor(controller) {
      this.controller = controller
      this.tts        = controller.tts
   }
   
   expandAll() {
   
   }
   
   collapseAll() {
   
   }
   
   showMostNoticeable() {
   
   }
   
   hideMostUnoticable() {
   
   }
   
   dumpData() {
   
   }
}


function entryTest(tts, content_block, blockId, state = 'play', initialize = true) {
   let controller = new SpeechController(tts)
   controller.addContent(content_block, blockId, initialize)
   controller.playParagraph(blockId, initialize)
   return controller
}


function compInitTest() {
   let tts         = new SpeechModule({speed: speechRate, voice: speechVoice})
   let controller  = new SpeechController(tts)
   let compBuilder = new SpeechComponentBuilder(controller)
   origs.forEach((e, i) => {
      compBuilder.init(e, i)
   })
   origs2.forEach((e, i) => {
      compBuilder.init(e, i)
   })
}


// NOTE: </SpeechProgress>


class DataBase {
   constructor(path, suffix = 'vocabulary', structure = {spliter: '🏴󠁨󠁲󠀱󠀷󠁿', subspliter: '📝'}) {
      let _path       = path === undefined ? window.location.pathname + '/' + suffix : path + '/' + suffix
      let data        = localStorage.getItem(_path)
      this.spliter    = structure.spliter
      this.subspliter = structure.subspliter
      this.data       = {}
      if (data !== null) this.readRawData(data)
      this.path = _path
   }
   
   readRawData(raw_string, compressed = true) {
      let data = compressed ? Decompress(raw_string) : raw_string
      for (let raw_rec of data.split(this.spliter)) {
         if (raw_rec) {
            let rec = raw_rec.split(this.subspliter)
            this.update(rec)
         }
      }
      
   }
   
   del(key) {
      delete this.data[key]
   }
   
   dumpAll() {
      let content = ''
      for (let key in this.data) {
         if (key) {
            content += this.spliter + key
            for (let subv of this.data[key]) {
               content += this.subspliter + subv
            }
         }
      }
      localStorage.setItem(this.path, Compress(content))
   }
   
   overwrite(recs) {
      this.data[recs[0]] = recs.slice(1)
   }
   
   update(recs) {
      if (this.data[recs[0].trim()]) {
         let prev_data = this.data[recs[0].trim()]
         for (let rec of recs.slice(1)) {
            if (prev_data.indexOf(rec) === -1) {
               prev_data.push(rec)
            }
         }
      } else {
         this.data[recs[0].trim()] = recs.slice(1)
      }
      
   }
   
   bulkUpdate(recs) {
      if (recs.__proto__.constructor.name === 'Array') {
         for (let rec of recs) {
            this.update(rec)
         }
      } else if (recs.__proto__.constructor.name === 'Object') {
         let ret = []
         for (let key in recs) {
            ret.push([key.trim()].concat(recs[key]))
         }
         this.bulkUpdate(ret)
      }
   }
}

function getWeight(blockId, scentenceId) {
   return playHistoryData[blockId + ',' + scentenceId] || 0
}

function getWeightStatisticsByBlockId(id) {
   let scentences = 0, key, weight = 0, highestW = 0
   for (key in playHistoryData) {
      if (parseInt(key.split(',')[0]) === id) {
         scentences += 1
         if (playHistoryData[key]) {
            weight += playHistoryData[key] + playHistoryData[key] * parseInt(playHistoryData[key] / 20)
            highestW = Math.max(highestW, playHistoryData[key])
         }
      }
   }
   return [parseInt(weight / scentences) || '', highestW]
}
function storePlayHistory() {
   let content = ''
   for (let key in playHistoryData) {
      if (key) content += key + '@' + parseInt(playHistoryData[key]) + ';'
   }
   localStorage.setItem(pathName, Compress(content))
}

function restorePlayHistory() {
   let rawContent = localStorage.getItem(pathName)
   if (rawContent !== null) {
      for (let rec of Decompress(rawContent).split(';')) {
         playHistoryData[rec.split('@')[0]] = parseInt(rec.split('@')[1])
      }
   }
   if (raw_vocabulary) {
      DB = new DataBase()
      DB.readRawData(raw_vocabulary.innerText, false)
      raw_vocabulary.innerText = ''
   }
}

window.onbeforeunload = storePlayHistory
restorePlayHistory()

compInitTest()


