import request from './request'

export const reqWeatherInfo = () => request('/manage/weather')

export const reqUserLogin = async (data) => request('/user/login', data)

export const reqProductPage = (data) => request('/product/page', {
  current: data.current, pageSize: data.pageSize, [data.searchType]: data.searchKeyword
})
export const reqProductOnSell = (productId) => request('/product/on-sell', {productId})
export const reqProductOffShelf = (productId) => request('/product/off-shelf', {productId})

export const reqCategoryPage = (categoryPid) => request('/product/category/page', {categoryPid})
export const reqCategoryList = (categoryPid) => request('/product/category/list', {categoryPid})
export const reqCategoryInfo = (categoryId) => request('/product/category/info', {categoryId})
export const reqCategoryAdd = (categoryPid, categoryName) => request('/product/category/add', {categoryPid, categoryName})
export const reqCategoryUpdate = (categoryId, categoryName) => request('/product/category/update', {categoryId, categoryName})