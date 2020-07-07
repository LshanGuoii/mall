import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
Vue.config.productionTip = false 
//事件总线
Vue.prototype.$bus= new Vue()
Vue.use(toast)
FastClick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/load.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
