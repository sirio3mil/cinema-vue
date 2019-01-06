import Vue from 'vue'
import Vuex from 'vuex'
import Bootstrap from 'bootstrap-vue'
import App from './App.vue'
import Router from 'vue-router'
import Routes from './routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Bootstrap)
Vue.use(Router)

const router = new Router({
  routes: Routes
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')