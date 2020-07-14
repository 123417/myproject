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
import Vuex from 'vuex'
Vue.use(Vuex)
var store=new Vuex.Store({
  state:{
    nickname:'',
    cartCount:''
  },
  mutations:{
    updateNickname(state,nickname){
      state.nickname=nickname
    },
    //初始值
    initCartCount(state,cartCount){
      state.cartCount=cartCount
    },
    //同步更新值
    updateCartCount(state,cartcount){
      state.cartCount+=cartcount
    }
  }
})
import {currency} from './util 钱的标识符/currency.js'
Vue.filter('c',currency)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
