import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
