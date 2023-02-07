<template>
   <div class="entryLink ">
      <svg v-if="entryLogo" class="entryLogo" viewBox="0 0 42 42">
         <g>
            <g>
               <circle class="entryLogo-circle" cx="21" cy="21" r="21"/>
               <polygon class="entryLogo-arrow"
                        points="15.82 9.23 24.6 20.71 15.78 32.92 19.03 35.26 29.58 20.64 19 6.8 15.82 9.23"/>
            </g>
         </g>
      </svg>
      <div class="entryLink-title">
         <slot name="title"><h3>{{titleEN}}<p>{{titleCH}}</p></h3></slot>
         <slot name="description"></slot>
         <!--<p class="entryLink-description">NEW AGE, DESIGN, ASTROLOGY</p>-->
      </div>
   </div>
</template>

<script>
   import {TString, TNumber, TObject, TBoolean} from '../src/types.js'
   import mixin from '../src/vueMixin_addon'
   export default {
      data () {
         return {
            el: null,
            name:'entryLink'
         }
      },
      props:{
         titleEN: TString('ABOUT'),
         titleCH: TString('關於我'),
         entryLogo: TBoolean(true),
         linkTo: TString('')
      },
      // FIXME: 因為實作onAllComponentsLoaded必需在beforeMount時 (commit loading) Mounted後 (commit loaded)
      // FIXME: Caveats: can't implement beforeMount and beforeDestroy in component
      // FIXME: methods for preventing overrides loading states detection
      mixins: [mixin],
      methods:{
        eventsInit (){
           let self = this
           this.addEventListener( this.$el, 'click', function(){
              console.log( 'linkTo:', self.linkTo )
              window.navigator.vibrate(50)
              self.$store.commit('index/loading', {name:self.linkTo})
           })
           this.addEventListener( this.$el, 'mouseover', function(){
              self.$el.classList.add('entryLink-hover')
           })
           this.addEventListener( this.$el, 'mouseout', function(){
              self.$el.classList.remove('entryLink-hover')
           })
        }
      },
      mounted(){
         let self = this.el = this.$el
         if (this.linkTo !== ''){
            this.eventsInit()
         }
      }


   }
</script>

<style lang="stylus">
   normalColor = #d1e8ed
   overColor=#69e9ff
   arrowNormal= #acbabe
   arrowOver= #ffffff
   circleNormal= #ffffff
   .entryLink-hover
      color overColor !important
      cursor pointer
      & .entryLogo-circle
         fill overColor !important
      & .entryLogo-arrow
         fill arrowOver !important
      & .entryLink
         color: overColor !important

   .entryLink
      margin-top 15vh
      font-family: Khand
      color normalColor
      & svg.entryLogo
         width:2.3rem
         display: inline-block
         vertical-align text-top
      & .entryLogo-arrow
         fill arrowNormal
      & .entryLogo-circle
         fill circleNormal
      & .entryLink-title
         display: inline-block
         margin-left: 0.2rem
         vertical-align middle
         & h3
            line-height:3rem
            font-size 1.8rem
            margin 0
            padding 0
            display inline-block
            font-weight 100
            & p
               display: inline-block
               font-family: "Noto Sans CJK TC Light"
               font-size:1.8rem
         & section
            margin: -0.7rem 0rem
         & p
            margin 0
            font-size: 0.7rem
            text-align:left
            line-height:0.7rem
</style>
