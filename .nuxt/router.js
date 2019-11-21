import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7a53d2e7 = () => interopDefault(import('..\\..\\..\\..\\Users\\gusta\\AppData\\Roaming\\npm-cache\\_npx\\17144\\node_modules\\nuxt\\node_modules\\@nuxt\\vue-app\\template\\pages\\index.vue' /* webpackChunkName: "" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "",
    component: _7a53d2e7
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
