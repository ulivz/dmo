import { State, Mode, Transformers } from './index'
import { Store } from 'vuex'
import { noop } from '../util/shared'
import * as types from './mutation-types'

const GITHUB_BASE_URL = 'https://github.com'
const DMO_URL = 'ulivz/dmo'

type HighlightOption = {
  [mode in keyof Transformers]: string
  }

interface Options {
  title: string;
  transformers: Transformers;
  placeholder?: string;
  input?: string;
  modes?: string | string[] | Mode[];
  username?: string;
  name?: string;
  detectLanguage?: boolean;
}

export default function parseOptions(store: Store<any>, options: Options = {
  title: '',
  transformers: { 'Dmo': noop }
}) {

  let { title, placeholder, input, transformers, modes, username, name, detectLanguage } = options
  
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
  store.commit(types.SET_TITLE, title)
  store.commit(types.SET_PLACEHOLDER, placeholder)
  store.commit(types.SET_INPUT, input)
  store.commit(types.SET_TRANSFORMERS, transformers)
  store.commit(types.SET_DETECT_LANGUAGE, detectLanguage)

  if (!modes) {
    modes = Object.keys(transformers)
  }

  if (typeof modes === 'string') {
    modes = [{
      key: (modes as string),
      text: (modes as string),
      active: true
    }]

  } else if (Array.isArray(modes)) {
    modes = (modes as Array<string | Mode>).map((mode: string | Mode, idx: number) => {
      let active: boolean = false
      if (idx === 0) {
        active = true
      }
      if (typeof mode === 'string') {
        return {
          key: (mode as string),
          text: (mode as string),
          active
        }
      }
      return {
        active,
        ...(mode as Mode)
      }
    })
  }

  store.commit(types.SET_MODES, modes)

}
