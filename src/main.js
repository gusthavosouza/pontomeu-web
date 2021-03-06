// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// components
import Vue from 'vue'
import App from './App'
import CustomLoader from "./components/customLoader"
import CustomDrawer from "./components/customDrawer"


// layouts
import InternalLayout from "./layouts/internalLayout"
import DefaultLayout from "./layouts/defaultLayout"

// import customRouter from './router'
import router from './router'

import vuetify from './plugins/vuetify';

Vue.component("internal-layout", InternalLayout);
Vue.component("default-layout", DefaultLayout);
Vue.component('loader-spinner', CustomLoader);
Vue.component('custom-drawer', CustomDrawer);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  vuetify,
  render: h => h(App)
}).$mount('#app')
