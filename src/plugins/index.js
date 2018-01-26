import icon from './icon'
import VCodemirror from 'v-codemirror'

export default {
  install(Vue) {
    Vue.use(icon)
    Vue.use(VCodemirror)
  }
}
