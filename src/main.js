// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import HelloWorld from '@/components/HelloWorld'
import InternalLayout from "./layouts/internalLayout"
import DefaultLayout from "./layouts/defaultLayout"

// import customRouter from './router'
import router from './router'

import vuetify from './plugins/vuetify';
// import Vuetify from 'vuetify/lib'

Vue.component("internal-layout", InternalLayout);
Vue.component("default-layout", DefaultLayout);

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  vuetify,
  render: h => h(App)
}).$mount('#app')
