import * as types from '../mutation-types'

export interface State {
  username: string;
  name: string;
  userUrl: string;
  projectUrl: string;
}

const state: State = {
  username: '',
  name: '',
  userUrl: '',
  projectUrl: ''
}

const mutations = {
  [types.SET_USER] (state: State, payload: State) {
    state.username = payload.username
    state.name = payload.name
    state.userUrl = payload.userUrl
    state.projectUrl = payload.projectUrl
  }
}

export default {
  state,
  mutations
}
