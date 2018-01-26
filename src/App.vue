<template>
  <div class="layout">
    <!--<gradient-background class="header gradient-bg"/>-->
    <dmo-header/>
    <div class="layout-content">
      <div class="edit">
        <V-Codemirror v-model="userInput" @focus="inputFocus" @blur="inputBlur"></V-Codemirror>
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

<script>
  import { THEME } from 'v-codemirror'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import header from './components/header.vue'
  import gradientBackground from './components/gradient-background.vue'

  function isGithubResourceURL(input) {
    let isUrl = false
    if (input.startsWith('$github')) {
      isUrl = true
      input = input.slice(input.indexOf('$github') + 8)
    } else if (input.startsWith('https://github.com/')) {
      isUrl = true
      input = input.replace('https://github.com/', '')
    }
    if (isUrl) {
      input = input.replace('blob/', '')
    }
    return {
      isUrl,
      input
    }
  }

  export default {
    components: {
      'dmo-header': header,
      'gradient-background': gradientBackground
    },
    data () {
      return {
        userInput: '',
        isFocus: false
      }
    },
    created() {
      const { input, isUrl } = isGithubResourceURL(this.input)

      if (isUrl) {
        this.GET_GITHUB_FILE_INPUT(input)
      } else {
        this.userInput = input
      }

      this.selectMode(this.modes[0].key)
      console.log(THEME)
    },
    watch: {
      input(data) {
        this.userInput = data
      }
    },
    methods: {
      ...mapMutations([
        'selectMode'
      ]),
      ...mapActions([
        'GET_GITHUB_FILE_INPUT'
      ]),
      inputFocus() {
        this.isFocus = true
      },
      inputBlur() {
        this.isFocus = false
      }
    },
    computed: {
      ...mapState([
        'input',
        'activeTransformer',
        'modes',
        'title',
        'activeMode',
        'placeholder',
        'username',
        'userUrl'
      ]),
      result() {
        return this.activeTransformer(this.userInput)
      }
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
