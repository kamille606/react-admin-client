import React from 'react'
import {useRoutes} from 'react-router-dom'
import router from './router'

const App = () => {
  const elements = useRoutes(router)
  return (
    <>
      {elements}
    </>
  )
}

export default App