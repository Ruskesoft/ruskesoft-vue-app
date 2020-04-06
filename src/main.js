import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import localizeFilter from "./localize"
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';

Vue.filter('localize', localizeFilter)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
