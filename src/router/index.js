import Vue from 'vue'
import Router from 'vue-router'

// pages
import Home from '@/pages/home'
import Login from '@/pages/login'

// secure
import Secure from '@/pages/secure/secure'
import SecureList from '@/pages/secure/secureList'

import Index from '@/pages/Index'
import { store } from '@/api/store'

Vue.use(Router)

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
  },
  {
    path: '/secure/:id',
    name: 'SecureList',
    component: SecureList,
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.isLogged()) {
      next( { name: 'Login' } );
      return;
    }
  }
  next();

// next();

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
