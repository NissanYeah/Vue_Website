// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueAxios from 'vue-axios'
import axios from 'axios'
import 'bootstrap'
import App from './App'
import router from './router'

Vue.use(vueAxios, axios)

Vue.config.productionTip = false

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
