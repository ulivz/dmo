import Vue from 'vue'
import App from './App.vue'
import Plugins from './plugins'
import store from './store'
import 'nprogress/nprogress.css'
import './assets/fonts/font.css'

Vue.use(Plugins)

function dmo(options) {




  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })
}

(<any>window).dmo = dmo
export default dmo
