<template>
  <div class="vote-result" >
    <p>{{ text }}</p>
    <img :src="'http://huwaicanju.com/' + pngUrl" alt="">
  </div>
</template>

<script>
export default {
  props: ['text','pngUrl']
}
</script>
<style lang="sass">
  .vote-result
    width: 90%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    transition: width 2s, height 2s, transform 2s

    img
        width: 75%
        border: 1px solid black
</style>