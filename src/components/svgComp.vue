<template>
   <div v-html="svg">
   </div>
</template>

<script>
   import {TString, TArray} from '../types'
   import mixin from '../vueMixin_addon'
   const pathFinder = require.context('../statics', false, /\.(svg|jpg|png)(\?.*)?$/);
   export default {
      props  : {
         source  :TString('./astro.svg', true),
         imgHrefs :TArray(['./Artboard5_8.jpg'], false)
      },
      data () {
         return {
            name: 'svgComp',
            svg : null,
            el  : null
         }
      },
      mixins    : [mixin],
      methods: {
         hrefInit () {
            let ptn1 = /<image [^>]+>[^<]+/g
            let ptn2 = /xlink:href="[^"]+"/
            let images = this.svg.match(ptn1)
            let i = 0
            console.warn('=====================', images, this.svg)
            if (images){
               for (let image of images){
                  if (!ptn2.test(image)) continue
                  this.svg = this.svg.replace(image,
                     image.replace(/xlink:href="[^"]+"/, 'xlink:href="' + pathFinder(this.imgHrefs[i]) + '"') )
                  i ++
               }
            }
         }
      },
      mounted(){
         this.el = this.$el
         this.el.setAttribute('imgHrefs', this.imgHrefs.map( x=> '../assets/refs/portfolio_page/' + x.split('./')[1] ).join(' ') )
         this.svg = pathFinder(this.source)
         this.hrefInit()
      }
   }
</script>

<style lang="stylus">
</style>
