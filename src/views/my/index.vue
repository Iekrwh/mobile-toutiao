<template>
  <div class="my-container">
    <van-cell-group  v-if="user" class="my-info">
      <van-cell
        center
        class="base-info"
        :border="false"
      >
        <van-image
          class="avatar"
          fit="cover"
          round
          slot="icon"
          :src="correntUser.photo"
        />
        <div class="name" slot="title">{{correntUser.name}}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>

      <van-grid :border="false" class="data-info">
        <van-grid-item
          ><div class="text-warp" slot="text">
            <div class="count">{{correntUser.art_count}}</div>
            <div class="text">头条</div>
          </div></van-grid-item
        >
        <van-grid-item
          ><div class="text-warp" slot="text">
            <div class="count">{{correntUser.follow_count}}</div>
            <div class="text">关注</div>
          </div></van-grid-item
        >
        <van-grid-item
          ><div class="text-warp" slot="text">
            <div class="count">{{correntUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div></van-grid-item
        >
        <van-grid-item
          ><div class="text-warp" slot="text">
            <div class="count">{{correntUser.like_count}}</div>
            <div class="text">获赞</div>
          </div></van-grid-item
        >
      </van-grid>
    </van-cell-group>
      <div v-else class="not-login">
      <div><img src="./mobile.png" class="moblie" @click="$router.push('/login')" /></div>
      <div class="text" @click="$router.push('/login')">登陆 / 注册</div>
    </div>

    <van-grid class="nav-grid mgb-4" :column-num="2" :border="false">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell class="nav-text" title="消息通知" to="" is-link />
    <van-cell class="nav-text mgb-4" title="小智同学" to="" is-link />
    <van-cell v-if="user" class="login-out" title="退出登陆" @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  data () {
    return {
      correntUser: {} // 当前用户信息
    }
  },
  computed: {
    ...mapState(['user']) // 映射 state的数据到此组件中  注意不能与映射store中的数据同名
  },
  watch: {},
  methods: {
    async loadCurrentUse () {
      const { data } = await getCurrentUser()
      console.log(data)
      this.correntUser = data.data
    },
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗',
        message: '确认退出吗'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null) // 清空容器的user数据  调用vuex的mutations 中方法
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  created () {
    this.loadCurrentUse() // 生命周期中挂钩 获取token  建议调用方法 不要把逻辑写在里面
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
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
  }
  .base-info {
    box-sizing: border-box;
    height: 115px;
    background-color: unset;
    padding-top: 38px;
    padding-bottom: 11px;
    .avatar {
      box-sizing: border-box;
      height: 66px;
      width: 66px;
      border: 1px solid #fff;
      margin-right: 11px;
    }
    .name {
      color: #fff;
      font-size: 15px;
    }
    .update-btn {
      height: 16px;
      font-size: 10px;
      color: #666;
    }
  }
  /deep/ .van-grid-item__content {
    background-color: unset;
  }
  .data-info {
    .van-grid-item {
      height: 65px;
      color: #fff;
      .text-warp {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }
  }
  /deep/ .nav-grid {
    background-color: #fff;
    .nav-grid-item {
      height: 70px;

      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .login-out {
    text-align: center;
    color: #d86262;
  }
  .nav-text {
    font-size: 15px;
  }

  .mgb-4 {
    margin-bottom: 4px;
  }

  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .moblie {
      height: 66px;
      width: 66px;
    }
    .text {
        color: #fff;
        font-size: 14px;
    }
  }
}
</style>
