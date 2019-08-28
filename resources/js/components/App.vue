<template>
 <component :is="layout">
   <router-view :key="$route.fullPath"></router-view>
 </component>
</template>
<script>
 import store from '../store'
 export default {
   computed: {
     layout () {
       return this.$route.meta.layout
     }
   },
   mounted() {
   }
 }
</script>
<style lang="scss">
html, body {
 font-family: "Segoe UI","Helvetica Neue","Apple Color Emoji","Segoe UI Emoji",Helvetica,Arial,sans-serif;
 background-color: #fff;
 font-weight: 600;
 text-align: center;
 color: #2c3e50;
 width: 100%;
 height: 100%;
}
</style>
