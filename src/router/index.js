import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/view/GoodsList.vue'
import Cart from '@/view/Cart.vue'
import Address from '@/view/Address.vue'
import OrderConfirm from '@/view/OrderConfirm.vue'
import OrderSuccess from '@/view/OrderSuccess.vue'
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
    },
    {
      path: '/orderConfim',
      component: OrderConfirm
    },
    {
      path: '/OrderSuccess',
      component: OrderSuccess
    }
  ]
})
