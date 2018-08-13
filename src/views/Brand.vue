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
  export default {
    name: 'Brand',
    data() {
      return {
        brand:[]
      }
    },
    mounted() {
      this.brand = this.$route.params.brand || []
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

