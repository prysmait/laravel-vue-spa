<template>
 <v-toolbar app clipped-left color="white" fixed dense>
   <img src="/storage/images/logo_mediaprofili.svg" height="20" alt="">
   <v-spacer></v-spacer>
   <span class="title justify-end text-xs-right" style="font-family:'Segoe UI' !important">{{ this.title }}</span>
   <v-toolbar-items>
     <v-btn icon>
       <v-menu :close-on-content-click="false" :nudge-width="200" offset-y offset-x>
         <v-avatar color="grey lighten-4" size="36px" slot="activator">
           <v-img :src="userInfo.profile_image" :alt="userInfo.name + ' ' + userInfo.surname"></v-img>
         </v-avatar>
         <v-card>
           <v-list>
             <v-list-tile avatar>
               <v-list-tile-avatar>
                  <img :src="userInfo.profile_image" :alt="userInfo.name + ' ' + userInfo.surname">
               </v-list-tile-avatar>
               <v-list-tile-content>
                 <v-list-tile-title>{{ userInfo.name }} {{ userInfo.surname }}</v-list-tile-title>
                 <v-list-tile-sub-title>Administrator</v-list-tile-sub-title>
               </v-list-tile-content>
             </v-list-tile>
           </v-list>
           <v-divider></v-divider>
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn color="error" flat @click="logout()">Logout</v-btn>
           </v-card-actions>
         </v-card>
       </v-menu>
     </v-btn>
   </v-toolbar-items>
 </v-toolbar>
</template>
<script>
import store from '../../store'
export default {
 data() {
   return {
     userInfo: [],
     title: "",
     menu: false
   }
 },
 beforeMount() {
     this.axios.get('/api/auth/user', {
       headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
       }
     },
     ).then(response => {
         this.userInfo = response.data;
         store.commit('setUserInfo', response.data);
     }).catch(error => {
       if (error.response.status === 401 || error.response.status === 403) {
         this.$router.push({name: 'login'})
         store.commit('logoutUser');
         localStorage.setItem('token', '');
       }
     });
 },
 methods: {
   logout() {
     store.commit('logoutUser');
     localStorage.setItem('token', '');
     this.$router.push({name: 'login'})
   }
 }
}
</script>
<style lang="scss">
.title {
 font-size: 18px;
 font-weight: 600;
}
</style>
