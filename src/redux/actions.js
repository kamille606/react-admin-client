import {RECEIVE_USER, RESET_USER, SET_HEAD_TITLE, SHOW_ERROR_MESSAGE} from './action-types'
import storageUtil from '../utils/storageUtil'
import {reqUserLogin} from '../api'

export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, headTitle})
export const receiveUser = (data) => ({type: RECEIVE_USER, data})
export const sowErrorMessage = (data) => ({type: SHOW_ERROR_MESSAGE, data})
export const userLogout = () => {
  storageUtil.removeUser()
  return {type: RESET_USER}
}

export const userLogin = (username, password) => {
  return async dispatch => {
    const response = await reqUserLogin({username, password})
    if (response.success) {
      const user = response.data
      storageUtil.setUser(user)
      dispatch(receiveUser(user))
    } else {
      const errorMessage = response.message
      dispatch(sowErrorMessage(errorMessage))
    }
  }
}

