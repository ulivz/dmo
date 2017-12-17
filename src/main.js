import Vue from 'vue'
import App from './App.vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import initializeStore from './store'

Vue.use(iview)

function demojs(options) {
  new Vue({
    el: '#app',
    store: initializeStore(options),
    render: h => h(App)
  })
}

window.demojs = demojs
