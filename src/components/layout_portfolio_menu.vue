<template>
   <!--
     Replace following "div" with
     "<router-view class="layout-view">" component
     if using subRoutes
   -->
   <!--NOTE: --------------------------------------------------------------------------- -->
   <!--NOTE: class naming convention -> 「portfolioName」-「menu」 :                     -->
   <!--NOTE: =========================================================================== -->
   <section v-if="currentPage === 'portfolio'" class="layout-Portfolio portfolio-menu clearfix"  >
      <div class="portfolio-menu-backward backward-section">
         <entryLink :linkTo="lastPage" titleCH=" " titleEN="back" class="text-center block-center">
            <h3 slot="title">Back</h3>
            <section slot="description">
            </section>
         </entryLink>
      </div>

      <section class="leftColumn">     </section>
      <section class="rightColumn">    </section>

      <!--NOTE:                                                                         :-->
      <section class="revolver-menu picMenu taperLeft"> <!--NOTE: Revolver              :-->
         <entryLink :entryLogo=false titleCH="複古電競" titleEN="R + Evolver = Revolver" class="text-center  ">
            <h3 slot="title">Revolver<p>-復古電競</p></h3>
            <section slot="description">
               <p class="ch">由左輪手槍發展而來的複古電競</p>
               <p><span>R</span>etro + <span>E</span>volver = R<span>Evolver</span></p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="revolver-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="revolver-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="revolver-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                     :-->
      <section class="sketch-menu picMenu taperLeft"> <!--NOTE: SKETCH              :-->
         <entryLink :entryLogo=false titleCH="-未完成的手繪" titleEN="SKETCH" class="text-center">
            <h3 slot="title">SKETCHES AND PAINTINGS</h3>
            <section slot="description">
               <p class="ch">一些未完成的手繪</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="sketch-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="sketch-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="sketch-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                        :-->
      <section class="petmate-menu picMenu taperRight"> <!--NOTE: PETMATE              :-->
         <entryLink :entryLogo=false titleCH="-寵物推車" titleEN="PETMATE" class="text-center">
            <section slot="description"><p>carrier cage, pet cart, and bicycle</p>
               <p class="ch">家用滑鼠設計</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="petmate-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="petmate-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="petmate-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                      :-->
      <section class="mplamp-menu picMenu taperRight"> <!--NOTE: MPLamp              :-->
         <entryLink :entryLogo=false titleCH=" " titleEN="MPLamp" class="text-center">
            <h3 slot="title">MP<span>Lamp</span>
               <p>-整合床頭音響</p></h3>
            <section slot="description">
               <p class="ch">整合床頭音響與MP3Player</p>
               <p><span>MP3</span>PLAYER + <span>LAMP</span></p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="mplamp-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="mplamp-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                              :-->
      <section class="camouflage-menu picMenu taperRight"> <!--NOTE: Camouflage              :-->
         <entryLink :entryLogo=false titleCH="-平價電競鼠" titleEN="Camouflage" class="text-center">
            <section slot="description">
               <p class="ch">以迷彩特性為主題應用於滑鼠設計</p>
               <p>the goal of camouflage is to look like</p>
               <p> nothing but all the range</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="camouflage-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="camouflage-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="camouflage-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                            :-->
      <section class="radiolamp-menu picMenu taperRight"> <!--NOTE: RadioLamp              :-->
         <entryLink :entryLogo=false titleCH=" " titleEN="RadioLamp" class="text-center">
            <h3 slot="title">Radio<span>Lamp</span> <p></p></h3>
            <section slot="description">
               <p class="ch">-燈具·收音機·手電筒</p>
               <p><span>radio emergency</span> + bedside lamp  <span> + spare flashlight</span></p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="radiolamp-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="radiolamp-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="radiolamp-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                         :-->
      <section class="scorpion-menu picMenu taperLeft"> <!--NOTE: Scorpion              :-->
         <entryLink :entryLogo=false titleCH="-平價電競鼠" titleEN="Scorpion" class="text-center">
            <section slot="description">
               <p class="ch">以占星象徵，發展設計主題</p>
               <p>a series of gaming mouse design borrowed</p>
               <p>from metaphorical meaning of Zodiac signs</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="scorpion-menu-bg parallaxScene-Bg" data-zindex="1">
                  <div class="scorpion-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="scorpion-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                          :-->
      <section class="pendrive-menu picMenu taperLeft"> <!--NOTE: Pendrives              :-->
         <entryLink :entryLogo=false titleCH=" " titleEN="Pendrives" class="text-center">
            <section slot="description" class="justifyP">
               <p class="ch">隨身碟及散熱片設計</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="pendrive-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                             :-->
      <section class="mercurius-menu picMenu taperLeft"> <!--NOTE: Merrcurius              :-->
         <entryLink :entryLogo=false titleCH="-平價電競鼠" titleEN="Mercurius" class="text-center">
            <section slot="description">
               <p class="ch">以占星象徵，發展設計主題</p>
               <p>a series of gaming mouse design borrowed</p>
               <p>from metaphorical meaning of Zodiac signs</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="mercurius-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="mercurius-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="mercurius-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="1.5"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                 :-->
      <section class="exia-menu picMenu taperLeft"> <!--NOTE: EXIA              :-->
         <entryLink :entryLogo=false titleCH="-家用滑鼠" titleEN="EXIA" class="text-center">
            <section slot="description"><p>a mouse design inspired from</p>
               <p>ancient prototype of Devil and Angel</p>
               <p class="ch">家用滑鼠設計</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="exia-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="exia-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="exia-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                    :-->
      <section class="keyboard-menu picMenu taperRight"> <!--NOTE: Keyboard              :-->
         <entryLink :entryLogo=false titleCH=" " titleEN="Keyboard" class="text-center">
            <section slot="description">
               <p>mechanical keyboard design</p>
               <p class="ch">電競鍵盤外觀設計</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="keyboard-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="keyboard-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="keyboard-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                           :-->
      <section class="driftsand-menu picMenu taperRight"><!--NOTE: Driftsand              :-->
         <entryLink :entryLogo=false titleCH="-家用滑鼠" titleEN="Driftsand" class="text-center">
            <section slot="description"><p>a mouse design inspired from foot wear</p>
               <p class="ch">家用滑鼠設計</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="driftsand-menu-bg parallaxScene-Bg" data-zindex="1">
                  <div class="driftsand-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                  <div class="driftsand-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                               :-->
      <section class="yes-menu picMenu taperLeft"> <!--NOTE: YES              :-->
         <entryLink :entryLogo=false titleCH="-家用滑鼠" titleEN="YES" class="text-center">
            <section slot="description"><p>office mouse design</p>
               <p class="ch">家用滑鼠設計</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="yes-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="yes-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.7"></div>
                  <div class="yes-menu-fg2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="1.5"></div>
               </div>
            </section>
         </parallaxScene>
      </section>
      <!--NOTE:                                                                    :-->
      <section class="pluto-menu picMenu taperRight"> <!--NOTE: Pluto              :-->
         <entryLink :entryLogo=false titleCH="-家用滑鼠" titleEN="Pluto" class="text-center">
            <section slot="description"><p>mouse design inspired from foot wear</p>
               <p class="ch">家用滑鼠設計</p>
            </section>
         </entryLink>
         <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                        :center="center">
            <section slot="content">
               <div class="pluto-menu-bg parallaxScene-Bg bgImg" data-zindex="1">
                  <div class="pluto-menu-fg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
               </div>
            </section>
         </parallaxScene>
      </section>


   </section>
