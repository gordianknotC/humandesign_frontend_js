<template>
   <!--
     Replace following "div" with
     "<router-view class="layout-view">" component
     if using subRoutes
   -->
      <div class="layout-MainMenu layoutA clearfix">
         <section class="layout-triple first">
            <entryLink titleCH="關於我" titleEN="ABOUT" class="text-center">
               <section slot="description"><p>INDUSTRIAL DESIGN, WEB DESIGN</p>
                  <p>NEW AGE, GENE KEYS, ASTROLOGY</p></section>
            </entryLink>
            <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.012, 0.012]" :baseZindex="2"
                           :center="center">
               <section slot="content">
                  <div class="aboutBg parallaxScene-Bg bgImg" data-zindex="1">
                     <div class="aboutPd1 parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.4"></div>
                     <div class="aboutPd2 parallaxScene-Fg bgImg" data-zindex="3" data-ratio="0.75"></div>
                     <div class="aboutMain parallaxScene-Fg bgImg" data-zindex="4" data-ratio="0.2"></div>
                     <!--<div class="aboutZen parallaxScene-Fg" data-zindex="5"  > </div>-->
                  </div>
               </section>
            </parallaxScene>
         </section>
         <section class="layout-triple second">
            <entryLink titleCH="作品集" titleEN="PORTFOLIO" class="text-center">
               <section slot="description"><p>INDUSTRIAL DESIGN, WEB DESIGN</p>
                  <p>NEW AGE, GENE KEYS, ASTROLOGY</p></section>
            </entryLink>
            <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.008, 0.004]" :baseZindex="10"
                           :center="center">
               <section slot="content">
                  <div class="portfolioBg parallaxScene-Bg bgImg" data-zindex="1">
                     <div class="portfolioFg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.5"></div>
                     <div class="portfolioFg2 parallaxScene-Fg bgImg" data-zindex="3"></div>
                  </div>
               </section>
            </parallaxScene>
         </section>
         <section class="layout-triple third">
            <entryLink titleCH="部落格" titleEN="BLOG" class="text-center">
               <section slot="description"><p>INDUSTRIAL DESIGN, WEB DESIGN</p>
                  <p>NEW AGE, GENE KEYS, ASTROLOGY</p></section>
            </entryLink>
            <parallaxScene class="parallaxScene" :displacement="[8,4]" :sensitivity="[0.008, 0.004]" :baseZindex="20"
                           :center="center">
               <section slot="content">
                  <div class="blogBg parallaxScene-Bg bgImg" data-zindex="1">
                     <div class="blogFg parallaxScene-Fg bgImg" data-zindex="2" data-ratio="0.5"></div>
                     <div class="blogFg2 parallaxScene-Fg bgImg" data-zindex="3"></div>
                  </div>
               </section>
            </parallaxScene>
         </section>
      </div>
</template>


<script>
   import mixin from '../vueMixin_addon'
   import entryLink from '../../templates/entryLink.vue'
   //import parallaxScene from '../components/parallaxSceneComp.vue'
   import router from '../router'
   import {TConsole, eCOLORS} from '../console_addon'
   import {_} from '../lodash_addon'
   import {mapState, mapMutations} from 'vuex'
   import {
      DEVICES, platform, select, orientible, is_mobile, PIX_RATIO, is_desktop_mode,
      printPlatformInfo, findIndexWhen, getClassRule, parseUnit
   } from '../Utils.js'

   const Log = new TConsole('layoutMain', eCOLORS.current, [/VueComponent./, 'layoutMain.'])
   const deviceDebug = true


   //================================================
   //                Code Start
   //------------------------------------------------
   export default {
      components : {
         entryLink    : entryLink,
         parallaxScene: parallaxScene
      },
      data () {
         return {
            name      : 'main'
         }
      },
      computed: {
         center (){
            return [window.innerWidth / 2, window.innerHeight / 2]
         }
      },
      // FIXME: 因為實作onAllComponentsLoaded必需在beforeMount時 (commit loading) Mounted後 (commit loaded)
      // FIXME: Caveats: can't implement beforeMount and beforeDestroy in component
      // FIXME: methods for preventing overrides loading states detection
      mixins  : [mixin],
      methods : {
         onWindowResize(evt){
            this.hoverReset()
         },
         init(){
            let linknames = ['about', 'portfolio', 'blog'],
                cssClasses = ['first', 'second', 'third'],
                expand = 12,
                zindex = 60,
                elements = document.querySelectorAll('.layout-triple'),
                root = document.querySelector('.layout-MainMenu')
            this.hoverInit(linknames, cssClasses, expand, zindex, elements, root)
         },
         // NOTE: layoutMain component
         hoverReset(){
            _.forEach(document.querySelectorAll('.layout-triple'), (x)=>{
               x.classList.remove('entryLink-hover')
               x.setAttribute('style', '')
            })
         },
         // NOTE: layoutMain compoentn
         hoverInit(linknames, cssClasses, expand, zindex, elements, root){
            Log.l(linknames, cssClasses, expand, zindex, elements, root, 'this:', this)
//            let expand     = 12
//            let zindex     = 60
            let self       = this
//            let linknames      = ['about', 'portfolio', 'blog']
            let transitions = linknames.map((x)=> 'transition_' + x)
            let keywords   = ['left', 'top', 'margin-left', 'margin-top', 'width', 'height', 'z-index']
//            let elements     = document.querySelectorAll('.layout-triple')
//            let root        = document.querySelector('.layout-MainMenu')

            let fn = (e, i, mode) => {
               let classRules = cssClasses.map((e) => {
                  let rules = getClassRule(e)
                  let ret   = {}
                  for (let key of keywords) {
                     ret[key] = rules[key] ? parseUnit(rules[key]) : undefined
                  }
                  return ret
               })

               Log.l('layoutMain:', mode)
               let mpos, moffset, msize, sizekey, keys = ['left', 'top']
               for (let key of keys){
                  if (classRules[i][key] === undefined || classRules[i][key][0] === 0) continue
                  sizekey = key === 'top' ? 'height' : 'width'

                  if (mode === 'out') {
                     e.style.left = e.style.marginLeft = e.style.width = e.style.top = e.style.marginTop = e.style.height =
                        e.style.zIndex = ''
                     return
                  }
                  moffset = classRules[i]['margin-' + key]
                  msize   = classRules[i][sizekey]
                  e.style['margin' + key.slice(0, 1).toUpperCase() + key.slice(1)] = moffset[0] - expand / 2 + moffset[1]
                  e.style[sizekey] = msize[0] + expand + msize[1]
                  e.style.zIndex   = zindex
               }
            }
            _.forEach(elements, (e, i) => {
               Log.l('events init:', i, e, e.addEventListener)
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
                  Log.l('[click] link:', i, linknames[i], 'router path:', `${router.currentRoute.path}/${linknames[i]}` )
                  _.forEach(elements, (t, ii)=> t.classList.remove('clicked') )
                  elements[i].classList.add('clicked')
                  self.$store.commit('index/loading', {name:linknames[i]})
               })

            })
         }
      },
      mounted () {
         // defined in mixin
         this.addEventListener(window, 'resize', this.onWindowResize)
         this.init()
      }
   }
</script>

<style lang="stylus">
   @import "../themes/comp.layout_main.styl"
</style>
