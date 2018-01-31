import { Commit } from 'vuex'
import { noop } from '../../util/shared'
import { Mode, Transformer, Transformers } from '../index'
import * as types from '../mutation-types'

export interface State {
  modes?: string | string[] | Mode[];
  transformers?: Transformers;
  activeMode?: string;
}

const state: State = {
  transformers: null,
  checkoutStatus: null
}

const mutations = {
  [types.SET_TRANSFORMERS] (state: State, transformers: Transformers) {
    state.transformers = transformers
  },

  [types.SELECT_MODE] (state: State, mode: string) {
    state.activeMode = mode
  }
}

const getters = {
  activeTransformer(state: State): Transformer {
    let transformer = state.transformers[state.activeMode]
    if (!transformer) {
      return noop
    }
    return transformer
  }
}

export default {
  state,
  getters,
  mutations
}
