<template>
  <div class="login-container">
    <!-- $router.back()退后进来时的页面 -->
    <van-nav-bar
      title="登陆"
      left-arrow
      class="app-nav-bar"
      @click-left="$router.back()"
    />

<!-- 不用给按钮绑定点击事件  点表单验证通过才会调用表单绑定的触发事件 -->
<van-form  ref="fromLogin" :show-error='false' :show-error-message='false' validate-first  @submit="onLogin" @failed='onFailed'>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        center
        left-icon="shouji"
        placeholder="请输入手机号"
         :rules="rules.mobile"
         name='mobile'
      />
      <van-field
        v-model="user.code"
        clearable
        center
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="rules.code"

      >
        <template #button>
            <!--  @click.prevent   .prevent阻止默认的事件   -->
          <van-button class="send-btn" size="mini" round v-if="isCountDownShow" @click.prevent="onSendCode" native-type="button"  :loading='isCodeLoading'>获取验证码</van-button>
          <van-count-down v-else :time="1000 *60" format="ss s" @finish='isCountDownShow =true'/>
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button type="info" class="login-btn" block
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendcode } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      rules: {
        mobile: [{ required: true, message: '请填写手机号', trigger: 'onBlur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'onSubmit' }],
        code: [{ required: true, message: '请填写验证码' }, { pattern: /\d{6}/, message: '请输入6位数验证码', trigger: 'onSubmit' }]
      },
      isCountDownShow: true, // 验证码倒计时的显示
      isCodeLoading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁止背景后面的按钮点击,默认为false
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失 默认2000
      })
      try {
        const { data } = await login(this.user)
        // console.log(res)
        Toast.success('登陆成功') // 后面的toast轻提示会覆盖掉前的toast
        // window.localStorage.setItem('user', JSON.stringify(res.data.data)) // 存储token

        this.$store.commit('setUser', data.data) // 将登陆成功的token 存储到vuex容器的store中
        this.$router.push('/my') // 跳转页面
      } catch (err) {
        // console.log('登陆失败', err)
        Toast.fail('登陆失败,手机或者验证码错误')
      }
    },
    onFailed (error) { // 当表单验证不通过时
    //   console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: top
        })
      }
    },
    async onSendCode () { // 获取验证码
      this.isCodeLoading = true
      try {
        await this.$refs.fromLogin.validate('mobile') // 给表单绑定ref 并且给要验证的field添加nanme 单独验证 mobile
        await sendcode(this.user.mobile) // 发生短信
        this.isCountDownShow = false // 获取成功 显示倒计时  在countdown加上@finish 监听countdown结束 改变布尔值
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发生太频繁了,请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '获取失败,请稍后重试'
        }
        this.$toast({
          message: message,
          position: top
        })
      }
      this.isCodeLoading = false
    }

  },
  created () { },
  mounted () {

  },
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

.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-warp {
    padding: 16px 26px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
