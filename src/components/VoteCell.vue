<template>
  <div class="vote-cell" @click="toDetail">
    <div class="vote-cell-order">
      <div class="order">{{brand.projectId}}号</div>
      <div class="trangle-left"></div>
    </div>
    <div class="vote-cell-info">
      <div class="photo">
        <img :src="'http://huwaicanju.com/' + brand.pngUrl" :alt="brand.projectName"></div>
      <div class="title">{{brand.projectName}}</div>
      <div class="vote-num"><span>{{brand.voteCount}}</span>票</div>
      <mt-button size="small" type="danger"  v-on:click.stop="vote(brand.projectId)">投票</mt-button>
    </div>
  </div>
</template>

<script>
import {
  getProjects,VoteForProject
} from '@/http'
export default {
  name: 'VoteCell',
  props: {
    brand: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {
    vote: function (projectId) {
      const storage = window.localStorage
      const openid = storage.getItem("vote-openid")
      const data = {projectId:projectId,openId:openid}
      VoteForProject(data).then(res => {

        if(res.data.status == 0){
          this.brand.message = "投票成功"
        
        }else if(res.data.status == 4049){
          this.brand.message = "今天已经投过票啦！"
        }else{
          this.brand.message = "投票失败，请检查网络状况！"
        }
        
        this.$emit('msgFunc',this.brand);
      })
    },
    toDetail() {
      this.$router.push({
        name: 'brand',
        params: {
          brand: this.brand
        }
      })
    }
  },
}
</script>
<style lang="sass" scoped>
  .vote-cell
    border-radius: 6px
    background-color: #fff
    padding: 8px 0;
    &-order
      display: flex
      .order
        width: 60px
        line-height: 20px
        background-color: #e4cc8c
        color: #735b1f
      .trangle-left
        width: 0
        height: 0
        margin-left: -20px
        border-width: 10px
        border-style: solid
        border-color: transparent white transparent transparent

    &-info
      display: flex
      flex-direction: column
      align-items: center
      padding: 5px 12px
      .photo
        height: 3rem
        img
          width: 100%
          height: 100%
      .title
        margin: 8px 0 4px
      .vote-num
        margin: 4px 0 8px
        > span
          color: red
      .mint-button
        width: 2rem
        height: 24px
        font-size: 12px

</style>
