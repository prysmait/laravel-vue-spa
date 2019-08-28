import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
 state: {
   isLoggedIn: !!localStorage.getItem('token'),
   userInfo: null
 },
 mutations: {
   loginUser(state) {
     state.isLoggedIn = true
   },
   logoutUser(state) {
     state.isLoggedIn = false;
     state.environment = false
   },
   setUserInfo (state, payload) {
     state.userInfo = payload;
   },
 },
})
