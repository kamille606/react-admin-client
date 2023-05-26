import { combineReducers } from 'redux'

import {SET_HEAD_TITLE} from './action-types'
import storeUtils from '../utils/storageUtil'

const initHeadTitle = '首页'
const headTitle = (state = initHeadTitle, action) => {
    switch (action.type) {
      case SET_HEAD_TITLE: return action.data
      default: return state
    }
}

const initUser = storeUtils.getUser()
const user = (state = initUser, action) => {
  switch (action.type) {
    default: return state
  }
}

export default combineReducers({
  headTitle,
  user
})