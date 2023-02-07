<template>
   <section id="humandesignComp" style="float:left">
      <section id="birthField"></section>
      <section id="kabalaLoading" class="loading">{{loadingText}}</section>
      <br>
      <h2>Unofficial</h2>
      <h4>human design calculator</h4>
      <h4>PROTOTYPE</h4>
      <kabala :scale=0.8 style="margin-top:50px"></kabala>
      <br>
      <p class="print_title inTextContent">result list: </p>
      <pre class="print_content inTextContent">{{ crossinfo }}</pre>

   </section>
</template>

<script>
   //import {mobileConsoleInit} from '../util'
   // human design
   import {
      RawHoroscope,
      printGateInfo,
      channelsData,
      gatesData
   } from '../humandesign.js'

   import fetch from 'node-fetch'
   import CKabala from '../components/kabalaComp.vue'
   import {datGUI, default_preset, STORAGE_HASH} from '../datGUI'
   import $GA from '../googleAnalytics'
   import {getIPInfo} from '../geocode'
   import {LocalDataBase, MAJOR_CITY_DATA, cachedQuery} from '../storage'
   import {TConsole, eCOLORS} from '../console_addon'

   const Log  = new TConsole('HD', eCOLORS.current, [/VueComponent./, 'HD.'])
   const _ = require("lodash")
   const COMPRESSED = true
   const DB = window.DB = new LocalDataBase(String($GA.clientId), COMPRESSED)
   window.$GA = $GA
   console.group("-----------humandesign.js-------------")
   console.info(channelsData)
   console.info(gatesData)
   console.groupEnd()
