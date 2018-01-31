import { State, Mode, Transformers } from './index'
import { Store } from 'vuex'
import { noop } from '../util/shared'
import * as types from './mutation-types'

const GITHUB_BASE_URL = 'https://github.com'
const DMO_URL = 'ulivz/dmo'

interface Options {
  title: string;
  transformers: Transformers;
  placeholder?: string;
  input?: string;
  modes?: string | string[] | Mode[];
  username?: string;
  name?: string;
}

function parseOptions(store: Store<State>, options: Options = { title: '', transformers: [noop] }) {

  let { title, placeholder, input, transformers, modes, username, name } = options

  // input
  store.commit(types.SET_TITLE, title)
  store.commit(types.SET_PLACEHOLDER, placeholder)
  store.commit(types.SET_INPUT, input)

  // user
  let userUrl = GITHUB_BASE_URL + '/' + (username || DMO_URL)
  let projectUrl
  if (!username || !name) {
    projectUrl = userUrl
  } else {
    projectUrl = userUrl + '/' + name
  }
  store.commit(types.SET_USER, { username, name, userUrl, projectUrl })

  // transform
  store.commit(types.SET_TRANSFORMERS, transformers)

  if (!modes) {
    modes = Object.keys(transformers)
  }

  if (typeof modes === 'string') {
    modes = [{
      key: modes,
      text: modes,
      active: true
    }]

  } else if (Array.isArray(modes)) {
    modes = modes.map((mode, idx) => {
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
