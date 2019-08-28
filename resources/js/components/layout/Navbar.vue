<template>
 <v-navigation-drawer v-model="drawer" class="spq-navbar" fixed clipped app>
   <v-list class="mt-4">
     <template v-for="item in items">
       <v-list-tile :key="item.url" :to="item.url == 'dashboard' ? '/' : { name: item.url }" active-class="active-text">
         <v-list-tile-action>
           <v-icon class="">{{ item.icon }}</v-icon>
         </v-list-tile-action>
         <v-list-tile-content class="">
           <v-list-tile-title>
             {{ item.label }}
           </v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
     </template>
   </v-list>
 </v-navigation-drawer>
</template>
<script>
import store from '../../store'
export default {
 data: () => ({
   drawer: null,
   mini: true,
   stateless: true,
   items: []
 }),
 mounted() {
   this.menuList();
   store.watch(
     state => state.environment, () => {
       this.menuList();
     }
   )
 },
 methods: {
   changeRoutes(route) {
     this.$router.push({name: 'login'})
   },
   menuList() {
     return this.items;
   }
 }
}
</script>
<style lang="scss">
.spq-navbar {
 border-left: 0;
 border-right: 0;
 a:hover {
   background-color: #dadce0;
   color: inherit;
 }
}
.active-text {
 color: #ff5252 !important;
 border-left: 3px solid #ff5252;
 font-weight: black;
}
</style>
