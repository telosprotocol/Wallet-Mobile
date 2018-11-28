import Vue from 'vue'
import axios from 'axios'

import '@/assets/css/reset.css'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from './store'
import echarts from 'echarts'
import { Loadmore } from 'mint-ui'
import toast from '@/components/toast/toast'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import ga from 'vue-ga'

Vue.prototype.$axios = axios
Vue.component(Loadmore.name, Loadmore)
Vue.use(toast)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Es6Promise.polyfill()
ga(router, '')

var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}
firebase.initializeApp(config)

router.beforeEach((to, from, next) => {
  if (store.state.user.uid === 0) {
    let userInfo = localStorage.getItem('userInfoV1')
    if (userInfo) {
      store.commit('SET_USERDATA', JSON.parse(userInfo))
    }
  }
  if (to.path === '/login' || to.path === '/' || to.path === '/activepage' ||
        to.path === '/testnet/explorer' || to.path === '/explorer' ||
        to.path === '/transferpage') {
    next()
  } else {
    if (store.state.user.uid === 0) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

const _this = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
export default _this
