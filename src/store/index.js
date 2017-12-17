import Vue from 'vue'
import Vuex from 'vuex'
import initializeMutations from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export default function initializeStore(options) {
  return new Vuex.Store({
    ...initializeMutations(options),
    plugins
  })
}
