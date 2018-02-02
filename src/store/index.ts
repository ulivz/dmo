import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'
import mutations from './mutations'

import input, { State as InputState } from './modules/input'
import transform, { State as TransformState }from './modules/transform'
import user, { State as UserState } from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store<State>({
  plugins,
  mutations,
  modules: {
    input,
    transform,
    user
  }
})

export interface State {
  input: InputState;
  transform: TransformState;
  user: UserState
}

export interface Mode {
  key: string;
  text: string;
  active?: boolean;
}

export type Transformer = (input: string) => string;

export interface Transformers {
  [mode: string]: Transformer;
}
