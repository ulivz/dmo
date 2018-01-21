<template>
  <ul class="dmo-menu">
    <li v-for="item in meauList"
        :class="{'active': activeItem === item}"
        :key="item.key"
        @click="select(item)">
      <a href="#">{{ item.text }}</a>
    </li>
  </ul>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'dmo-header',
    data() {
      return {
        activeItem: null
      }
    },
    props: {
      meauList: Array
    },
    created() {
      this.activeItem = this.meauList.find(item => item.active)
    },
    methods: {
      ...mapMutations([
        'selectMode'
      ]),
      select(item) {
        if (item !== this.activeItem) {
          this.activeItem = item
          this.selectMode(item.key)
        }
      }
    }
  }
</script>

<style lang="scss">
  ul.dmo-menu {
    list-style: none;
    font-family: Hind;
    text-transform: uppercase;
    li {
      display: inline-block;
      vertical-align: middle;
      min-width: 100px;
      text-align: center;
      a {
        color: black;
        padding: 0 5px;
        font-size: 16px;
        font-weight: 500;
        -webkit-transition: box-shadow ease .25s;
        -ms-transition: box-shadow ease .25s;
        transition: box-shadow ease .25s;
        letter-spacing: 2px;
      }
      &.active {
        a {
          box-shadow: inset 0 -8px 0px 0px #ffe889;
        }
      }
    }
  }
</style>

