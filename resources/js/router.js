import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'
Vue.use(VueRouter);
const routes = [
 {
   path: '/',
   name: 'home',
   component: () => import('./components/pages/Home.vue'),
   redirect: { name: 'dashboard' },
   meta: {
     auth: true,
     layout: 'app-layout'
   },
   children: [
     {
       path: '',
       name: 'dashboard',
       component: () => import('./components/pages/Dashboard.vue'),
       meta: {
         auth: true,
         layout: 'app-layout'
       }
     }
   ]
 },
 {
   path: '/login',
   name: 'login',
   component: () => import('./components/auth/Login.vue'),
   meta: {
     auth: false,
     layout: 'simple-layout'
   }
 },
 {
   path: '/logout',
   name: 'logout',
   component: () => import('./components/auth/Logout.vue'),
 }
]
const router = new VueRouter({
 mode: 'history',
 store,
 routes
})
router.beforeEach((to, from, next) => {
 // check if the route requires authentication and user is not logged in
 if (to.matched.some(route => route.meta.auth) && !store.state.isLoggedIn) {
   // redirect to login page
   next({ name: 'login' })
   return;
 }
 // if logged in redirect to dashboard
 if (to.path === '/login' && store.state.isLoggedIn) {
   next({ name: 'home' });
   return;
 }
 next();
});
export default router
