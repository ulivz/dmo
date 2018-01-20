<template>
  <header class="dmo-header">
    <div class="dmo-title">
      <a href="#">{{ titlep1 }}<b>{{ titlep2 }}</b><span><sup>&copy;</sup></span></a>
    </div>

  </header>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'dmo-header',
    computed: {
      ...mapState([
        'title'
      ]),
      titlep1 () {
        return this.title.slice(0, this.title.length - 1)
      },
      titlep2 () {
        return this.title.charAt(this.title.length - 1)
      }
    }
  }
</script>

<style lang="scss">
  .dmo-header {
    display: flex;
    font-size: 35px;
    padding-top: 33px;
    padding-bottom: 33px;
    padding-left: 40px;
    padding-right: 40px;
    .dmo-title {
      flex: 1;
      cursor: pointer;
      a {
        color: black;
        transition: all 0.5s ease;
        padding: 5px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        &:hover {
          background-color: black;
          color: white;
        }
      }
      span {
        font-size: 50%;
        vertical-align: top;
        sup {
          position: relative;
          top: -20px;
        }
      }
    }
  }
</style>


