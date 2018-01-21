import Vue from 'vue'
import App from './App.vue'
import Plugins from './plugins'
import 'iview/dist/styles/iview.css'
import initializeStore from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/fonts/font.css'

Vue.use(Plugins)

NProgress.start();
NProgress.done();

function dmo(options) {
  new Vue({
    el: '#app',
    store: initializeStore(options),
    render: h => h(App)
  })
}

window.dmo = dmo
