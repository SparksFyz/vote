<template>
  <div id="app">
    <div v-show="showBanner">
      <div class="img-box">
        <img src="./assets/share.png">
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
import {
  getProjects,
  getCode,
  getProfile
} from '@/http'
import { longStackSupport } from 'q';

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
        name: page,
        query: {},
        params: {},
      })
    }
  },

  mounted () {
    // const useragent = navigator.userAgent
    // if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    //     alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！')
    //     // 以下代码是用javascript强行关闭当前页面
    //     const opened = window.open('about:blank', '_self')
    //     opened.opener = null
    //     opened.close()
    // }

    const storage = window.localStorage
    let code = ''
    let router = ''
    let state = ''
    let brandId = ''
    let brandIdInParams = ''

    if (window.location.search) {
      const queries = window.location.search.slice(1).split('&')

      queries.forEach(q => {
        if (q.split('=')[0] === 'code') {
          code = q.split('=')[1]
        } else if (q.split('=')[0] === 'router') {
          router = q.split('=')[1]
        } else if (q.split('=')[0] === 'state') {
          const tempState = q.split('=')[1]

          if (tempState.split('%5E%5E').length > 1) {
            state = tempState.split('%5E%5E')[0]
            brandIdInParams = tempState.split('%5E%5E')[1]
          } else {
            state = tempState
          }
        } else if (q.split('=')[0] === 'brandId') {
          brandId = q.split('=')[1]
        }
      })
    }
  
    const openid = storage.getItem("vote-openid")
    const authUrl = getCode(router, brandId)

    if (!openid && !code) {
      // 前端没有openId和code, 跳转至授权页面，
      // 点击确认授权之后会跳转回来， 上面的代码再执行一遍, code在url上，不会再进这个if
      window.location.href = authUrl
    } else {
      if (code) {
        // 在http.js里面写个post方法 把code传给后端，后端返回用户信息和openId
        // 拿到openid之后缓存在前端 storage.setItem('vote-openid', res.openId)
        // window.alert(`发送code给后端 ${code}`)

        if (state) {
          this.$router.push({
            name: state,
            params: {
              brandId: brandIdInParams
            }
          })
        }
      } else {
        getProfile(openid).then(res => {
          console.log(res)
          // window.alert(JSON.stringify(res))

          // 这里需要判断成功还是失败， 失败就是过期，需要清除前端openid缓存,然后reload页面，自动去走授权了
        })
        if (router) {
          this.$router.push({
            name: router,
            params: {
              brandId: brandId
            }
          })
        }
      }
    }
    
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
