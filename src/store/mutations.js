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
  if (!Array.isArray(modes)) {
    throw new Error('Expected \'modes\' to be array.')
  }
  state.modes = modes.map(mode => {
    if (typeof mode === 'string') {
      return {
        key: mode,
        text: mode
      }
    }
    return mode
  })
  state.title = title
  return {
    state,
    mutations
  }
}
