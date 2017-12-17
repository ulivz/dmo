<template>
  <div class="layout">
    <Menu mode="horizontal" :active-name="activeMode" @on-select="changeMode">
      <div class="demojs-title">{{ title }}</div>
      <div class="layout-assistant">
        <MenuItem v-for="mode in modes" :key="mode.key" :name="mode.key">
          {{ mode.text }}
        </MenuItem>
      </div>
    </Menu>
    <div class="layout-content">
      <div class="edit">
        <Input v-model="userInput" type="textarea" :rows="30" placeholder="Enter something..."></Input>
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

  export default {
    data () {
      return {
        userInput: `<div class="header">
  <div class="tabs"></div>
</div>
<div class="content">
  <div class="sidebar"></div>
</div>
<div class="footer"></div>
`
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
        'activeMode'
      ]),
      result() {
        return this.activeTransformer(this.userInput)
      }
    }
  }
</script>

<style lang="scss">
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    .demojs-title {
      position: absolute;
      font-weight: bold;
      font-family: serif;
      font-size: 25px;
      left: 20px;
    }
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
    min-height: calc(100vh - 100px);
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    display: flex;
    .edit {
      padding: 15px;
      flex: 1;
      height: 100%;
    }
    .preview {
      padding: 15px;
      flex: 1;
      height: 100%;
    }
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>


