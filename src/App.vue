<template>
  <div class="layout">
    <!--<gradient-background class="header gradient-bg"/>-->
    <dmo-header/>
    <div class="layout-content">
      <div class="edit">
        <vue-codemirror v-model="userInput"
                        :mode="inputLang"
                        @focus="inputFocus"
                        @ready="handleInput"
                        @blur="inputBlur"></vue-codemirror>
      </div>
      <div class="preview">
        <pre :class="{'focus': isFocus}">{{ result }}</pre>
      </div>
    </div>
    <footer class="layout-copy">
      2016-2017 &copy; <a :href="userUrl">{{ (username || 'dmo').toUpperCase() }}</a>
    </footer>
  </div>
</template>

<script lang="ts">
  import { Vue } from "vue-property-decorator";

  // codemirror
  import 'codemirror/mode/htmlmixed/htmlmixed.js'
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/theme/monokai.css'

  // compnents
  import DmoHeader from './components/header.vue'
  import Gradientbackground from './components/gradient-background.vue'

  import { mapState, mapMutations, mapActions } from 'vuex'
  import { State, Getter, Action, Mutation } from 'vuex-class'
  import { detect, LANG } from 'program-language-detector'
  import { themes } from 'vue-codemirror-component'
  import { isGithubResourceURL } from './util/github-raw'
  import { Transformer } from './store/index'

  export default class App extends Vue {

    @State('input.title') title
    @State('input.input') input
    @State('input.placeholder') placeholder
    @State('input.inputLang') inputLang
    @State('input.outputLang') outputLang

    @State('user.username') username
    @State('user.userUrl') userUrl

    @State('transform.activeMode') activeMode
    @State('transform.modes') modes

    @Mutation('SELECT_MODE') SELECT_MODE
    @Mutation('SET_INPUT_LANG') SET_INPUT_LANG
    @Mutation('SET_OUTPUT_LANG') SET_OUTPUT_LANG

    @Action('GET_GITHUB_FILE_INPUT') GET_GITHUB_FILE_INPUT

    @Getter('activeTransformer') activeTransformer

    components: {
      DmoHeader,
      Gradientbackground
    }

    userInput = ''
    isFocus = false

    created() {
      this.SELECT_MODE(this.modes[0].key)
    }

    watch = {
      input(data) {
        this.userInput = data
      }
    }

    inputFocus() {
      this.isFocus = true
    }

    inputBlur() {
      this.isFocus = false
    }

    handleInput() {
      const { input, isUrl } = isGithubResourceURL(this.input)
      if (isUrl) {
        this.GET_GITHUB_FILE_INPUT(input)
      } else {
        this.userInput = input
      }
    }

    get result() {
      let result
      let inputDetectResult = detect(this.userInput)
      if (inputDetectResult !== this.inputLang && inputDetectResult !== LANG.Unknown) {
        console.log(inputDetectResult)
        this.SET_INPUT_LANG(inputDetectResult)
      }
      try {
        result = this.activeTransformer(this.userInput)
      }
      catch
        (error) {
        result = error.message
      }
      let outputDetectResult = detect(result)
      if (outputDetectResult !== this.outputLang) {
        this.SET_OUTPUT_LANG(outputDetectResult)
      }
      return result
    }
  }
</script>

<style lang="scss">
  .gradient-bg {
    position: fixed;
    width: 10px;
    height: 100vh;
    z-index: 10;
  }

  .layout {
    overflow-x: hidden;
    font-family: letter-gothic;
    border: 1px solid #d7dde4;
    &::-webkit-scrollbar {
      display: none;
    }
    dmo-header {

    }
    .layout-content {
      background: #fff;
      border-radius: 4px;
      box-sizing: border-box;
      overflow: hidden;
      margin: 15px;
      height: calc(100vh - 110px - 51px);
      @extend %clear-fix;
      .edit, .preview {
        float: left;
        width: 50%;
        height: 100%;
        padding: 15px;
        transition: all .25s;
      }
      .edit {
        .CodeMirror {
          background-color: #233;
          height: 100%;
          font-size: 16px;
          font-family: letter-gothic;
          padding: 10px;
          border: 4px solid #000;
          transition: all 0.3s ease;
          &:focus {
            background-color: #f1f1f1;
            outline: none;
          }
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
      .preview {
        pre {
          width: 100%;
          height: 100%;
          overflow: scroll;
          font-family: letter-gothic;
          padding: 10px;
          font-size: 16px;
          margin: 0;
          border: 4px solid black;
          background-color: white;
          border-style: dashed;
          &.focus {
            background-color: #f1f1f1;
          }
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
    .layout-copy {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
      a {
        text-decoration: underline;
      }
    }
  }

  @include to-liquid-breakpoint($medium) {
    .layout {
      .layout-content {
        height: calc(100vh - 138px - 51px);
        .edit, .preview {
          float: left;
          width: 100%;
          height: 50%;
          padding: 15px;
        }
        .edit {
          textarea {
          }
        }
        .preview {
          pre {
          }
        }
      }
      .layout-copy {
      }
    }
  }
</style>
