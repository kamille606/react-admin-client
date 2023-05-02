import axios from 'axios'
import {notification} from 'antd'
import {BASE_URL} from '../config/baseConfig'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response
}, error => {
  // 对响应错误做点什么
  notification.error({
    message: '网络错误',
    description: '网络请求失败',
  })
  return Promise.reject(error)
})

const request = async (url, data = {}, type = 'POST') => {
  if (type === 'GET') {
    return (await instance.get(url, {
      params: data,
    })).data
  } else {
    return (await instance.post(url, data)).data
  }
}

export default request
