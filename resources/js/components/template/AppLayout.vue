<template>
 <v-app id="keep">
   <Navbar ref="drawer"></Navbar>
   <Toolbar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"></Toolbar>
   <v-content class="bg-grey">
     <router-view></router-view>
   </v-content>
 </v-app>
</template>
<script>
export default {
 components: {
   'Toolbar' : () => import('../layout/Toolbar.vue'),
   'Navbar'  : () => import('../layout/Navbar.vue')
 },
}
</script>
<style lang="scss">
</style>
