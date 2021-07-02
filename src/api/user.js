import request from '@/utils/request'

// 登陆请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送短信
export const sendcode = code => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${code}`
  })
}
