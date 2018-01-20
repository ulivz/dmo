<template>
  <div class="layout">
    <!--<gradient-background class="header gradient-bg"/>-->
    <dem-header/>
    <div class="layout-content">
      <div class="edit">
        <textarea name="" id="" cols="30" rows="10" v-model="userInput" :placeholder="placeholder"></textarea>
      </div>
      <div class="preview">
        <pre>{{ result }}</pre>
      </div>
    </div>
    <div class="layout-copy">
      2016-2017 &copy; ULIVZ
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import header from './components/header.vue'
  import gradientBackground from './components/gradient-background.vue'

  export default {
    components: {
      'dem-header': header,
      'gradient-background': gradientBackground
    },
    data () {
      return {
        userInput: ''
      }
    },
    created() {
      this.changeMode(this.modes[0].key)
    },
    methods: {
      ...mapMutations([
        'changeMode'
      ])
    },
    computed: {
      ...mapState([
        'activeTransformer',
        'modes',
        'title',
        'activeMode',
        'placeholder'
      ]),
      result() {
        return this.activeTransformer(this.userInput)
      }
    }
  }
</script>

<style lang="scss">
  .layout {
    font-family: letter-gothic;
    border: 1px solid #d7dde4;
    .demojs-title {
      position: absolute;
      font-weight: bold;
      font-size: 25px;
      left: 20px;
    }
  }

  .header.gradient-bg {
    position: fixed;
    width: 10px;
    height: 100vh;
    z-index: 10;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: calc(100vh - 196px);
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    display: flex;
    box-sizing: border-box;
    .edit {
      padding: 15px;
      flex: 1;
      textarea {
        font-size: 16px;
        padding: 10px;
        width: 100%;
        height: 100%;
        border: 4px solid #000;
        transition: all 0.3s ease;
        &:focus {
          background-color: #ececec;
          /*color: white;*/
          outline: none;
        }
      }
    }
    .preview {
      padding: 15px;
      flex: 1;
      pre {
        padding: 10px;
        font-size: 16px;
        margin: 0;
        border: 4px solid black;
        border-style: dashed;
        height: 100%;
      }
    }
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>


