<template>
  <div class="home">
    <vote-cell v-for="brand in brands" :key="brand.name" :brand="brand">
    </vote-cell>
    <div class="comment-box">
      <div class="title">添加评论</div>
      <mt-field  placeholder="请输入你想说的话" type="textarea" rows="4" v-model="introduction"></mt-field>
      <div class="submit"><mt-button type="danger">提交评论</mt-button></div>
    </div>
    <div class="comment-list">
      <div class="title">评论列表</div>
      <div class="notice">数据每十分钟定时更新一次</div>
    </div>
    <modal name="modal" width="90%">
      <img src="../assets/code.jpg" alt="">
    </modal>
  </div>
</template>

<script>

// @ is an alias to /src
import VoteCell from '@/components/VoteCell.vue'
import {
  getProjects,URL
} from '@/http'

export default {
  name: 'home',
  components: {
    VoteCell
  },
  data () {
    return {
      brands: [
      ],
      introduction: '',
    }
  },
  methods: {
    fetchProjects() {
      getProjects().then(res => {
        console.log(res)
        this.brands = res.data.data
      })
    },
    showModal() {
      this.$modal.show('modal')
    }
  },
  mounted() {
    this.showModal()
    this.fetchProjects()
  },
}
</script>
<style lang="sass" scoped>
  .home
    display: flex
    flex-wrap: wrap
    padding: 20px 10px 0
    background-color: #fbe7b5

  .vote-cell
    width: 48.5%
    margin-right: 3%
    margin-bottom: 10px

    &:nth-child(2n)
      margin-right: 0
  .comment-box
    padding: 0px
    margin-top: 20px
    margin-bottom: 10px
    width: 100%
    background-color: #fff
    .title
      font-size: 12px
      font-weight: bold
      text-align: left
      padding: 10px 10px
    .submit
      background-color: #fbe7b5
      padding-top: 10px
      .mint-button
        width: 100%
        height: 28px
  .comment-list
    padding: 0px
    margin-top: 20px
    margin-bottom: 80px
    width: 100%
    background-color: #fff
    .title
      font-size: 12px
      font-weight: bold
      text-align: left
      border-bottom: 1px solid #ccc
      padding: 10px 10px
    .notice
      text-align: right
      width: 95%
      margin: 10px 0px
      color: #ccc
</style>

<style lang="sass">
  .v--modal-box
    display: flex
    align-items: center
    justify-content: center
    transition: width 2s, height 2s, transform 2s

  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
    opacity: 0
</style>

