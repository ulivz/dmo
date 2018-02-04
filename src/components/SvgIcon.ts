import { makeComponent } from 'vue-inline'

export default makeComponent({
  github: require('!raw-loader!../svg/github.svg'),
  checkmark: require('!raw-loader!../svg/checkmark.svg'),
  clipboard: require('!raw-loader!../svg/clipboard.svg')
})
