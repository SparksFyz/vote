<template>
  <div class="rank">
    <div class="rank-list-info">用户排名数据每10分钟定时更新一次</div>
    <b-table striped hover :fields="fields" :items="datum">
      <template slot="index" slot-scope="data">
        {{data.index + 1}}
      </template>
      <template slot="projectName" slot-scope="data">
        {{data.item.projectName}}
      </template>
      <template slot="vote" slot-scope="data">
         <mt-button size="small" type="danger" v-on:click="vote(data.item)">投票</mt-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import bTable from 'bootstrap-vue/es/components/table/table'
import VoteResult from '@/components/VoteResult.vue'
import {
  getProjects,
  getSignature,
  VoteForProject
} from '@/http'
import wx from 'weixin-js-sdk'

export default {
  name: 'Rank',
  components: {
    bTable
  },
  data () {
    return {
      fields: [
        {
          key: 'index',
          label: '排名'
        },
        {
          key: 'projectName',
          label: '参与者'
        },
        {
          key: 'voteCount',
          label: '票数'
        },
        {
          key: 'vote',
          label: '操作'
        },
      ],
      datum: [

      ]
    }
  },
  methods: {
    fetchProjects() {
      getProjects().then(res => {
        this.datum = res.data.data
      })
    },

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
          imgUrl: protocol + '//' + host + '/img/resources/share.png',
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
          imgUrl: protocol + '//' + host + '/img/resources/share.png',
          success: function () {
          },
        })
      })
    },
    showResult(val) {
        this.$modal.show(VoteResult, {
          text: val.message,
          pngUrl: val.qrUrl,
        },{
          width: '90%',
        },)
      },
      vote: function (item) {
        const that = this
        const storage = window.localStorage
        const openid = storage.getItem("vote-openid")
        const data = {projectId:item.projectId,openId:openid}
        VoteForProject(data).then(res => {
          if(res.data.status == 0){
            item.message = "投票成功"
            that.showResult(item)
          }else if(res.data.status == 4049){
            item.message = "今天已经投过票啦！"
            that.showResult(item)
          }else{
            item.message = "投票失败，请检查网络状况！"
            that.showResult(item)
          }
          
        })
      },
  },
  mounted() {
    getSignature(location.href.split('#')[0]).then(res => {
      if (res.data && res.data.success) {
        this.initWx(res.data.data)
      }
    })
    this.fetchProjects()
  },
}
</script>

<style lang="sass">
  .rank
    display: flex
    flex-wrap: wrap
    padding: 20px 10px 0
    &-list-info
      width: 100%
      color: #b5b5b5
      text-align: right
      padding: 6px 0
    .table th, .table td
      padding: 0.6em
      .mint-button
        height: 25px
        width: 80px
        font-size: 12px
</style>
