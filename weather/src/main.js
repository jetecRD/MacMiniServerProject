import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './extensions'
import {globalGuard} from "./router/guard"

Vue.config.productionTip = false

router.beforeEach(globalGuard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
