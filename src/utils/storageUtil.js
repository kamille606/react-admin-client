import {USER_KEY} from '../config/baseConfig'

const store = {
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  removeUser() {
    localStorage.removeItem(USER_KEY)
  }
}

export default store