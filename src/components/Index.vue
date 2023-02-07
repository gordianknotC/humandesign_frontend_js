<template>
   <!--
     Replace following "div" with
     "<router-view class="layout-view">" component
     if using subRoutes
   -->
   <section class="main">
      <div class="deviceInfo clearFix">
         <h2>windows width:{{width}}, height:{{height}}</h2>
         <h3>device: {{device}}</h3>
      </div>
      <h2 class="clearFix">layout with media queries </h2>
      <p>following responsive layout was implemented by media queries</p>
      <div class="layoutA clearfix">
         <nav class="layoutA-nav">
            <ul>
               <li>首頁</li>
               <li>關於我們</li>
               <li>產品資訊</li>
               <li>服務項目</li>
               <li>作品展示</li>
               <li>聯絡我們</li>
            </ul>
         </nav>
         <section class="layoutA-stack">
            <p>這個例子和之前那個例子的結果一模一樣。請注意我們在容器上放了一個 <code>clearfix</code> 密技上去，原本在這個例子中是不需要的，但是當 <code>nav</code>
               比這些「固定的」的內容（也就是那些沒有套用 <code>float</code> 的內容）還要高時就需要了。        </p>
         </section>
         <section class="layoutA-stack">
            <p>
               天布麼次，今親他利用或母電氣能真友老久來進登出總形：國大系思樂麼問做去將地樹作、維你我們，師為什那，會輕步省生一們些的間海學了；能大作以電回球地現廠美馬方，別到最刻親個神故靜西招國老北氣反大育發商告味必資始定可對謝度的！找謝對環的片他這下：母來感從還，叫我火教會經神送兒沒業是地場色是身收但進經道。媽兒們有先他怕雖發形的手最出在個是我不引最引現小企是而？一子很及女種走？他傳樣會當工視各過男二年傳，但式希叫裡上優經的友定你……不前空國會世解，也斯他不體裡一光車別？加去命最點著如推著人所間國作感我觀，可場是過入指待說，理求面輕美事福出過白到片不是的快究是漸片力男創北一落我成不，精能等動張色輪酒、吃理站毒上出一，黃時回趣吃然，意小童提，到苦際一出如遊軍現媽濟手喜……現結從過計不太聞經是她！變連事成通，中財陸呢十母裝有他成綠上童不個。        </p>
         </section>
      </div>

      <h2>fixed layout with element queries </h2>
      <p>following responsive layout was implemented by element queries</p>
      <div class="layoutB clearfix">
         <nav class="layoutB-nav">
            <ul>
               <li>首頁</li>
               <li>關於我們</li>
               <li>產品資訊</li>
               <li>服務項目</li>
               <li>作品展示</li>
               <li>聯絡我們</li>
            </ul>
         </nav>
         <section class="layoutB-stack">
            <p>這個例子和之前那個例子的結果一模一樣。請注意我們在容器上放了一個 <code>clearfix</code> 密技上去，原本在這個例子中是不需要的，但是當 <code>nav</code>
               比這些「固定的」的內容（也就是那些沒有套用 <code>float</code> 的內容）還要高時就需要了。        </p>
         </section>
         <section class="layoutB-stack">
            <p>
               天布麼次，今親他利用或母電氣能真友老久來進登出總形：國大系思樂麼問做去將地樹作、維你我們，師為什那，會輕步省生一們些的間海學了；能大作以電回球地現廠美馬方，別到最刻親個神故靜西招國老北氣反大育發商告味必資始定可對謝度的！找謝對環的片他這下：母來感從還，叫我火教會經神送兒沒業是地場色是身收但進經道。媽兒們有先他怕雖發形的手最出在個是我不引最引現小企是而？一子很及女種走？他傳樣會當工視各過男二年傳，但式希叫裡上優經的友定你……不前空國會世解，也斯他不體裡一光車別？加去命最點著如推著人所間國作感我觀，可場是過入指待說，理求面輕美事福出過白到片不是的快究是漸片力男創北一落我成不，精能等動張色輪酒、吃理站毒上出一，黃時回趣吃然，意小童提，到苦際一出如遊軍現媽濟手喜……現結從過計不太聞經是她！變連事成通，中財陸呢十母裝有他成綠上童不個。        </p>
         </section>

      </div>


   </section>

</template>


<script>
   import mixin from '../vueMixin_addon'
   import {
      DEVICES, platform, select, orientible, is_mobile, PIX_RATIO, is_desktop_mode, animate, fetchEvent,
      printPlatformInfo, findIndexWhen
   } from '../Utils.js'

   printPlatformInfo()


   export default {
      data () {
         return {
            name: 'index',
            orienting: window.DeviceOrientationEvent && !platform.is.desktop,
            rotating: window.DeviceMotionEvent && !platform.is.desktop,
            platform: platform,
            width: window.innerWidth,
            height: window.innerHeight,
            device: this.getDeviceByWindowSize()
         }
      },
      computed: {
         position () {

         }
      },
      // FIXME: 因為實作onAllComponentsLoaded必需在beforeMount時 (commit loading) Mounted後 (commit loaded)
      // FIXME: Caveats: can't implement beforeMount and beforeDestroy in component
      // FIXME: methods for preventing overrides loading states detection
      mixins: [mixin],
      methods: {
         getDeviceByWindowSize(){
            let ret = findIndexWhen(DEVICES.byWidth, window.innerWidth, (window_width, value_, last) => {
               value_ = value_.size[0]
               if (window_width === value_) return true
               if (window_width > value_) {
                  if (value_ === last.size[0]) return true
               } else {
                  return true
               }
            })

            let ret2 = findIndexWhen(_.values(DEVICES.byRange), window.innerWidth, (window_width, value_, last) => {
               if (window_width === value_) return true
               if (window_width > value_) {
                  if (value_ === last) return true
               } else {
                  return true
               }
            })
            return ret.name + ", " + _.findKey(DEVICES.byRange, (o) => {
                  return o === ret2
               })
         },
         onWindowResize(evt){
            this.width  = window.innerWidth
            this.height = window.innerHeight
            this.device = this.getDeviceByWindowSize()
         }
      },
      mounted () {
         console.log('component index mounted')
         // defined in mixin
         this.addEventListener(window, 'resize', this.onWindowResize)
      }
   }

</script>

<style lang="stylus">
   @import "../themes/comp.demo.styl"
</style>
