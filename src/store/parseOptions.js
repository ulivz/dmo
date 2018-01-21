const GITHUB_BASE_URL = 'https://github.com'
const DMO_URL = 'ulivz/dmo'

export default function parseOptions
  ({
     transformers,
     modes,
     title,
     placeholder,
     username,
     name,
   } = {}) {
  const state = {}

  state.title = title
  state.placeholder = placeholder

  // username, name, userUrl, projectUrl
  state.username = username
  state.name = name
  state.userUrl = GITHUB_BASE_URL + '/' + (state.username || DMO_URL)
  if (!username || !name) {
    state.projectUrl = state.userUrl
  } else {
    state.projectUrl = state.userUrl + '/' + state.name
  }

  // transformers, modes
  state.transformers = transformers

  if (!modes) {
    modes = Object.keys(transformers)
  }

  if (typeof modes === 'string') {
    state.modes = [{
      active: true,
      key: modes,
      text: modes
    }]

  } else if (Array.isArray(modes)) {
    state.modes = modes.map((mode, idx) => {
      let active = false
      if (idx === 0) {
        active = true
      }
      if (typeof mode === 'string') {
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

  return state
}
