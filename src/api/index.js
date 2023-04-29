import request from './request'

export const userLogin = (data) => request('/user/login', data)

export const userAdd = (data) => request('/user/add', data)
