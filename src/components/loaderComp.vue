<template>
   <!--
     Replace following "div" with
     "<router-view class="layout-view">" component
     if using subRoutes
   -->
   <div class="layout-headerLoader clearFix">
      <div class="headerLoader-loader loading">
         <slot name="companyLogo">
            <svg class="yesLogo" viewBox="0 0 222.17 56.65">
               <g>
                  <path
                        d="M222.14 20.59v5.86h-2.44v-5.54a5 5 0 0 0 0-.53 2.8 2.8 0 0 0-.12-.55.69.69 0 0 0-.42-.43 3.1 3.1 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.89 3.89 0 0 1 .4 2.09zM213.76 42.26v1.84h-2.23a2.73 2.73 0 0 1-2.11-.76 2.94 2.94 0 0 1-.73-2.1v-4.53H207v-1.83h1.7v-3.37h2.44v3.36h2.61v1.83h-2.61v3.74a2.23 2.23 0 0 0 .28 1.23 1.15 1.15 0 0 0 .75.5 8 8 0 0 0 1.35.09zM211.66 17.25v8.9a5 5 0 0 1-.35 2 2.65 2.65 0 0 1-1.13 1.25 4.44 4.44 0 0 1-2 .41h-4.79V28h4.35a1.28 1.28 0 0 0 1.47-1.44h-3.41a4.41 4.41 0 0 1-1-.28 3.94 3.94 0 0 1-2.07-2.26 5.64 5.64 0 0 1-.35-2 4.29 4.29 0 0 1 .9-3.13 5.94 5.94 0 0 1 1.47-1.13 4.3 4.3 0 0 1 1.12-.32q.56-.07.86-.08h.48zm-2.44 7.35v-5.35h-1.28a6.4 6.4 0 0 0-1.48.17 1.74 1.74 0 0 0-.93.52 2.25 2.25 0 0 0-.56 1.54V22a2.54 2.54 0 0 0 1 2.22 1.59 1.59 0 0 0 .73.31 6.63 6.63 0 0 0 1 .07h1.56zM203.2444 34.9082l2.52-.0105.0387 9.25-2.52.0105zM203.2303 31.5484l2.52-.0106.0096 2.3-2.52.0106zM201.18 38.3v5.86h-2.47v-5.54-.53a3.3 3.3 0 0 0-.12-.55.71.71 0 0 0-.42-.43 2.9 2.9 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.48 6.48 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.84 3.84 0 0 1 .43 2.09zM198.3307 17.319l2.52-.0106.0387 9.25-2.52.0105zM198.3166 13.9492l2.52-.0106.0096 2.3-2.52.0105zM196.6 23.51a3.43 3.43 0 0 1-.22 1.33 3.28 3.28 0 0 1-.44.82 2.93 2.93 0 0 1-.64.59 2 2 0 0 1-1.23.32h-6.26v-1.89h5.14c.87 0 1.3-.32 1.3-.94s-.44-.89-1.3-.89h-2.84c-.17 0-.43 0-.75-.09a2.21 2.21 0 0 1-.9-.35 1.68 1.68 0 0 1-.61-.8 3.52 3.52 0 0 1-.22-1.29q0-2.94 3.25-3h5.22v1.91h-4.75c-.74 0-1.15.21-1.24.62v.3c0 .52.39.77 1.16.76h2.23a4.6 4.6 0 0 1 1.22.14 2.9 2.9 0 0 1 1 .47 2.25 2.25 0 0 1 .66.82 2.62 2.62 0 0 1 .22 1.17zM188.0448 34.972l2.52-.0106.0387 9.25-2.52.0104zM188.0307 31.612l2.52-.0105.0096 2.3-2.52.0105zM186.84 35v1.84h-2.34v7.4H182v-7.4h-1.73V35H182v-1.14a5.94 5.94 0 0 1 .06-.73 1.89 1.89 0 0 1 .3-.81 1.42 1.42 0 0 1 .77-.51 4.25 4.25 0 0 1 1.4-.19h2.33v1.82h-1.02a1.55 1.55 0 0 0-1 .23c-.22.12-.33.38-.33.81V35zM186.36 24.69v1.91h-3.56a4.52 4.52 0 0 1-3.52-1.25 4.79 4.79 0 0 1-1.16-3.35 4.51 4.51 0 0 1 .88-3.1 3.94 3.94 0 0 1 1.79-1.26 6.81 6.81 0 0 1 2-.28h3.56v1.91h-3.23a4.94 4.94 0 0 0-1.25.13 1.21 1.21 0 0 0-.72.52 1.74 1.74 0 0 0-.31 1.12h5.51V23h-5.51a2 2 0 0 0 .26 1.1 1.28 1.28 0 0 0 .73.52 6.64 6.64 0 0 0 1.28.1zM179.1 38.39v5.86h-2.48v-5.54-.53a3 3 0 0 0-.12-.55.68.68 0 0 0-.42-.43 2.93 2.93 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.13.29 2.43 2.43 0 0 1 1.3 1 3.87 3.87 0 0 1 .43 2.09zM177.06 19.82v.77c0 2.21-.45 3.69-1.36 4.47a6.31 6.31 0 0 1-2.3 1.37 9.42 9.42 0 0 1-2.2.23h-5.8l-.05-12.61h5.75a7.21 7.21 0 0 1 3.21.61 3.9 3.9 0 0 1 1.78 1.61 9 9 0 0 1 .74 1.8 7 7 0 0 1 .23 1.75zm-2.87.53a11.27 11.27 0 0 0-.16-1.92 2.8 2.8 0 0 0-.61-1.4 1.78 1.78 0 0 0-.85-.62 4.59 4.59 0 0 0-.74-.13 6.82 6.82 0 0 0-.74 0H168v8.23h3.07a5.68 5.68 0 0 0 1.31-.13 1.88 1.88 0 0 0 .95-.57 2.92 2.92 0 0 0 .67-1.47 11.47 11.47 0 0 0 .18-1.99zM165.4213 31.7067l2.77-.0116.0528 12.61-2.77.0116zM158.86 34.24a12.36 12.36 0 0 1-.18 2.19 12.11 12.11 0 0 1-.73 2.35 5.77 5.77 0 0 1-1.87 2.38 8 8 0 0 1-3.15 1.44 17.11 17.11 0 0 1-4.33.47l-16.42.07v-5.27l15.44-.07a7.52 7.52 0 0 0 3.53-.69 2.63 2.63 0 0 0 1.23-2.55v-.62a3.11 3.11 0 0 0-.66-1.83 3.57 3.57 0 0 0-1.58-.81 9.33 9.33 0 0 0-2.14-.2h-7.28q-4.71 0-7.27-1.93c-1.7-1.31-2.57-3.49-2.58-6.57a10.65 10.65 0 0 1 .76-4.16 6.68 6.68 0 0 1 2.11-2.85 8.37 8.37 0 0 1 3.1-1.42 16.61 16.61 0 0 1 4.28-.46l16.21-.07v5.27l-15.2.09q-4.82 0-4.8 3.85a2.65 2.65 0 0 0 1.11 2.37 4.52 4.52 0 0 0 2.82.8h8.12a24.23 24.23 0 0 1 4.21.31 7.77 7.77 0 0 1 3.46 2q1.79 1.54 1.81 5.91zM127.18 38.05v5.11h-10.37a21.49 21.49 0 0 1-5-.49 10.89 10.89 0 0 1-7.71-7.13 19.43 19.43 0 0 1-1.1-6.42l.08-1.75a14.91 14.91 0 0 1 .31-3.11 22.64 22.64 0 0 1 .81-2.86 11.93 11.93 0 0 1 1.17-2.4 13.79 13.79 0 0 1 1.91-2.3 7.63 7.63 0 0 1 3.05-1.88 18.12 18.12 0 0 1 3.37-.81 24.19 24.19 0 0 1 3.17-.22h10.21v5.11h-10.13a7.13 7.13 0 0 0-5.12 1.76 6.77 6.77 0 0 0-1.79 5.13l17.07-.07v5.1l-17.07.07c0 2.46.46 4.18 1.37 5.17a5.25 5.25 0 0 0 2.59 1.78 14.11 14.11 0 0 0 3.09.26zM103.55 13.89L92.39 30.4l.05 12.9-6.25.03-.05-12.9L75 14.01l6.86-.03 7.32 11.24 7.26-11.3 7.11-.03M62.29 8a8.9 8.9 0 0 1 2.85 8.3c-.72 4.77-1.91 24.74-16.89 34.6-13.37 8.78-29.31 6.18-35.78.46 6.94 2.63 16.15 2.92 24-3.8 9.33-8 11.29-21.09 14.92-29.56 1.3-3 2.67-7.22 4.88-6.67S52.05 9.25 49.91 9s-7.76-.13-9.58 2.73-5.41 12-5.65 12.94-.94 2.06-2 2.06H25c-1.27 0-1.2-1.58-1-2.69s2.12-12.89 6.4-14.39c5.8-2-1.55-1.91-2.15-1.93a12 12 0 0 0-11.16 6.78A95.83 95.83 0 0 0 13 24.95c-1 2.86-.67 9.59 5 9.57l13-.06s-.2 13-13.2 13a16.92 16.92 0 0 1-11.27-4.77c-2.64-2.47-17.11-23.7 8-37.15S61.31 7.2 62.29 8z"/>
               </g>
            </svg>
         </slot>
         <div class="progressLogo">
            <slot name="progressLogo">
               <svg width="60" height="60" viewBox="0 0 80 80">
                  <path d="M40 10c17.351 0 31 13.649 31 30.5S57.351 71 40.5 71 10 57.351 10 40.5 23.649 10 40.5 10z"
                        class="headerLoader-circle"/>
                  <path stroke-dashoffset="333"
                        d="M40 10c17.351 0 31 13.649 31 30.5S57.351 71 40.5 71 10 57.351 10 40.5 23.649 10 40.5 10z"
                        class="headerLoader-progress" stroke-dasharray="192.617"/>
               </svg>
            </slot>
            <pre>{{progress}}</pre>
         </div>
         <section class="loadingBg hidden"></section>
      </div>
   </div>
