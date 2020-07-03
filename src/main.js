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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
