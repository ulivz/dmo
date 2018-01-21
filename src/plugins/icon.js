import icons from '../assets/icon'

export default {
  install(Vue) {
    Vue.prototype.$icon = iconName => icons[iconName]
  }
}
