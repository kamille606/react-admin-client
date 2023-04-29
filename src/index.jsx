import {createRoot} from 'react-dom/client'
import App from './App'

import storageUtil from './utils/storageUtil'
import memoryUtil from './utils/memoryUtil'

const user = storageUtil.getUser()
memoryUtil.user = user

createRoot(document.getElementById('root')).render(<App/>)