<template>
  <div class="cm-s-mdn-like">
    <pre :class="{bg: bg}"><code :class="lang" ref="code">{{ code }}</code></pre>
    <!--<span class="copy" @click="clip">-->
    <!--<Icon type="clipboard" size="18" v-show="!copied"></Icon>-->
    <!--<Icon type="checkmark" size="18" v-show="copied" style="color:#5cb85c"></Icon>-->
    <!--</span>-->
  </div>
</template>

<script lang="ts">
  import { State, Getter, Action, Mutation } from 'vuex-class'
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import 'codemirror/addon/runmode/runmode.js'
  import 'codemirror/theme/mdn-like.css'
  import { normalizeModeName } from 'vue-codemirror-component'

  import CodeMirror from 'codemirror'

  @Component
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
    top: 5px;
    right: 0;
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
