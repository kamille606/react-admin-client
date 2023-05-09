import React from 'react'
import {Outlet} from 'react-router-dom'

import './products.scss'

const Products = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Products