import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'
import localizeFilter from "./localize"
import LoadPanel from '@/components/common/LoadPanel'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';

Vue.filter('localize', localizeFilter)
Vue.component('LoadPanel', LoadPanel)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
