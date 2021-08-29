import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // icon 使用
import Calendar from 'v-calendar/lib/components/calendar.umd' // vue 的日曆選擇
import DatePicker from 'v-calendar/lib/components/date-picker.umd' // vue的日期選擇
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Confirm from '@/components/orderConfirm.vue'
window.confirm = function() {};

// Register components in your 'main.js'
Vue.component('confirm', Confirm)
Vue.component('loading', Loading)
Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
