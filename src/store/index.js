import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/strorge'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user') // user的 用户信息 data
  },
  mutations: {
    setUser (state, data) { // 修改容器中的state使用mutations定义方法
      state.user = data

      // 为了防止页面刷新丢失data 我们还需要把数据存储在本地
      //   window.localStorage.setItem('user', JSON.stringify(data)) // 存储token
      setItem('user', data) // 封装才模块使用 存储token在本地
    }
  },
  actions: {
  },
  modules: {
  }
})
