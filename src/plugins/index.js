import VueCodemirror from 'vue-codemirror-component'

export default {
  install(Vue) {
    Vue.use(VueCodemirror, {
      loadTheme(theme) {
        return import('codemirror/theme/' + theme + '.css')
      },
      loadMode(mode) {
        return import('codemirror/mode/' + mode + '/' + mode + '.js')
      }
    })
  }
}
