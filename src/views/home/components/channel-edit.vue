<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        :type="isEdit ? 'info' : 'danger'"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        v-for="(channel, index) in userChannels"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel,index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/strorge'

export default {
  name: 'ChannelEdit',
  components: {},
  data () {
    return {
      allChannels: [],
      isEdit: false // 控制编辑的显示状态
    }
  },
  computed: { // 计算属性会观测内部数据变化而变化而重新求值
    // 推荐频道列表
    recommendChannels () {
      // filter 方法: 过滤数据,根据方法返回的布尔值 true来收集数据
      return this.allChannels.filter(channels => {
        // 频道当前的元素 是否 属于用户已选的频道
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channels.id
        })
      })
    },
    ...mapState(['user'])
  },
  watch: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async loadAllChannel () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd (channel) {
      this.userChannels.push(channel)

      // 数据持久化
      if (this.user) { // 判断是否有token
        await addUserChannels({
          channels: [{ id: channel.id, seq: this.userChannels.length }]
        })
      } else {
        // 没有token 存储在本地
        setItem('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      // 编辑状态删除 非编辑状态 切换频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) { // 删除频道
      if (index <= this.active) {
        this.$emit('updateChannel', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      if (this.user) {
        await deleteUserChannels(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) { // 切换频道
      this.$emit('updateChannel', index) // 更新首页当前的频道

      this.$emit('close') // 关闭弹出层
    }
  },
  created () {
    this.loadAllChannel()
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
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333333;
  }

  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f3f4f5;
      .van-grid-item__text {
        font-size: 14;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
