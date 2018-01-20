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
  state.title = title
  state.placeholder = placeholder

  // modes
  if (typeof modes === 'string') {
    state.modes = [{
      key: modes,
      text: modes
    }]
  } else if (Array.isArray(modes)) {
    state.modes = modes.map((mode, idx) => {
      let active = false
      if (typeof mode === 'string') {
        if (idx === 0) {
          active = true
        }
        return {
          key: mode,
          text: mode,
          active
        }
      }
      return {
        active,
        ...mode
      }
    })
  }

  return {
    state,
    mutations
  }
}
