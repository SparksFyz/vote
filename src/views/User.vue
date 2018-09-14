<template>
  <div class="user">
    <div class="user-header"></div>
    <div class="user-name">User_Test</div>
    <div class="img-box code"><img src="../assets/code.jpg" alt=""></div>
    <p>长按识别二维码</p>
    <p>获得更多资讯</p>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {
  getSignature
} from '@/http'

export default {
  name: 'User',
  data () {
    return {}
  },
  methods: {
    initWx(config) {
      wx.config({
          debug: false,
          appId: 'wx59e7e11099c2c50f',
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          signature: config.signature,
          jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
      })

      wx.ready(function(){
        const link = window.location.href
        const protocol = window.location.protocol;
        const host = window.location.host;

        wx.onMenuShareAppMessage({
          title: '2018最具影响力直销品牌评选',
          desc: '活动火爆进行中， 家人们赶紧投上宝贵的一票！',
          link: 'http://huwaicanju.com',
          imgUrl: protocol + '//' + host + '/Wechat/resources/share.png',
          success: function () {
            // window.alert('分享成功')
          },
          fail: function (res) {
            alert(JSON.stringify(res))
          }
        })

        wx.onMenuShareTimeline({
          title: '2018最具影响力直销品牌评选',
          link: 'http://huwaicanju.com',
          imgUrl: protocol + '//' + host + '/Wechat/resources/share.png',
          success: function () {
          },
        })
      })
    }
  },
  mounted() {
    getSignature(location.href.split('#')[0]).then(res => {
      if (res.data && res.data.success) {
        this.initWx(res.data.data)
      }
    })
  },
}
</script>

<style lang="sass" scoped>
  .user
    background-color: #49484e
    height: 100%
    padding-top: 40px
    height: 600px
    .user-header
      margin: 0 auto
      width: 100px
      height: 100px
      background-image:url('../assets/head.jpg')
      background-size: cover
      border-radius: 50%
      -moz-border-radius: 50%
      -webkit-border-radius: 50%
    .user-name
      color: #fff
      font-weight: bold
      margin-top: 10px
    .img-box
      width: 100%
      margin: 0 auto
      margin-top: 40px
      margin-bottom: 60px
      img
        width: 180px
    p
      color: #ccc
      font-size: 16px
      margin-bottom: 5px
</style>
