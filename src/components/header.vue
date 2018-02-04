<template>
  <header class="dmo-header">
    <div class="dmo-title">
      <a href="#">{{ titlep1 }}<b>{{ titlep2 }}</b><span><sup>&copy;</sup></span></a>
    </div>
    <dmo-menu class="dmo-menu"/>
    <a class="dmo-badge gradient-background" :href="projectUrl" target="_blank">
      <svg-icon name="github" class="svg-icon"></svg-icon>
    </a>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Getter, Action, Mutation } from 'vuex-class'

  import DmoMenu from './menu.vue'
  import SvgIcon from './SvgIcon'
  import { mapState } from 'vuex'

  @Component({
    components: { DmoMenu, SvgIcon }
  })
  export default class DmoHeader extends Vue {
    @Getter('title') title
    @Getter('projectUrl') projectUrl

    get titlep1() {
      return this.title.slice(0, this.title.length - 1)
    }

    get titlep2() {
      return this.title.charAt(this.title.length - 1)
    }
  }
</script>

<style lang="scss">
  .dmo-header {
    white-space: nowrap;
    @extend %clear-fix;
    .dmo-title {
      height: 44px;
      box-sizing: border-box;
      min-width: 100px;
      cursor: pointer;
      font-size: 35px;
      a {
        color: black;
        transition: all 0.5s ease;
        padding: 5px 10px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        &:hover {
          background-color: black;
          color: white;
        }
      }
      span {
        font-size: 30%;
        vertical-align: top;
        sup {
          position: relative;
          top: -20px;
        }
      }
    }
    .dmo-menu {
      height: 44px;
      line-height: 44px;
      box-sizing: border-box;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .dmo-badge {
      position: fixed;
      transition: all 0.25s ease;
      cursor: pointer;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      transition: border-color 0.5s ease;
      border-color: transparent white transparent transparent;
      &:hover {
        z-index: 11;
        border-color: transparent black transparent transparent;
        svg {
          fill: white;
        }
      }
      svg {
        position: absolute;
        color: black;
      }
    }
  }

  @include from-liquid-breakpoint($large) {
    .dmo-header {
      padding: 33px 40px;
      .dmo-title {
        margin-right: 30px;
        float: left;
      }
      .dmo-menu {
        margin: auto;
        padding-right: 100px;
      }
      .dmo-badge {
        border-width: 0 120px 120px 0;
        svg {
          width: 50px;
          height: 50px;
          left: 60px;
          top: 10px;
        }
      }
    }
  }

  @include to-liquid-breakpoint($medium) {
    .dmo-header {
      padding: 25px;

      .dmo-title {
        text-align: center;
      }
      .dmo-menu {
        text-align: center;
        white-space: nowrap;
      }
      .dmo-badge {
        border-width: 0 80px 80px 0;
        border-color: transparent black transparent transparent;
        svg {
          width: 30px;
          height: 30px;
          left: 40px;
          top: 10px;
          fill: white;
        }
      }
    }
  }
</style>




