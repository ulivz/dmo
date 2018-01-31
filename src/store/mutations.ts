import { Mutation, MutationTree } from 'vuex'
import NProgress from 'nprogress'
import { State } from './index'

const mutations: MutationTree<State> = {
  PROGRESS_START() {
    NProgress.start()
  },
  PROGRESS_DONE() {
    NProgress.done()
  }
}

export default mutations
