import NProgress from 'nprogress'
import parseOptions from './parseOptions'
import { getGithubRaw } from '../util/github-raw'
import { LANG } from 'program-language-detector'
import { IDmoState } from './parseOptions'

const noop = raw => raw

const state: IDmoState = {
  input: null,

  username: null,
  name: null,

  userUrl: null,
  projectUrl: null,

  activeMode: null,
  activeTransformer: null,

  placeholder: null,
  transformers: null,
  modes: null,

  inputLang: LANG.JavaScript,
  outputLang: LANG.JavaScript
}

const mutations = {

  PROGRESS_START() {
    NProgress.start()
  },

  PROGRESS_DONE() {
    NProgress.done()
  },

  SELECT_MODE (state: IDmoState, mode) {
    state.activeMode = mode
    state.activeTransformer = state.transformers[mode]
    if (!state.activeTransformer) {
      state.activeTransformer = noop
    }
  },

  SET_INPUT_LANG(state: IDmoState, lang) {
    state.inputLang = lang
  },

  SET_OUTPUT_LANG(state: IDmoState, lang) {
    state.outputLang = lang
  },

  SET_INPUT (state: IDmoState, input) {
    state.input = input
  },

}

const actions = {
  GET_GITHUB_FILE_INPUT({ commit }, path) {
    commit('PROGRESS_START')
    return getGithubRaw(path)
      .then(response => {
        commit('SET_INPUT', response.body)
        commit('PROGRESS_DONE')
      })
      .catch(error => {
        commit('SET_INPUT', error)
        commit('PROGRESS_DONE')
      })
  }
}

export default function initStateAndMutations(options) {
  Object.assign(state, parseOptions(options))
  return {
    state,
    actions,
    mutations
  }
}
