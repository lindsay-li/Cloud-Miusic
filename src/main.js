// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './store/index.js'
import * as filters from './filter/index'
import router from './router/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import $ from 'jquery'
import Scrolltop from './components/Scrolltop.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(iView);
Vue.component('app-scroll',Scrolltop)

Vue.prototype.$http = axios;

Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
}) 


// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  // to and from are both route objects
  if(to.path.indexOf('/player')!=-1){
    router.app.$options.store.commit('showHeight')
  }else{
    router.app.$options.store.commit('hideHeight')
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
