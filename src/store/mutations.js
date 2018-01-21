import parseOptions from './parseOptions'

const noop = raw => raw

const state = {
  input: null,
  username: null,
  name: null,
  url: null,
  activeMode: null,
  activeTransformer: null,
  placeholder: null,
  transformers: null,
  modes: null
}

const mutations = {
  selectMode (state, mode) {
    state.activeMode = mode
    state.activeTransformer = state.transformers[mode]
    if (!state.activeTransformer) {
      state.activeTransformer = noop
    }
  }
}

export default function initStateAndMutations(options) {
  Object.assign(state, parseOptions(options))
  return {
    state,
    mutations
  }
}
