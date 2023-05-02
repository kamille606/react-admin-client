import request from './request'

export const userLogin = async (data) => request('/user/login', data)

export const userAdd = async (data) => request('/user/add', data)

export const getWeather = () => request('/data/weather')
