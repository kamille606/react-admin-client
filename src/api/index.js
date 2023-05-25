import request from './request'

export const reqWeatherInfo = () => request('/manage/weather')

export const reqUserLogin = (data) => request('/auth/user/login', data)
export const reqUserList = () => request('/auth/user/list', null, 'GET')
export const reqUserAdd = (user) => request('/auth/user/add', user)
export const reqUserDelete = (userId) => request('/auth/user/delete', {userId})
export const reqUserUpdate = (user) => request('/auth/user/update', user)

export const reqRoleList = () => request('/auth/role/list', null,'GET')
export const reqRoleAdd = (roleName) => request('/auth/role/add', {roleName})
export const reqRoleUpdate = (data) => request('/auth/role/update', {
  roleId: data.roleId, menus: data.menus
})

export const reqProductPage = (data) => request('/product/page', {
  current: data.current, pageSize: data.pageSize, [data.searchType]: data.searchKeyword
})
export const reqProductOnSell = (productId) => request('/product/on-sell', {productId})
export const reqProductOffShelf = (productId) => request('/product/off-shelf', {productId})
export const reqProductAdd = (product) => request('/product/add', product)
export const reqProductUpdate = (product) => request('/product/update', product)

export const reqCategoryList = (categoryPid) => request('/product/category/list', {categoryPid})
export const reqCategoryInfo = (categoryId) => request('/product/category/info', {categoryId})
export const reqCategoryAdd = (categoryPid, categoryName) => request('/product/category/add', {categoryPid, categoryName})
export const reqCategoryUpdate = (categoryId, categoryName) => request('/product/category/update', {categoryId, categoryName})