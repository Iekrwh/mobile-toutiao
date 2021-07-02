import axios from 'axios'
import store from '@/store/' // 导入store组件 获取token

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
