<template>
  <van-cell class="article-item">
    <div slot="title" class="titile van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-warp" v-if="article.cover.type === 3">
        <div
          class="cover-warp-item"
          v-for="(img,index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item" fit="cover" :src='img' />
        </div>
      </div>
      <div class="labe-warp">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- <div slot='default'>123</div> -->
    <van-image
      v-if="article.cover.type === 1"
      class="right-cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>

export default {
  name: 'ArticleItem',
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  props: { // 子传父 父是home的index
    article: {
      type: Object,
      require: true
    }
  },
  methods: {},
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
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-warp {
    padding: 15px 0;
    display: flex;
    flex-wrap: nowrap;
    .cover-warp-item {
      flex: 1;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .labe-warp {
      font-size: 11px;
      color: #b4b4b4;
      span {
          margin-right: 12px;
      }
  }
}
</style>
