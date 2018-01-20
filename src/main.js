import Vue from 'vue'
import App from './App.vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import initializeStore from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import './assets/fonts/font.css'

NProgress.start();
NProgress.done();

Vue.use(iview)

function dmo(options) {
  new Vue({
    el: '#app',
    store: initializeStore(options),
    render: h => h(App)
  })
}

window.dmo = dmo
