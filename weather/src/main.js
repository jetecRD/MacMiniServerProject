import Vue from 'vue'
import App from './app/App.vue'
import router from './router/router'
import store from './store/store'
import "./resource.js"

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),

}).$mount('#app')