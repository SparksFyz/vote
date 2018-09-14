<template>
  <div>
    <div class="detail-header">
       <img src="../assets/anfa.jpg" alt="">
       <mt-button size="small" type="danger">投票</mt-button>
    </div>
    <div class="detail-info">
       <div class="detail-item"><span class="name">编号</span><span class="value">{{brand.projectId}}</span></div>
       <div class="detail-item"><span class="name">姓名</span><span class="value" style="color:green">{{brand.projectName}}</span></div>
       <div class="detail-item"><span class="name">人气</span><span class="value">{{brand.heatValue}}</span></div>
       <div class="detail-item"><span class="name">票数</span><span class="value" style="color:red">{{brand.voteCount}}</span></div>
    </div>
    <div class="detail-footer">
       <img src="../assets/anfa.jpg" alt="">
    </div>
   
  </div>
  
</template>

<script>
  import wx from 'weixin-js-sdk'
  import {
    getSignature,
    getProjectById
  } from '@/http'

  export default {
    name: 'Brand',
    data() {
      return {
        brand:[]
      }
    },
    methods: {
      initWx(config) {
        const title = `支持${this.brand.projectName}，转发投票！2018最具影响力直销品牌评选`
        const brandId = this.brand.projectId

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
          const protocol = window.location.protocol
          const host = window.location.host

          wx.onMenuShareAppMessage({
            title: title,
            desc: '活动火爆进行中， 家人们赶紧投上宝贵的一票！',
            link: `http://huwaicanju.com/We1chat/brand?router=brand&brandId=${brandId}`,
            imgUrl: protocol + '//' + host + '/Wechat/resources/share.png',
            success: function () {
              // window.alert('分享成功')
            },
            fail: function (res) {
              // alert(JSON.stringify(res))
            }
          })

          wx.onMenuShareTimeline({
            title: title,
            link: `http://huwaicanju.com/We1chat/brand?router=brand&brandId=${brandId}`,
            imgUrl: protocol + '//' + host + '/Wechat/resources/share.png',
            success: function () {
            },
          })
        })
      }
    },
    mounted() {
      this.brand = this.$route.params.brand || {}

      getSignature(location.href.split('#')[0]).then(res => {
        if (res.data && res.data.success) {
          if (!this.$route.params.brand && this.$route.params.brandId) {
            getProjectById(this.$route.params.brandId).then(result => {
              this.brand = result.data.data
              this.initWx(res.data.data)
            })
          } else {
            this.initWx(res.data.data)
          }
        }
      })
    },
  }
</script>

<style lang="sass" scoped>
  .detail-header
    .mint-button
      width: 80%
  .detail-info
    margin-top: 40px
    text-align: left
    margin-left: 30px
    .detail-item
      margin: 15px 0
      font-size: 16px
      .name
        color: grey
        margin-right: 10px
  .detail-footer
    margin-bottom: 100px 
</style>

