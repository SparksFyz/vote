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
export default {
  name: 'User',
  data () {
    return {}
  }
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
