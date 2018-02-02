import { Commit } from 'vuex'
import { LANG } from 'program-language-detector'
import * as types from '../mutation-types'
import { getGithubFileRawContent } from '../../util/github-raw'

export interface State {
  value: string;
  title: string;
  placeholder: string;
  inputLang?: string,
  outputLang?: string
}


// state
const state: State = {
  value: '',
  title: '',
  placeholder: '',
  inputLang: LANG.JavaScript,
  outputLang: LANG.JavaScript
}

// mutations
const mutations = {

  [types.SET_TITLE] (state: State, title: string) {
    state.title = title
  },

  [types.SET_INPUT] (state: State, input: string) {
    state.value = input
  },

  [types.SET_PLACEHOLDER] (state: State, placeholder: string) {
    state.placeholder = placeholder
  },

  [types.SET_INPUT_LANG] (state: State, lang: string) {
    state.inputLang = lang
  },

  [types.SET_OUTPUT_LANG] (state: State, lang: string) {
    state.outputLang = lang
  }
}

const actions = {
  GET_GITHUB_FILE_INPUT(context: { commit: Commit, state: State }, path) {
    context.commit('PROGRESS_START')
    return getGithubFileRawContent(path)
      .then(response => {
        context.commit('SET_INPUT', response.body)
        context.commit('PROGRESS_DONE')
      })
      .catch(error => {
        context.commit('SET_INPUT', error)
        context.commit('PROGRESS_DONE')
      })
  }
}

export default {
  state,
  actions,
  mutations
}
