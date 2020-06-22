import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/swiper/css/swiper.css'


Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false


// 添加事件总线
Vue.prototype.$bus = new Vue()


// 快速点击调用
FastClick.attach(document.body)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

