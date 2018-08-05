<template>
  <div class="rank">
    <div class="rank-list-info">用户排名数据每10分钟定时更新一次</div>
    <b-table striped hover :fields="fields" :items="datum"></b-table>
    <!-- <table>
      <thead>
        <tr>
          <td>排名</td>
          <td>参与者</td>
          <td>票数</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in datum" :key="data.name">
          <td>{{data.rank}}</td>
          <td>{{data.name}}</td>
          <td>{{data.vote}}</td>
          <td>投票</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import bTable from 'bootstrap-vue/es/components/table/table'

export default {
  name: 'Rank',
  components: {
    bTable
  },
  data () {
    return {
      fields: [
        {
          key: 'rank',
          lable: '排名'
        },
        {
          key: 'image',
          lable: '参与着'
        },
        {
          key: 'name',
          lable: '票数'
        },
        {
          key: 'vote',
          lable: '操作'
        },
      ],
      datum: [
        {
          rank: 1,
          image: '',
          name: '',
          vote: 1234
        }
      ]
    }
  }
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
</style>
