<template>
  <div>
    <div class="detail-header">
       <img :src="'http://huwaicanju.com/' + brand.pngUrl" :alt="brand.projectName">
       <mt-button size="small" type="danger" v-on:click="vote(brand.projectId)">投票</mt-button>
    </div>
    <div class="detail-info">
       <div class="detail-item"><span class="name">编号</span><span class="value">{{brand.projectId}}</span></div>
       <div class="detail-item"><span class="name">姓名</span><span class="value" style="color:green">{{brand.projectName}}</span></div>
       <div class="detail-item"><span class="name">人气</span><span class="value">{{brand.heatValue}}</span></div>
       <div class="detail-item"><span class="name">票数</span><span class="value" style="color:red">{{brand.voteCount}}</span></div>
    </div>
    <div class="detail-footer">
       <img :src="'http://huwaicanju.com/' + brand.qrUrl" :alt="brand.projectName">
    </div>
   
  </div>
  
</template>

<script>
  import wx from 'weixin-js-sdk'
  import VoteResult from '@/components/VoteResult.vue'
  import {
    getSignature,
    getProjectById,
    VoteForProject
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
            imgUrl: protocol + '//' + host + '/img/resources/share.png',
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
            imgUrl: protocol + '//' + host + '/img/resources/share.png',
            success: function () {
            },
          })
        })
      },
      showResult(val) {
        console.log(val)
        this.$modal.show(VoteResult, {
          text: val.message,
          pngUrl: val.qrUrl,
        },{
          width: '90%',
        },)
      },
      vote: function (projectId) {
        const that = this
        const storage = window.localStorage
        const openid = storage.getItem("vote-openid")
        const data = {projectId:projectId,openId:openid}
        VoteForProject(data).then(res => {

          if(res.data.status == 0){
            this.brand.message = "投票成功"
            that.showResult(this.brand)
            
          
          }else if(res.data.status == 4049){
            this.brand.message = "今天已经投过票啦！"
            that.showResult(this.brand)
          }else{
            this.brand.message = "投票失败，请检查网络状况！"
            that.showResult(this.brand)
          }
          
        })
      },
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

