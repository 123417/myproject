import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/view/GoodsList.vue'
import Cart from '@/view/Cart.vue'
import Address from '@/view/Address.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/Cart',
      component: Cart
    },
    {
      path: '/Address',
      component: Address
    }
  ]
})
