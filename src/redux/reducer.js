import {combineReducers} from 'redux'

import {RECEIVE_USER, RESET_USER, SET_HEAD_TITLE, SHOW_ERROR_MESSAGE} from './action-types'
import storeUtils from '../utils/storageUtil'

const initHeadTitle = '首页'
const headTitle = (state = initHeadTitle, action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.headTitle
    default:
      return state
  }
}

const initUser = storeUtils.getUser()
const user = (state = initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {}
    case SHOW_ERROR_MESSAGE:
      return {...state, errorMessage: action.data}
    default:
      return state
  }
}

export default combineReducers({
  headTitle, user
})