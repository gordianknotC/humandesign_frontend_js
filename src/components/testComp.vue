<!--suppress ALL, JSAnnotator -->
<template>
   <section class="testComp_paperjs">
   </section>
</template>

<script>
   import {_} from '../lodash_addon'
   import paper from 'paper'
   window._ = _
   window.paper = paper

   function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms))
   }












      export default {
      components: {
      },
      data () {
         return {
            name : 'testComp_paperjs',
         }
      },
      methods   : {},
      mounted(){
         this.el = this.$el
      }
   }

</script>


<style lang="stylus">
h1,h2,h3,h4,h5,p
   color white
html
   background: #005556  !important /* Old browsers */
   background: -moz-linear-gradient(-45deg, #005556 0%, #ffb600 78%)  !important
   background: -webkit-linear-gradient(-45deg, #005556 0%,#ffb600 78%)  !important
   background: linear-gradient(135deg, #005556 0%,#ffb600 78%)  !important
   background-repeat: no-repeat !important
   background-attachment: fixed !important
</style>
