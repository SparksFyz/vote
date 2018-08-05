<template>
  <div class="rule">
      <div class="img-box"><img src="../assets/rule.png" alt=""></div>
      <div class="rule-detail">
        <p>活动时间：2018-08-01~2018-12-31</p>
        <p>本次活动主办方：【中直企评选组】</p>
        <p>快来为你喜欢的品牌投上一票吧！</p>
        <p>每个微信号每天只能投一票，每天凌晨00：00更新</p>
        <p>我们鼓励邀请伙伴一起为品牌投票助力</p>
        <p>但如有利用第三方软件等违规刷票行为</p>
        <p>将自动删除违规投票数！</p>
        <p>请大家遵守投票规则</p>
        <p>一起维护此次规模宏大的投票活动的公平和公正！</p>
      </div>
      <div class="img-box code"><img src="../assets/code.jpg" alt=""></div>

  </div>
</template>

<script>
export default {
  name: 'Rule',
  data () {
    return {}
  }
}
</script>

<style lang="sass">
  .rule
    display: flex
    flex-wrap: wrap
    padding: 20px 10px 0

    .img-box
      width: 100%
      margin: 0 auto
      margin-top: -15px
      img
        width: 180px
    .rule-detail
      margin: 0 auto
      margin-bottom: 40px
      p
        text-align: center
        font-size: 14px
        line-height: 25px
    .code
      margin-bottom: 100px
</style>
