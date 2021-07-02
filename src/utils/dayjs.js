
import dayjs from 'dayjs'

// 引入中文语言包
import 'dayjs/locale/zh-cn'

// 引入相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 配置处理相对时间
dayjs.extend(relativeTime)

// 把处理相对时间包装为全局管理器 然后就可以在任何组件中使用

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
