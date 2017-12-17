const state = {
  initialized: false,
  activeMode: null,
  activeTransformer: null
}

const mutations = {
  changeMode (state, mode) {
    state.activeMode = mode
    state.activeTransformer = state.transformers[mode]
  }
}

export default function initializeMutations({ transformers, modes, title }) {
  state.transformers = transformers
  state.modes = modes
  state.title = title
  return {
    state,
    mutations
  }
}
