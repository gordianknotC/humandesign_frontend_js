/* eslint-disable flowtype/require-parameter-type */
// @flow
// Kamihq
/*::
type Attributes = {
  [string]: any
};
*/


const COMMENT_SELECTOR = 'div.commentBody div.actual-comment div.comment'
const REPLY_SELECTOR   = 'div.commentBody div.replies div.actual-reply div.comment'
const TOOLBAR_SELECTOR = 'div#secondaryToolbar'
const TOOLBAR_CLS      = 'secondaryToolbarButton'
const ID_SPEECHVOICES  = 'speechVoices'
const ID_SPEECHLOOP    = 'speechLoop'
const DICT_API         = 'http://apii.dict.cn/mini.php?q='

const Compress     = LZString.compress                // eslint-disable-line
const Compress64   = LZString.compressToBase64        // eslint-disable-line
const Decompress   = LZString.decompress              // eslint-disable-line
const Decompress64 = LZString.decompressFromBase64    // eslint-disable-line

var Kami = {}


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
   
   genInput(attributes){
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


class LocalDataBase {
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
            let rec           = raw_rec.split(this.subspliter)
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


class KamiUtil {
   //  ======================================
   //             U T I L I T I E S
   // =======================================
   indexNodeList(lines, node) {
      for (let line of lines.entries()) {
         if (line[1] === node) return line[0]
      }
   }
   
   splitChineseNEnglish(text) {
      let code     = 0
      let lan      = 'en'
      let newText  = true
      let ret      = []
      let last_t   = null
      let last_lan = null
      for (let t of text) {
         code = t.charCodeAt(0)
         if (code <= 8222) {
            if (lan !== 'en') newText = true
            lan = 'en'
         } else {
            if (lan !== 'ch') newText = true
            lan = 'ch'
         }
         if (newText) {
            if (last_lan === 'ch' && code <= 8222 && !(code >= 65 && code <= 122)) {
               lan = 'ch'
            } else {
               ret.push({lan: lan, content: ''})
            }
         }
         ret[ret.length - 1].content += t
         //console.log(t, code, newText)
         newText  = false
         last_t   = t
         last_lan = lan
      }
      return ret
   }
   
   // =========================================
   //             B O D Y
   // =========================================
   constructor() {
      this.helper = new ComponentHelper()
      this.init()
   }
   
   voicesInit() {
      const VOICES        = speechSynthesis.getVoices()
      const GOOGLE_VOICES = VOICES.filter((x) => ['Google UK English Female', 'Google UK English Male', 'Google US English',
                                                  'Google 國語（臺灣）'].indexOf(x.name) !== -1)
      const AMAZON_VOICES = VOICES.filter((x) => x.name.indexOf('Amazon British') !== -1)
      const VOICES_PICKUP = AMAZON_VOICES.concat(GOOGLE_VOICES)
      this.GOOGLE_VOICES  = GOOGLE_VOICES
      this.AMAZON_VOICES  = AMAZON_VOICES
      this.VOICES_PICKUP  = VOICES_PICKUP
   }
   
   genUtterance(text, voice_n = 0) {
      let utterance   = new SpeechSynthesisUtterance(text)
      utterance.voice = this.VOICES_PICKUP[voice_n]
      return utterance
   }
   
   speak(text, voice_n = 0, loop = 1) {
      if (typeof(text) === 'string') text = this.splitChineseNEnglish(text)
      for (let i = 0; i < loop; i++) {
         for (let section of text) {
            if (section.lan === 'en') {
               speechSynthesis.speak(this.genUtterance(section.content, voice_n))
            } else {
               speechSynthesis.speak(this.genUtterance(section.content, this.VOICES_PICKUP.length - 1))
            }
            
         }
      }
      
   }
   
   speakSelectedText() {
      let voice_n = document.querySelector(`select#${ID_SPEECHVOICES}`).selectedIndex
      let loop    = document.querySelector(`select#${ID_SPEECHLOOP}`).selectedOptions[0].innerText
      for (let i = 0; i < 5; i++) speechSynthesis.cancel()
      this.speak(this.getKamihqSelectedText(), voice_n, parseInt(loop))
   }
   
   init() {
      let self = this
      this.resizeComment(30)
      setTimeout(() => self.toolbarButtonInit(), 4000)
      setTimeout(() => {self.db = new LocalDataBase(document.title)}, 4000)
      console.log('Kami Init')
   }
   
   getKamihqComment(n) {
      let raw  = document.querySelectorAll('div.commentBody')
      let recs = document.querySelectorAll(COMMENT_SELECTOR)
      
      if (n === undefined) return recs
      return n >= 0 ? [recs[n],
                       recs[n].parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('div.actual-reply div.comment')] :
         [recs[recs.length + n],
          recs[recs.length + n].parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('div.actual-reply div.comment')]
   }
   
   getKamihqCommentList() {
      let comments = this.getKamihqComment()
      let ret      = []
      comments.forEach((c, index) => {
         let reply   = c.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('div.actual-reply div.comment')
         // eslint-disable-next-line
         let content = [c.innerText].concat(reply[0] == null ? [''] : Array.map(reply, r => r.innerText))
         ret.push(content)
      })
      return ret
   }
   
   resizeComment(size = 22) {
      document.querySelectorAll('div.commentBody').forEach(e => {
         e.style.width                                        = size + 'vw'
         let author                                           = e.querySelector('div.author')
         author.querySelector('div.dual-lines').style.display = 'none'
         author.style.float                                   = 'left'
         author.style.width                                   = '40px'
         let authors                                          = e.querySelectorAll('div.actual-reply div.author')
         if (authors.length > 0) {
            console.log('authors:', authors)
            for (let author of authors) {
               author.querySelector('div.dual-lines').style.display = 'none'
               author.style.float                                   = 'left'
               author.style.width                                   = '30px'
            }
         }
         
      })
   }
   
   toolbarButtonInit() {
      let resizeEl = this.helper.genButton('resizeComments', {
         id     : 'resizeToolbar',
         class  : TOOLBAR_CLS,
         onClick: 'window.Kami.resizeComment(30)'
      })
      let speak    = this.helper.genButton('speakText', {
         id     : 'speakToolbar',
         class  : TOOLBAR_CLS,
         onClick: 'window.Kami.speakSelectedText()'
      })
      this.voicesInit()
      let voiceOptions = this.helper.genOption('voices', this.VOICES_PICKUP.map(v => v.name), {id: ID_SPEECHVOICES})
      let loopOptions  = this.helper.genOption('loop', [1, 3, 5], {id: 'speechLoop'})
      let speakDiv     = this.helper.genDiv([speak, loopOptions, voiceOptions], {id: ID_SPEECHLOOP})
      this.insertToolbarButton(resizeEl)
      this.insertToolbarButton(speakDiv)
   }
   
   insertToolbarButton(element) {
      let toolbar = document.querySelector(TOOLBAR_SELECTOR)
      toolbar.appendChild(element)
   }
   
   getKamihqSelectedText() {
      let currentPage = window.getSelection().extentNode.parentNode.parentNode.parentNode
      let lines       = currentPage.querySelectorAll('div.parent-word')
      let lineR       = window.getSelection().extentNode.parentNode.parentNode
      let wordR       = window.getSelection().extentNode.parentElement
      let posR        = lineR.innerText.indexOf(wordR.innerText)
      let lineL       = window.getSelection().anchorNode.parentNode.parentNode
      let wordL       = window.getSelection().anchorNode.parentElement
      let posL        = lineL.innerText.indexOf(wordL.innerText)
      let rflag       = this.indexNodeList(lines, lineR)
      let lflag       = this.indexNodeList(lines, lineL)
      let ret         = lines[lflag].innerText.slice(posL, -1)
      console.log(lflag, rflag, wordL.innerText, wordR.innerText, posL, posR)
      
      for (let l = lflag + 1; l <= rflag - 1; l++) {
         ret += lines[l].innerText
      }
      ret += lines[rflag].innerText.slice(0, posR + wordR.innerText.length)
      console.log(ret)
      return ret
   }
   
   dumpComments() {
      let list       = Kami.getKamihqCommentList()
      let vocabulary = {}
      for (let rec of list) {
         let def        = rec[0]
         let scentences = rec.slice(1)
         let splited    = Kami.splitChineseNEnglish(def)
         if (splited.length === 1) {
         
         } else {
            if (splited.length % 2 !== 0) {console.error('invalid comment definition found', def)}
            else {
               for (let i = 0; i < splited.length; i += 2) {
                  console.assert(splited[i].lan === 'en')
                  if (splited[i].lan === 'en') {
                     vocabulary[splited[i].content] = [splited[i + 1].content].concat(scentences)
                  }
               }
            }
         }
      }
      if (!this.db) this.db = new LocalDataBase(document.title)
      this.db.bulkUpdate(vocabulary)
      this.db.dumpAll()
   }
}

function dumpComments() {
   // NOTE: called before application exit            :
   Kami.dumpComments()
}

if (unsafeWindow.Kami === undefined) {                         // eslint-disable-line
   unsafeWindow.Kami = window.Kami = Kami = new KamiUtil()     // eslint-disable-line
   unsafeWindow.Compress = window.Compress = Compress         // eslint-disable-line
   unsafeWindow.Decompress = window.Decompress = Decompress   // eslint-disable-line
   unsafeWindow.LZString = window.LZString = LZString   // eslint-disable-line
   unsafeWindow.onbeforeunload = dumpComments
   unsafewindow.onblur = dumpComments
}