</template>


<script>
   import {_} from '../lodash_addon'
   import mixin from '../vueMixin_addon'
   import router from '../router'
   import entryLink from '../../templates/entryLink.vue'
   import layoutMain from '../components/layout_main.vue'
   //import parallaxScene from '../components/parallaxSceneComp.vue'
   import {TConsole, eCOLORS} from '../console_addon'
   import {mapState, mapMutations} from 'vuex'
   import {
      DEVICES, platform, select, orientible, is_mobile, PIX_RATIO, is_desktop_mode,
      printPlatformInfo, findIndexWhen, getClassRule, parseUnit, isPortrait
   } from '../Utils.js'

   const Log = new TConsole('portfolioMenu', eCOLORS.current, [/VueComponent./, 'portfolioMenu.'])
   const deviceDebug = true
//   Log.suppressLevel([eCOLORS.info, eCOLORS.log])
   // NOTE: place in sequence order, be sure to match with template

   //================================================
   //                Code Start
   //------------------------------------------------
   export default {
      components: {
         entryLink    : entryLink,
         parallaxScene: parallaxScene
      },
      data () {
         return {
            name             : 'portfolioMenu',
            _hoverInit       : null,
            keyClasses       : [],
            linkNames: [],
            portfolioElements: []
         }
      },
      computed  : {
         center (){
            return [window.innerWidth / 2, window.innerHeight / 2]
         },
         currentPage(){
            return this.$router.currentRoute.name
         },
         currentState(){
            return this.$refs['app.router.index'][0].loaderComp.state
         },
         lastPage(){
            let loader = this.$root.$refs['app.router.index'][0].loader
            Log.l(loader)
            return loader ? loader.lastRoute : '/'
         },
      },
      // FIXME: 因為實作onAllComponentsLoaded必需在beforeMount時 (commit loading) Mounted後 (commit loaded)
      // FIXME: Caveats: can't implement beforeMount and beforeDestroy in component
      // FIXME: methods for preventing overrides loading states detection
      mixins    : [mixin],
      methods   : {
         onWindowResize(evt){
            this.hoverReset()
         },
         columnize(){
            let self = this
            let fullLength  = this.portfolioElements.length
            let halfLength  = parseInt(fullLength / 2)
            let leftColumn  = this.$el.querySelector('section.leftColumn')
            let rightColumn = this.$el.querySelector('section.rightColumn')
            let portrait = isPortrait()
            let heighten = ['revolver', 'radiolamp', 'petmate', 'driftsand', 'keyboard', 'exia' ]
            _.forEach( this.portfolioElements, (menu, i) => {
               if (i < halfLength) {
                  leftColumn.appendChild(menu)
               } else {
                  rightColumn.appendChild(menu)
               }
               if (!portrait){
                  if(heighten.indexOf(self.linkNames[i]) !== -1){
                     menu.style.height = '42vh'
                     menu.style.margin = '-3vh auto'
                     if (i === 0) menu.querySelector('.entryLink').style.marginTop = '2vh'
                  }
               }else{
                  menu.style.height = ''
                  menu.style.margin = ''
                  if (i === 0) menu.querySelector('.entryLink').style.marginTop = ''
               }
            })
         },
         sceneFormatValidationCheck(){
            let self       = this
            let portfolios = this.portfolioElements = this.$el.querySelectorAll('section.picMenu')
            let fullLength             = portfolios.length
            let check_namingConvention = () => {
               _.forEach(portfolios, (menu, i) => {
                  let keyname          = menu.classList[0].split('-')
                  let classes          = menu.classList.value
                  let end              = i === fullLength - 1 ? 'End' : ''
                  menu.classList.value = classes.replace(/taperLeft|taperRight/, i % 2 === 0 ? `taper${end}Left` : `taper${end}Right`)
                  Log.assert(keyname[1] === 'menu', 'naming convention check failed! className:', keyname)
                  self.keyClasses.push(keyname.join('-'))
               })
            }
            check_namingConvention()
            this.linkNames = this.keyClasses.map( (x) => 'portfolio_' +  x.split('-')[0].trim())
         },
         init(){
            let linknames  = this.linkNames ,
                cssClasses = this.keyClasses,
                expand     = 12,
                zindex     = 60,
                self       = this,
                btElement  = this.$el.querySelector('.bottom-backward'),
                elements   = this.portfolioElements = this.$el.querySelectorAll('section.picMenu'),
                root = this.$el,
                fn   = (el, i) => {

                }
            _.forEach(elements, (e, i) => {
               e.addEventListener('mouseover', () => {
                  e.classList.add('entryLink-hover')
                  if (e.classList.contains('clicked')) return
                  fn(e, i, 'over')
               })
               e.addEventListener('mouseout', () => {
                  e.classList.remove('entryLink-hover')
                  if (e.classList.contains('clicked')) return
                  fn(e, i, 'out')
               })
               e.addEventListener('click', (ee) => {
                  ee.preventDefault()
                  window.navigator.vibrate(50)
                  Log.l('[click] link:', i, linknames[i], 'router path:', `${router.currentRoute.path}/${linknames[i]}`)
                  _.forEach( elements, (t, ii) => t.classList.remove('clicked') )
                  elements[i].classList.add('clicked')
                  let cb = () => {
                     let el = document.querySelector('.headerLoader-loader>.loadingBg')
                     el.classList = ['loadingBg loadingBg-' + linknames[i]]
                     Log.l('click:', el.classList)
                  }
                  self.$store.commit( 'index/loading', {name: linknames[i], callback:cb } )
               })
            })

            this.repose()

         },
         repose(){
            let self              = this
//            let el                = this.$el.querySelector('.bottom-backward')
//            el.style.top          = '0px'
            this.$el.style.height = ''
            function reset() {
//               el.style.top          = document.documentElement.scrollHeight - el.clientHeight + 'px'
               self.$el.style.height = document.documentElement.scrollHeight + 'px'
            }
            _.scheduleOnce(reset, 200)
         },
         hoverReset(){
            _.forEach(this.portfolioElements, (x) => {
               x.classList.remove('entryLink-hover')
               x.setAttribute('style', '')
            })
            this.repose()
         },
         hoverInit(linknames, cssClasses, expand, zindex, elements, root){
         }
      },
      mounted () {
         // defined in mixin
         this.sceneFormatValidationCheck()
         this.columnize()
         this.addEventListener(window, 'resize', this.onWindowResize)
         // TODO: hoverInit 需要參數化
         this.init()
         _.forEach(this.$root.$refs[this.__$pathName$__ + '.parallaxScene'], (x) => {
            //NOTE: reset again
            x.onWindowResize()
         })


      }
   }
</script>

<style lang="stylus">
   @import "../themes/comp.layout_portfolio_menu.styl"
</style>
