<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isPullDownLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        ></article-item>
        <!-- <van-cell v-for="(article,index) in articles" :key="index" :title="article.title" > -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/articlen-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      loading: false, // 控制加载中loading 状态
      finished: false, // 当所有数据加载完毕 关闭loading
      timestamp: null, // 时间戳
      isPullDownLoading: false,
      refreshSuccessText: '' // 下拉刷新成功后提示文字内容
    }
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // 时间戳,请求最新数据用当前时间戳,下一页书使用上一次返回的时间戳
        with_top: 1 // 是否包含置顶 1包含 0不包含
      })
      //   console.log(data)

      this.articles.push(...data.data.results) // ...是把数组里面一个个元素提取出来 扩展运算符

      // 加载状态结束 当页面不满时 会自动加载loading为true ,我们加载完后要把loading关闭
      this.loading = false

      if (data.data.results.length) {
        this.timestamp = data.data.pre_timestamp // 更新时间戳
      } else {
        this.finished = true // 数据全部加载完成 loading和加载停止
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      //   console.log(data)

      this.articles.unshift(...data.data.results) // ...是把数组里面一个个元素提取出来 并且往顶部追加
      this.isPullDownLoading = false // 关闭刷新加载状态

      this.refreshSuccessText = `成功更新了${data.data.results.length}条数据`
    }

  },
  created () { },
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
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
