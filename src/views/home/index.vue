<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs class="channel-tabs" v-model="active">
        <!-- 标签页有一个功能 只有第一次查看标签页时才渲染里面的内容 -->
 <van-tab :title="channel.name" v-for="channel in channels" :key='channel.id'> <!--顶部标签列表 -->
     <artcle-list :channel='channel'/></van-tab>
</van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArtcleList from './components/artcle-list'

export default {
  name: 'HomeIndex',
  components: {
    ArtcleList
  },
  data () {
    return {
      active: 0, // 当前选中的标签页
      channels: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadChannels () { // 加载频道
      const { data } = await getUserChannels()
      console.log(data)
      this.channels = data.data.channels
    }
  },
  created () {
    this.loadChannels()
  },
  mounted () { },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;
      .van-button__text {
        font-size: 14px;
      }
      .van-button__icon {
          font-size: 16px;
      }
    }
  }
  .channel-tabs {
      /deep/ .van-tab {
          border-right: 1px solid #edeff3;
          border-bottom: 1px solid #edeff3;
      }
      /deep/ .van-tabs__line {
          width: 15px !important;
          height: 3px;
          background-color: #3296fa;
          bottom: 20px;
      }
  }
}
</style>
