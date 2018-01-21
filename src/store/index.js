import Vue from 'vue'
import Vuex from 'vuex'
import initStateAndMutations from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export default function initializeStore(options) {
  return new Vuex.Store({
    ...initStateAndMutations(options),
    plugins
  })
}
