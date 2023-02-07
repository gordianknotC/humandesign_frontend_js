<template>
   <!-- Don't drop "q-app" class -->
   <div id="router">
      <router-view ref="index"></router-view>
   </div>
</template>

<script>
   /*
    * Root component
    */

   console.log('app.vue')
   export default {
      data() {
         return {
            name: 'router'
         }
      },
      mount() {
         console.log('app:mount')
      }
   }
</script>

<style lang="stylus">

</style>
