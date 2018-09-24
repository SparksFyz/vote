import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueScroller from 'vue-scroller'
import Mint from 'mint-ui'
import 'lib-flexible/flexible.js'

import 'font-awesome/css/font-awesome.min.css'
import 'mint-ui/lib/style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vmodal from 'vue-js-modal'

import 'reset-css'

FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(VueScroller)
Vue.use(Mint)
Vue.use(vmodal, { dynamic: true, injectModalsContainer: true })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
