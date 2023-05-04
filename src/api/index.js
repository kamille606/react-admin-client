import request from './request'

export const reqWeatherInfo = () => request('/data/weather')

export const reqUserLogin = async (data) => request('/user/login', data)
export const userAdd = async (data) => request('/user/add', data)

export const reqCategoryPage = (parentId) => request('/product/category/page', {parentId})
export const reqCategoryList = (parentId) => request('/product/category/list', {parentId})
export const reqCategoryAdd = (parentId, categoryName) => request('/product/category/add', {parentId, categoryName})
export const reqCategoryUpdate = (categoryId, categoryName) => request('/product/category/update', {categoryId, categoryName})