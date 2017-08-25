import Vue from 'vue'

import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueMaterial);
Vue.prototype.$http = axios;
Vue.prototype.$apiKey = "";
/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')

