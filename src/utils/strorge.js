// 本地存储模块
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data) // 尝试把data转为 JavaScript 对象
  } catch (err) {
    return data
  }
}
export const setItem = (key, value) => {
  if (typeof (value) === 'object') { // 如果value为对象 则转为字符串再存储
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
