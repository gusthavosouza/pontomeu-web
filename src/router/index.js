import Vue from 'vue'
import Router from 'vue-router'

// pages
import Home from '@/pages/home'
import Login from '@/pages/login'

// secure
import Secure from '@/pages/secure/secure'

import Index from '@/pages/Index'

Vue.use(Router)

// const NotFound = { template: "",
//     created: function() { window.location.href = "/static/404.html"; }
// }

const customRoutes = [
    {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/secure',
    name: 'Secure',
    component: Secure,
    meta: {
      requiresAuth: true,
      internal: true,
      layout: "internal"
    }
  }
  // { path: '/static/404', name: 'NotFound', component: NotFound },
  // { path: '*', name: 'NotFound', component: NotFound }
];

var router = new Router({
  mode: 'history',
  routes: customRoutes
})

router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   next({name: 'Login'});
  // } else {
  //   next();
  // }

next();

  // console.log(to)
  // console.log(from)
  // console.log(next)
  // if (to.meta.requiresAuth) {
  //   const authUser = JSON.parse(window.localStorage.getItem('authUser'))
  //   if (authUser && authUser.access_token) {
  //     next()
  //   } else {
  //     next({name: 'home'})
  //   }
  // }
})

export default router
