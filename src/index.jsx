import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './assets/css/reset.css'

import storageUtil from './utils/storageUtil'
import memoryUtil from './utils/memoryUtil'

const user = storageUtil.getUser()
memoryUtil.user = user

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
)