//   Log.suppressLevel([eCOLORS.info])

   export default {
      props     : {
         width : {
            type     : Number,
            'default': 1280
         },
         height: {
            type     : Number,
            'default': 720
         }
      },
      components: {
         kabala: CKabala
      },
      data () {
         return {
            
            astro_sign         : "capricon",
            birth              : "1985/12/30 3:45",
            sing_selected      : 1,
            sign_option        : [
               {text: 'Aries牧羊', value: 1},
               {text: 'Torus金牛', value: 2},
               {text: 'Gemini雙子', value: 3},
               {text: 'Cancer巨蝎', value: 4},
               {text: 'Lion獅子', value: 5},
               {text: 'Virgo處女', value: 6},
               {text: 'Libra天秤', value: 7},
               {text: 'Scorpio天蝎', value: 8},
               {text: 'Sagitarius射手', value: 9},
               {text: 'Capricon魔羯', value: 10},
               {text: 'Aquarius水瓶', value: 11},
               {text: 'Pices雙魚', value: 12}
            ],
            hd                 : null,
            crossinfo          : "loading data ...",
            Kabala             : null,
            datGUI             : null,
            datMENU            : null,
            menuBirthField     : null,
            userId             : String($GA.clientId),
            language           : $GA.language,
            birth_year         : 1985,
            birth_month        : 12,
            birth_day          : 30,
            birth_hour         : 11,
            birth_minutes      : 45,
            birth_country      : null,
            birth_city         : null,
            birth_date         : '1985/12/30 11:45',
            gui_holder         : null,
            loadingText        : 'loading data please wait ...',
            _loadingIntervalId : 0,
            COUNTRIES          : _.keys(MAJOR_CITY_DATA),
            ip                 : null,
            user_country       : null,
            isFirstEnteringSite: false,
            debouncedCalls     : {}
         }
      },

      computed: {
         birthDate: function () {
            this._genBirthDate()
            Log.l('birthDate:', this.birth_date)
            return this.birth_date
         },
         timestamp: function () {
            return DB['timestamp']
         }
      },
      watch   : {
         birth_year   : function () {this.fetchBirthData()},
         birth_month  : function () {this.fetchBirthData()},
         birth_day    : function () {this.fetchBirthData()},
         birth_hour   : function () {this.fetchBirthData()},
         birth_minutes: function () {this.fetchBirthData()},
         birth_country: function () { console.warn('country changed', this.birth_country)},
         birth_city   : function () {this.fetchBirthDataImmediately(...this.getBirthQueryData())}
      },
      methods : {
         _isFirstEnteringSite(){
            return localStorage.getItem(STORAGE_HASH) === null
         },
         renewTimestamp(){
            DB['timestamp'] = Date.now()
         },
         getKabala(){
            return _.filter(this.$children, (e) => {return e.$el.id === "kabalaTree"})[0]
         },
         onDataLoaded(status){
            this.Kabala = this.getKabala()
            this.Kabala.initialize(this.hd, channelsData)
            if (status === 'ok') {
               this.datGUI.save()
               this.renewTimestamp()
            }
         },
         _genBirthDate(){
            let y           = this.birth_year,
                m           = this.birth_month,
                d           = this.birth_day,
                h           = this.birth_hour,
                s           = this.birth_minutes
            this.birth_date = `${y}/${m}/${d} ${h}:${s}`
         },
         getBirthQueryData(){
            return [this.birthDate, this.birth_city + ', ' + this.birth_country]
         },
         saveUserStatistics(){
            //            TODO:
            let data = {
               belongs : this.user_id,
               language: this.language
            }
            fetch('/saveUserStatistics', {
               method : 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body   : JSON.stringify(data)
            })
         },
         saveUserData(userdata){
            //            TODO:
            fetch('/saveUserData', {
               method : 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body   : JSON.stringify(userdata)
            })
         },
         fetchBirthData(debounce_time = 2500, leading = false, trailing = true){
            this._genBirthDate()
            this.crossinfo = 'loading data ...'

            if (this.menuBirthField) this.menuBirthField.updateDisplay()

            this._fetchBirthData(debounce_time, leading, trailing)
            let counter = 0
            clearInterval(this._loadingIntervalId)
            this._loadingIntervalId = setInterval(() => {
               counter++
               this.loadingText = 'fetching birth data please wait ... \n(Average Waiting TIme: 10)\n' + counter
            }, 500)
         },

         fetchBirthDataImmediately(date, location){
            let self = this
            if (this.debouncedCalls['fetchBirthData']) this.debouncedCalls['fetchBirthData'].cancel()

            self.hd = new RawHoroscope(date, location)
            self.$el.querySelector('#kabalaLoading').setAttribute('class', 'loading')

            self.hd.fetch(function success(ins, status) {
               self.crossinfo   = printGateInfo(ins)
               self.loadingText = 'birth data fetched!'
               clearInterval(self._loadingIntervalId)
               self.$el.querySelector('#kabalaLoading').setAttribute('class', 'loaded')
               self.onDataLoaded(status)

               return self.crossinfo
            }, function failed() {
               self.crossinfo   = 'failed to fetch hd data'
               self.loadingText = 'failed to fetch human design data'
               clearInterval(self._loadingIntervalId)
               self.$el.querySelector('#kabalaLoading').setAttribute('class', 'failed')
               self.$el.querySelector('#kabalaLoading').addEventListener('click',
                  self.onFailedClick(self.$el.querySelector('#kabalaLoading')))
               _.debounce(() => {
                  self.$el.click()
               }, 4000)
            })
         },

         _fetchBirthData  (){
            let self = this
            if (!this.debouncedCalls['fetchBirthData']) {
               self.debouncedCalls['fetchBirthData'] = _.debounce(function () {
                     self.fetchBirthDataImmediately(...self.getBirthQueryData())
                  }, 2500, {leading: false, trailing: true}
               )
            }
            this.debouncedCalls['fetchBirthData']()
         },
         onFailedClick(el){
            let wrapper = function () {
               el.setAttribute('class', 'loaded')
               el.removeEventListener('click', wrapper)
               Log.l('click')
            }
            return wrapper
         },

         datGUIInit(){
            let self = this
            let gui  = this.datGUI = new datGUI.GUI({
               width          : 400, autoPlace: false, load: default_preset, preset: 'Elton John',
               useLocalStorage: true
            })
            gui.remember(this)
            gui.useLocalStorage = true
            let current_preset = gui.load.remembered[gui.load.preset][0]
            let menu            = this.datMENU = gui.addFolder('輪入出生日期')
            if (current_preset.birth_city === null)     current_preset.birth_city = this.birth_city =  'Taipei'
            if (current_preset.birth_country === null)   current_preset.birth_country = this.birth_country =  'Taiwan'

            menu.add(this, 'birth_year', 1930, 2020).step(1).name('year')
            menu.add(this, 'birth_month', 1, 12).step(1).name('month')
            menu.add(this, 'birth_day', 1, 31).step(1).name('day')
            menu.add(this, 'birth_hour', 0, 24).step(1).name('hour')
            menu.add(this, 'birth_minutes', 0, 59).step(1).name('minutes')
            let country_controller = menu.add(this, 'birth_country', this.COUNTRIES).name('country')
            let city_controller    =
                   [menu.add(this, 'birth_city', MAJOR_CITY_DATA[self.birth_country] || ['loading ...']).name('city')]


            //           NOTE: refresh city fields when selecting country field
            country_controller.__onFinishChange = function (v) {
               console.warn('set birth_country:', v, self.isFirstEnteringSite, self.birth_country, MAJOR_CITY_DATA[v])
               country_controller.__select.selectedIndex = self.COUNTRIES.indexOf(v)
               city_controller[0].remove()
               self.menuBirthField.remove()
               city_controller.pop()
               city_controller.push(menu.add(self, 'birth_city', MAJOR_CITY_DATA[v]).name('city'))
               city_controller[0].__select.selectedIndex = 1
               self.birth_city                           = city_controller[0].__select.selectedOptions[0].innerText
               self.menuBirthField                       = menu.addConst(self, 'birth_date', '#222').name('Birth Date')

            }
            menu.domElement.parentElement.parentElement.querySelector('li.save-row').classList.add('users_icon')
            this.menuBirthField = menu.addConst(this, 'birth_date', '#222').name('Birth Date')
            this.gui_holder.appendChild(gui.domElement);
         },

         defaultsInit(){
            let self = this
            this.timeStamps          = [Date.now()]
            this.isFirstEnteringSite = this._isFirstEnteringSite()
            if (self.isFirstEnteringSite) {
               self.birth_city    = 'Taipei'
               self.birth_country = 'Taiwan'
            }
            (async () => {
               await getIPInfo((res) => {
                  try {
                     this.ip = res.ip
                     if (self.isFirstEnteringSite) {
                        console.warn('first entering site')
                        if (res.country in MAJOR_CITY_DATA) {
                           this.birth_country = res.country
                           this.birth_city    = MAJOR_CITY_DATA[res.country][0]
                           DB ['user_country'] = res.country
                        }
                     }
                     this.user_country = res.country
                     console.warn('user country lookup from ip:', res.country)
                  } catch (e) {

                  }
                  self.datGUIInit()
               })
            })()

         }
      },
      beforeDestroy(){
         this.saveUserStatistics()
      },
      mounted(){
         let self        = this
         this.gui_holder = this.$el.querySelector('section#birthField')
         this.defaultsInit()


      }

   }
</script>

<style lang="styl">
   @import '../themes/humandesign.styl'
</style>
