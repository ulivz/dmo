import Vue from 'vue'
import App from './App.vue'
import Plugins from './plugins'
import initializeStore from './store'
import 'nprogress/nprogress.css'
import './assets/fonts/font.css'

Vue.use(Plugins)


function dmo(options) {
  new Vue({
    el: '#app',
    store: initializeStore(options),
    render: h => h(App)
  })
}

window.dmo = dmo
export default dmo
