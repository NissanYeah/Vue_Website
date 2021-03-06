import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import login from '@/components/pages/login'
import logout from '@/components/pages/logout'
import product from '@/components/pages/product'
import store from '@/components/pages/store'
import coupon from '@/components/pages/coupon'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import order from '@/components/pages/order'


Vue.use(Router)
export default new Router({
  routes: [{
      path: '*',
      redirect: '/login'
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: dashboard,
      children: [{
        path: 'product',
        component: product,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'coupon',
        component: coupon,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'order',
        component: order,
        meta: {
          requiresAuth: true
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: login,

    },
    {
      path: '/logout',
      name: 'logout',
      component: logout,

    },
    {
      path: '/',
      name: 'dashboard',
      component: dashboard,
      children: [{
        path: 'store',
        name: 'store',
        component: store,
      }, {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
      }]

    }
  ]
})
