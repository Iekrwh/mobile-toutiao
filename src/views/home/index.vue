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
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!--顶部标签列表 -->
        <artcle-list :channel="channel"
      /></van-tab>
      <div slot="nav-right" class="wap-nav-pleceholder"></div>
      <div
        slot="nav-right"
        class="wap-nav-warp"
        @click="isChannleEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannleEditShow"
      position="bottom"
      close-icon-position="top-left"
      class="channel-edit-popup"
      get-container="body"
      closeable
      ><channel-edit
        @close="isChannleEditShow = false"
        :active="active"
        @updateChannel="active = $event"
        :user-channels="channels"
    /></van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArtcleList from './components/artcle-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/strorge'

export default {
  name: 'HomeIndex',
  components: {
    ArtcleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 当前选中的标签页
      channels: [], // 顶部标签列表
      isChannleEditShow: true // 弹出层状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async loadChannels () { // 加载频道
    //   const { data } = await getUserChannels()
    //   console.log(data)
      //   this.channels = data.data.channels
      let channels = []
      if (this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        console.log('没有登陆')
        const localChannels = getItem('user-channels')
        console.log(localChannels)
        if (localChannels) {
          channels = localChannels
        //   console.log(channels)
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        //   console.log('空')
        }
      }

      this.channels = channels
    }
    // onUpdataActive (index) { // 更改当前判断    // 改为 @updateChannel = 'active = $event'   $event为子件那边传过来的参数 恒定名称
    //   this.active = index
    // }
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
  .wap-nav-warp {
    position: fixed;
    right: 0;
    height: 43px;
    line-height: 44px;
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    .van-icon {
      font-size: 24px;
    }
    &::before {
      content: "";
      width: 1px;
      height: 43px;
      background: url("line.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .wap-nav-pleceholder {
    width: 24px;
    flex-shrink: 0;
  }
}

.channel-edit-popup {
  height: 100%;
}
</style>
