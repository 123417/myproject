// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from "vue-infinite-scroll"//滚动分页插件
Vue.use(infiniteScroll)//使用
import axios from "axios"
Vue.prototype.$axios=axios
import lazyload from "vue-lazyload"//导入懒加载
Vue.use(lazyload,{
  loading:'/static/loading-svg/loading-balls.svg'
})
Vue.config.productionTip = false

import {currency} from './util 钱的标识符/currency.js'
Vue.filter('c',currency)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
