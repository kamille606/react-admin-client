import React, {lazy} from 'react'
import {Navigate} from 'react-router-dom'
import {Spin} from 'antd'

import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'
import NotFound from '../components/NotFound'

const Home = lazy(() => import('../pages/home/home'))

const CategoryList = lazy(() => import('../pages/product/category/list'))
const Products = lazy(() => import('../pages/product/products/products'))
const ProductList = lazy(() => import('../pages/product/products/list'))
const ProductDetail = lazy(() => import('../pages/product/products/detail'))
const ProductAddUpdate = lazy(() => import('../pages/product/products/add-update'))

const User = lazy(() => import('../pages/user/user'))
const Role = lazy(() => import('../pages/role/role'))
const Bar = lazy(() => import('../pages/charts/bar'))
const Line = lazy(() => import('../pages/charts/line'))
const Pie = lazy(() => import('../pages/charts/pie'))

const withLoading = (element) => (
  <React.Suspense fallback={
    <Spin tip="Loading" size="large" style={{
      alignItems: 'center',
      alignContent: 'center',
      justifyItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="content"/>
    </Spin>}>
    {element}
  </React.Suspense>
)

const routes = [
  {
    path: '/',
    element: <Navigate to="/home"/>
  },
  {
    path: '/',
    element: <Admin/>,
    children: [
      {
        path: 'home',
        element: withLoading(<Home/>)
      },
      {
        path: 'product/category',
        element: withLoading(<CategoryList/>)
      },
      {
        path: 'product/products',
        element: <Navigate to="/product/products/list"/>
      },
      {
        path: 'product/products',
        element: withLoading(<Products/>),
        children: [
          {
            path: 'list',
            element: withLoading(<ProductList/>)
          },
          {
            path: 'detail',
            element: withLoading(<ProductDetail/>)
          },
          {
            path: 'add-update',
            element: withLoading(<ProductAddUpdate/>)
          }
        ]
      },
      {
        path: 'user',
        element: withLoading(<User/>)
      },
      {
        path: 'role',
        element: withLoading(<Role/>)
      },
      {
        path: 'charts/bar',
        element: withLoading(<Bar/>)
      },
      {
        path: 'charts/line',
        element: withLoading(<Line/>)
      },
      {
        path: 'charts/pie',
        element: withLoading(<Pie/>)
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
]

export default routes