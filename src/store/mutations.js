const noop = raw => raw

const state = {
  initialized: false,
  activeMode: null,
  activeTransformer: null,
  placeholder: null,
  transformers: null,
  modes: null
}

const mutations = {
  changeMode (state, mode) {
    state.activeMode = mode
    state.activeTransformer = state.transformers[mode]
    if (!state.activeTransformer) {
      state.activeTransformer = noop
    }
  }
}

export default function initializeMutations({
                                              transformers,
                                              modes,
                                              title,
                                              placeholder
                                            } = {}) {
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
  state.placeholder = placeholder
  return {
    state,
    mutations
  }
}
