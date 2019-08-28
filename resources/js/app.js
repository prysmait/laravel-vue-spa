// JS
import axios from 'axios'
import store from './store'
import Vue from 'vue'
import router from './router.js'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import App from './components/App'
import AppLayout from './components/template/AppLayout'
import SimpleLayout from './components/template/SimpleLayout'
import Vuetify from 'vuetify'
const  moment = require('moment')

// CSS
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'

// Momentjs
require('moment/locale/it')
Vue.use(require('vue-moment'), {
    moment
});

// VUE
window.Vue = Vue

// Set Vue router
Vue.use(VueRouter)
Vue.router = router

// Set vue axios
Vue.use(VueAxios, axios)
axios.interceptors.response.use(
 function(response) {
   return response;
 },
 function(error) {
   if (error.response.status == 400 && error.response.data.error == "Unauthorized") {
     localStorage.removeItem('token');
     router.go('/');
   }
 }
);

// Set validation
Vue.use(Vuelidate)

// App
Vue.component('App', App)
Vue.component('simple-layout', SimpleLayout)
Vue.component('app-layout', AppLayout)
const app = new Vue({
   router,
   store,
   vuetify: new Vuetify(),
   render: h => h(App)
}).$mount('#app');
