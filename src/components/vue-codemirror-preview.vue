<template>
  <div class="cm-s-mdn-like">
    <pre :class="{bg: bg}"><code :class="lang" ref="code">{{ code }}</code></pre>
    <span class="copy" @click="clip">
      <svg-icon name="clipboard" v-show="!copied" class="clipboard"></svg-icon>
      <svg-icon name="checkmark" v-show="copied" class="checkmark"></svg-icon>
    </span>
  </div>
</template>

<script lang="ts">
  import { State, Getter, Action, Mutation } from 'vuex-class'
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import 'codemirror/addon/runmode/runmode.js'
  import 'codemirror/theme/mdn-like.css'
  import { normalizeModeName } from 'vue-codemirror-component'

  import SvgIcon from './SvgIcon'
  import CodeMirror from 'codemirror'
  import Clipboard from 'clipboard';

  @Component({ components: { SvgIcon } })
  export default class VueCodemirrorPreview extends Vue {
    @Prop()
    bg: string

    @Prop()
    code: string

    @Prop({ default: 'javascript' })
    lang: string

    copied: boolean = false

    updated() {
      const mode = normalizeModeName(this.lang)
      CodeMirror.runMode(this.code, mode, (this.$refs.code as any))
    }

    clip() {
      const code = this.code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      const clipboard = new Clipboard('.copy', {
        text () {
          return code
        }
      })

      clipboard.on('success', (e) => {
        e.clearSelection()
        clipboard.destroy()
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      });
    }
  }

</script>

<style lang="scss" scoped>
  .cm-s-mdn-like {
    pre code {
      font-weight: bold;
      font-family: letter-gothic;
    }
  }

  div {
    position: relative;
    font-size: 14px;
  }

  span.copy {
    border-radius: 0 0 3px 3px;
    padding: 2px 5px;
    position: absolute;
    top: 20px;
    right: 18px;
    color: #b2b2b2;
    cursor: pointer;
  }

  .bg + span.copy {
    right: 5px;
  }

  span.copy:hover {
    color: #5c6b77;
  }
</style>
