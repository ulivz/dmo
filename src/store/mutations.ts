import { Mutation, MutationTree } from 'vuex'
import NProgress from 'nprogress'
import { State } from './index'

const PROGRESS_START: Mutation<State> = (state: State) => {
  NProgress.start()
}

const PROGRESS_DONE: Mutation<State> = (state: State) => {
  NProgress.done()
}

const mutations: MutationTree<State> = {
  PROGRESS_START,
  PROGRESS_DONE
}

export default mutations
