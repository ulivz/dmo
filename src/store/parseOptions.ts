const GITHUB_BASE_URL = 'https://github.com'
const DMO_URL = 'ulivz/dmo'

type ITransformer = (input: string) => string;

export interface ITransformers {
  [key: string]: ITransformer
}

interface IDmoMode {
  key: string;
  text: string;
  active: boolean;
}

export interface IDmoOption {
  title?: string;
  placeholder?: string;
  input?: string;
  transformers?: ITransformers;
  modes?: string | string[] | IDmoMode[];
  username?: string;
  name?: string;
}

export interface IDmoState extends IDmoOption {
  userUrl?: string;
  projectUrl?: string;
  activeMode?: IDmoMode;
  activeTransformer?: ITransformer;
  inputLang?: string;
  outputLang?: string;
}

export default function parseOptions
  ({
     title,
     placeholder,
     input,
     transformers,
     modes,
     username,
     name,
   }: IDmoOption = {}) {
  const state: IDmoState = {}

  state.input = input
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
