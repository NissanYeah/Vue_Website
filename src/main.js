// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueAxios from 'vue-axios'
import axios from 'axios'
import 'bootstrap'
import App from './App'
import router from './router'
import Loading from 'vue-loading-overlay';
import pagination from './components/pagination';
import currencyFilter from './components/filters/currency'
import './bus';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component("Loading", Loading)
Vue.component('pagination', pagination);
Vue.filter('currency', currencyFilter);


// 啟用元件

Vue.use(vueAxios, axios)

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log("守門員啟動")
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data.success);
      if (response.data.success) {
        next()
      } else {
        console.log("請進行登陸")
        next({
          path: '/login'
        })
      }
    });

  } else next()

})
