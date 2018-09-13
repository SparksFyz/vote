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
         <mt-button size="small" type="danger">投票</mt-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import bTable from 'bootstrap-vue/es/components/table/table'
import {
  getProjects,
  getSignature
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
        console.log(this.datum)
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
          link: link,
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
          link: link,
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
