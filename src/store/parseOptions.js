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

  // username, name, url
  state.username = username
  state.name = name
  if (!username) {
    state.url = 'https://github.com/ulivz/dmo'
  } else if (!name) {
    state.url = 'https://github.com/' + username
  } else {
    state.url = 'https://github.com/' + username + '/' + name
  }

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
