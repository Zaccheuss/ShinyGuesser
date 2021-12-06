import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAnalytics from 'vue-analytics';

import TimeFormatter from './plugins/TimeFormatter.js';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import './main.css';

Vue.use(VueAnalytics, {
  id: "UA-187473134-1",
  router
})
Vue.use(TimeFormatter);
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');