import Vue from 'vue'
import App from './App.vue'
import Plugins from './plugins'
import store from './store'
import parseOptions from './store/parseOptions'
import 'nprogress/nprogress.css'
import './assets/fonts/font.css'
import inject from './inject'

Vue.use(Plugins)

function dmo(options) {
  parseOptions(store, options)

  inject(document, {
    title: store.state.transform.title
  })

  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })
}

(<any>window).dmo = dmo
export default dmo
