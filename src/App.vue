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
    dmo-header {

    }
    .layout-content {
      background: #fff;
      border-radius: 4px;
      box-sizing: border-box;
      overflow: hidden;
      margin: 15px;
      position: absolute;
      top: 110px;
      left: 0;
      right: 0;
      bottom: 51px;
      @extend %clear-fix;
      .edit, .preview {
        float: left;
        width: 50%;
        height: 100%;
        padding: 15px;
      }
      .edit {
        textarea {
          width: 100%;
          height: 100%;
          font-family: letter-gothic;
          font-size: 16px;
          padding: 10px;
          border: 4px solid #000;
          transition: all 0.3s ease;
          &:focus {
            background-color: #f1f1f1;
            outline: none;
          }
        }
      }
      .preview {
        pre {
          width: 100%;
          height: 100%;
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

<template>
  <div class="layout">
    <!--<gradient-background class="header gradient-bg"/>-->
    <dmo-header/>
    <div class="layout-content">
      <div class="edit">
        <textarea @focus="inputFocus"
                  @blur="inputBlur"
                  v-model="userInput" :placeholder="placeholder"></textarea>
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
  import { mapState, mapMutations } from 'vuex'
  import header from './components/header.vue'
  import gradientBackground from './components/gradient-background.vue'

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
      this.selectMode(this.modes[0].key)
    },
    methods: {
      ...mapMutations([
        'selectMode'
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