</template>


<script>
   import mixin from '../vueMixin_addon'
   import {TConsole, eCOLORS} from '../console_addon'
   import {_} from '../lodash_addon'
   import {mapState, mapMutations} from 'vuex'
   import {getCssClasses, getClassRule} from '../Utils'
   import {
      TString, TNumber, TObject, TFunction, TArray, TSymbol, TBoolean
   } from '../types'

   const Log = new TConsole('LoaderComp', eCOLORS.important, [/VueComponent.|Object.|Function./, 'LoaderComp.'])

   const setHeaderColor = (c) => document.querySelector('meta[name]').setAttribute('content', c)
   const scrollToZero = () => window.scrollTo(0, 0)
   const lockScroller = () => _.forEach(['scroll', 'touchmove'], (e) => window.addEventListener(e, scrollToZero))
   const resumeScroller = () => _.forEach(['scroll', 'touchmove'], (e) => window.removeEventListener(e, scrollToZero))
   lockScroller()

   function ProgressLoader(target) {
      let length = target.getTotalLength(), started = false, completed = false
      let reset  = () => {
         target.style.strokeDasharray = target.style.strokeDashoffset = length
      }
      reset()
      function setProgress(progress, steps) {
         target.style.strokeDashoffset = (1 - progress * (steps / 10) ) * length
      }

      return setProgress
   }


   function loadingAssets(id, scope, progress_setter, callback) {
      //TODO: bgSVG loading
      let _scope = scope.el.querySelector(scope.selector)
      if (!_scope) {
         _.scheduleOnce(loadingAssets, 50, {args: [id, scope, progress_setter, callback]})
         return
      }

      let images   = _scope.querySelectorAll('img')
      let videos   = _scope.querySelectorAll('video')
      let bgImages = _.map(_scope.querySelectorAll('.bgImg'), function (el) {
         let rules, bg, img = document.createElement('img')
         //FIXME:[BUGGY] prone bugs as can't catch media query style inherited from its parent style
         try {
            if (el.classList.length === '0') console.error('Uncaught Exception')
            rules = getClassRule(el.classList[0]), img = document.createElement('img')
            bg = rules.background ? rules.background : rules['background-image']
            if (bg.slice(0, 4) === 'none') {
               return [el, el.classList[0], rules, {complete: true}]
            } else {
               bg = bg.match(/url[(]([^)]+)[)]/)[1].slice(1, -1)
               img.setAttribute('src', bg)
            }
         } catch (e) {
            console.error("can't find background image attribute in classSheet:", el.classList[0],
               ",to infer the problem check if you forget to reset the cache", 'bg:', bg, 'rules:', rules, 'el:', el)
            throw (e)
         }
         return [el, el.classList[0], rules, img]
      })
      let svgs     = _scope.querySelectorAll('bgSvg')
      if (svgs.length > 0) {
         bgImages = bgImages.concat(_.map(svgs, function (el) {
            let ret = []
            bg      = el.getAttribute('imghrefs')
            for (let _bg of bg.split(' ')) {
               img = document.createElement('img')
               img.setAttribute('src', _bg)
               ret.push([el, el.classList[0], null, img])
            }
            return ret
         }))
         bgImages = _.flatten(bgImages)
      }
      Log.l('images:', images, 'videos:', videos, 'bgImages:', bgImages)
      let counter       = 0
      let checkProgress = function () {
         let loaded_images = _.filter(images, (e) => e.complete).length
         let loaded_videos = _.filter(videos, (e) => e.readyState === 4).length
         let loaded_bgs    = _.filter(bgImages, (e) => e[3].complete).length
         let remain_images = images.length - loaded_images
         let remain_videos = videos.length - loaded_videos
         let remain_bgs    = bgImages.length - loaded_bgs
         let percentage    = (loaded_images + loaded_videos + loaded_bgs) / ( images.length + videos.length + bgImages.length )
         counter++
         if (isNaN(percentage)) percentage = Math.min(counter / 10, 1)
         progress_setter(percentage, counter)
         callback.loading({
            images: [images.length, loaded_images],
            videos: [videos.length, loaded_videos],
            bgs   : [bgImages.length, loaded_bgs]
         })

         if (remain_images === 0 && 0 === remain_videos && counter >= 10) {
            Log.l('headerLoader, loaded!!!')
            _.CONST.scheduleIDs[id].cancel()
            callback.loaded()
         } else {
            _.scheduleOnce(checkProgress, 50, {identity: id})
         }
      }
      _.scheduleOnce(checkProgress, 50, {identity: id})
   }


   //===================================================
   //NOTE: Code Start                                  :
   //---------------------------------------------------
   export default {
      components: {},
      props     : {
         dataScope    : TString('', true),
         dataHolder   : TFunction(() => {return {}}, true),
         defaultStates: TObject(() => {return {}}),
      },
      data () {
         return {
            name          : 'loaderComp',
            progressSetter: '',
            progress      : 'loading...',
            scope         : null,
            holder        : null,
            _currentRoute : null,
            state         : 'loading',
            timeStamp     : 0,
            routeStack    : []
         }
      },
      computed  : {
         position () {
         },
         lastRoute (){
            return this.getLastRoute()
         }
      },
      // FIXME: 因為實作onAllComponentsLoaded必需在beforeMount時 (commit loading) Mounted後 (commit loaded)
      // FIXME: Caveats: can't implement beforeMount and beforeDestroy in component
      // FIXME: methods for preventing overrides loading states detection
      mixins    : [mixin],
      methods   : {
         historize(name){

            Log.l(name)
            if (this.routeStack.length === 0) {
               this.routeStack.push(name)
               return true
            }
            if (this.routeStack.indexOf(name) === -1) {
               this.routeStack.push(name)
               return true
            } else {
               if (this.routeStack.length !== 1) {
                  this.routeStack = this.routeStack.slice(0, this.routeStack.indexOf(name) + 1)
               }
            }
            return false
         },
         getCurrentRoute(){
            return this.$root.$router.currentRoute
         },
         getLastRoute(){
            let name = this.getCurrentRoute().name
            if (this.routeStack.length < 2) {
               return this.routeStack[0]
            } else {
               return this.routeStack[this.routeStack.length - 2]
            }
         },
         setBgColor(){
         },
         // NOTE: comp
         loaded(param){
            // TODO: make it extendable
            Log.l('loaded, ', 'param:', param)
            console.log('print')
            this.timeStamp = new Date().getTime()
            this.state     = 'loaded'
            setTimeout(() => {console.log('gogo')}, 2400)
            if (['main', 'index'].indexOf(param.name) !== -1) {
               this.scope.classList.remove('loading')
               this.scope.classList.remove('loaded')
               this.scope.classList.remove('loadedB')
               this.scope.classList.add('loaded')
               this.scope.querySelector('.headerLoader-loader').classList.add('index-loaded')
            } else if (['about', 'portfolio', 'blog', 'portfolioPage'].indexOf(param.name) !== -1) {
               this.scope.classList.remove('loading')
               this.scope.classList.remove('loaded')
               this.scope.classList.remove('loadedB')
               this.scope.classList.add('loaded')
               let header = this.scope.querySelector('.headerLoader-loader')
               header.classList.remove(`loading-${param.name}`)
               header.classList.add(`${param.name}-loaded`)
               if (['portfolioPage', 'portfolio'].indexOf(param.name) !== -1) {
                  this.scope.classList.add('loadedB')
                  header.classList.add(this.getCurrentRoute().name)
               }
            } else {
               throw new Error('XXXXXXXXXXXXXXXXX')
            }
            //            this.lastRoute = this._currentRoute
            resumeScroller()
         },
         init(param){
            // stop 0.5second between loading and loaded fadeout
            _.scheduleOnce(this.$store.commit, 500, {args: ['index/loaded', param]})
         },
         isSiteLoading(){
            let ret = this.lastRoute.path === '/' && this.lastRoute.name === null
            Log.l(ret)
            return ret
         },
         resetLoadingState(name, header, extra = ''){
            // TODO: make it extendable
            scrollToZero()
            Log.l('name:', name, 'header:', header)
            let inPageLoading = () => {
               this.scope.classList                         = ['layout-Main loaded']
               this.$el.classList                           = ['layout-headerLoader clearFix loaded']
               header.classList                             = ['headerLoader-loader loading']
               header.querySelector('.loadingBg').classList = ['loadingBg']
               if (name === 'portfolioPage') {
                  header.classList.add(extra + '-loading')
                  header.classList.add(this.getCurrentRoute().name + '-loading')
               }
            }
            let siteLoading   = (name) => {
               let siteLoading                              = name ? [`siteLoading-${name}`, ''] : ['', 'hidden']
               let mainState                                = name ? 'loaded' : 'loading'
               this.scope.classList                         = ['layout-Main ' + mainState]
               this.$el.classList                           = ['layout-headerLoader clearFix ' + siteLoading[0]]
               header.classList                             = ['headerLoader-loader loading ']
               header.querySelector('.loadingBg').classList = ['loadingBg ' + siteLoading[1]]
               if (name === 'portfolioPage') {
                  header.classList.add(extra + '-loading')
                  header.classList.add(this.getCurrentRoute().name + '-loading')
               }
            }

            if (name !== 'index') {
               this.isSiteLoading() ? siteLoading(name) : inPageLoading()
            } else {
               siteLoading()
            }
         },
         // NOTE: comp
         loading(param){
            //NOTE: this function called from store, when components in loading
            let self = this, scope
            if (this.getLastRoute() === param.name && this.routeStack.length !== 1) {
               Log.l('backward semi detected', this.getCurrentRoute().name, param.name)
               this.holder.load(param.name)
               this.routeStack.pop()
               return
            }
            this.progressSetter(0, 10)
            this.process   = 'loading...'
            this.state     = 'loading'
            this.timeStamp = new Date().getTime()

            //            this._currentRoute = this.getCurrentRoute()

            function loading(_param) {
               Log.l('[loading] loadingAssets:', _param)
               loadingAssets(_param.name, _param.scope, self.progressSetter, {
                  loading  : function (data) {
                     self.progress =
                        `${data.images[1] + data.videos[1] + data.bgs[1]}/${data.images[0] + data.videos[0] + data.bgs[0]} assets loaded`
                     Log.l(data.videos, data.images, data.bgs)
                  }, loaded: function () {
                     self.init(_param)
                  }
               })
            }

            let header = this.$el.querySelector('.headerLoader-loader')
            this.resetLoadingState(param.name, header)
            Log.l('pending loading, name:', param.name)
            this.progress = 'loading...'
            switch (param.name) {
               case 'base':
               case 'portfolio_radiolamp':
               case 'radiolamp':
               case 'portfolio_mplamp':
               case 'mplamp':
               case 'portfolio_petmate':
               case 'petmate':
               case 'portfolio_pendrive':
               case 'pendrive':
               case 'portfolio_yes':
               case 'yes':
               case 'portfolio_revolver':
               case 'revolver':
               case 'portfolio_exia':
               case 'exia':
               case 'portfolio_scorpion':
               case 'scorpion':
               case 'portfolio_camouflage':
               case 'camouflage':
               case 'portfolio_pluto':
               case 'pluto':
               case 'portfolio_driftsand':
               case 'driftsand':
               case 'portfolio_mercurius':
               case 'mercurius':
               case 'portfolio_keyboard':
               case 'keyboard':
               case 'portfolio_sketch':
               case 'sketch':
                  this.historize(param.name)
                  this.resetLoadingState('portfolioPage', header, param.name)
                  header.classList.add('loading-portfolioPage')
                  scope = {el: this.scope, selector: 'section.layout-PortfolioPage'}
                  _.scheduleOnce(loading, 1550, {args: [{name: 'portfolioPage', scope: scope}]})
                  _.scheduleOnce(this.holder.load, 1500, {args: [param.name]})
                  break
               case 'about':
                  this.historize(param.name)
                  header.classList.add('loading-about')
                  scope = {el: this.scope, selector: 'section.layout-About'}
                  _.scheduleOnce(loading, 1550, {args: [{name: param.name, scope: scope}]})
                  _.scheduleOnce(this.holder.load, 1500, {args: [param.name]})
                  break
               case 'main':
               case 'index':
               case '':
               case undefined:
                  this.historize('index')
                  Log.l('mainpage, param:', param)
                  scope = {el: this.scope, selector: 'div.layout-MainMenu'}
                  _.scheduleOnce(loading, 1550, {args: [{name: param.name || 'index', scope: scope}]})
                  _.scheduleOnce(this.holder.load, 1500, {args: [param.name || 'index']})
                  break
               case 'portfolio':
                  this.historize(param.name)
                  Log.l('portfolio page, add class')
                  header.classList.add('loading-portfolio')
                  scope = {el: this.scope, selector: 'section.layout-Portfolio'}
                  _.scheduleOnce(loading, 1550, {args: [{name: param.name, scope: scope}]})
                  _.scheduleOnce(this.holder.load, 1500, {args: [param.name]})
                  break
               case 'blog':
                  let location = () => { window.location = 'https://genekeysnalmaas.blogspot.tw/'}
                  let trans    = () => {
                     document.querySelector('.layout-MainMenu').style = 'opacity:0'
                  }
                  _.scheduleOnce(trans, 400)
                  _.scheduleOnce(location, 650)
                  break

            }
            if (param.callback) {
               Log.l('call param.callback')
               param.callback()
            }
         }
      },
      mounted () {
         // defined in mixin

         this.historize(this.getCurrentRoute().name)
         Log.l(this.routeStack, this.__$pathName$__)
         //         this._currentRoute = this.currentRoute
         this.progressSetter = new ProgressLoader(document.querySelector('path.headerLoader-progress'))
         this.scope          = this.dataScope === '' ? this.$parent : document.querySelector(this.dataScope)
         this.holder         = this.dataHolder()
         Log.l(this.routeStack, this.__$pathName$__)

      }
   }

</script>

<style lang="stylus">
   @import "../themes/comp.loader.styl"
</style>
