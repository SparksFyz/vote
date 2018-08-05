<template>
  <div id="app">
    <div v-show="showBanner">
      <div class="img-box">
        <img src="./assets/title.jpg">
      </div>
      <div class="info-box">
        <div>
          <span class="num">62个</span>
          <span class="action">参与数</span>
        </div>
        <div>
          <span class="num">2673251次</span>
          <span class="action">总投票数</span>
        </div>
        <div>
          <span class="num">3343600次</span>
          <span class="action">总访问量</span>
        </div>
      </div>
      <div class="search-bar">
        <mt-search
          :value.sync="keyword"
          cancel-text="取消"
          placeholder="请输入参与名称、编号">
        </mt-search>
      </div>
    </div>
    <router-view/>

    <mt-tabbar :selected.sync="selected" :fixed=true>
      <mt-tab-item id="home">
        <div class="nav-item" @click="jump('home')">
          <i class="fa fa-home" aria-hidden="true"></i>
          <span>网站首页</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="rank">
        <div class="nav-item" @click="jump('rank')">
          <i class="fa fa-bar-chart" aria-hidden="true"></i>
          <span>当前排名</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="rule">
        <div class="nav-item" @click="jump('rule')">
          <i class="fa fa-list" aria-hidden="true"></i>
          <span>活动规则</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="user">
        <div class="nav-item" @click="jump('user')">
          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          <span>个人中心</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'home',
      keyword: ''
    }
  },
  computed: {
    showBanner () {
      return this.$route.path !== '/user'
    }
  },
  methods: {
    jump (page) {
      this.$router.push({
        name: page
      })
    }
  },

  mounted () {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto
}
</style>

<style lang="sass">
  .img-box img
    width: 100%
  .info-box
    display: flex
    align-item: center
    margin-top: -3px
    height: 1.3rem
    background-color: #303143
    > div
      flex: 1
      margin: 10px 0
      border-right: 1px solid #434459
      &:last-child
        border: none

    span
      display: block
      margin-top: 3px
      font-size: 12px
    .num
      color: #fefb58
    .action
      color: #d3d2e0
  .search-bar
    height: 1.2rem
    .mint-searchbar
      background-color: #dfb76f
  .mint-tabbar
    height: 1.4rem

    .mint-tab-item
      padding: 10px 0px

      &-label
        height: 100%

    .nav-item
      display: flex
      flex-direction: column
      align-items: center
      height: 100%

      .fa
        font-size: 18px

      span
        margin-top: 6px
        font-size: 14px

</style>
