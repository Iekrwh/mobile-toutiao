import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  // config 是当前请求相关配置信息对象

  function (config) {
    // console.log('请求成功,被拦截了')
    // console.log(config)

    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有登陆以后信息,则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // config 是可以修改  当return后请求才会真正的发送出去,如果删除了return则无法完成接口请求
    return config
  },
  // 请求失败会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
