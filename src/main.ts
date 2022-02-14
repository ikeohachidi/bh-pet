import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/main.scss';
import 'remixicon/fonts/remixicon.css';
import vuetify from './plugins/vuetify'

import PeriodChips from '@/components/PeriodChips/PeriodChips.vue';
import AdminTitle from '@/components/AdminTitle/AdminTitle.vue';

Vue.config.productionTip = false

Vue.component('period-chips', PeriodChips);
Vue.component('admin-title', AdminTitle);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
