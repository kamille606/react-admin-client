import {Navigate} from "react-router-dom";
import React, {lazy} from "react";
import {Spin} from 'antd';

import User from '../pages/user/user'
import Role from '../pages/role/role'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'

import NotFound from '../components/NotFound'

const Login = lazy(() => import('../pages/login/login'))
const Admin = lazy(() => import('../pages/admin/admin'))
const Home = lazy(() => import('../pages/home/home'))
const Product = lazy(() => import('../pages/product/product'))
const Category = lazy(() => import('../pages/product/category'))

const withLoading = (element) => (
  <React.Suspense fallback={<div><Spin/></div>}>
    {element}
  </React.Suspense>
)

const routes = [
  {
    path: '/',
    element: <Navigate to='/home'/>
  },
  {
    path: '/',
    element: <Admin/>,
    children: [
      {
        path: '/home',
        element: withLoading(<Home/>)
      },
      {
        path: '/product/products',
        element: withLoading(<Product/>)
      },
      {
        path: '/product/category',
        element: withLoading(<Category/>)
      },
      {
        path: '/user',
        element: <User/>
      },
      {
        path: '/role',
        element: <Role/>
      },
      {
        path: '/charts/bar',
        element: <Bar/>
      },
      {
        path: '/charts/line',
        element: <Line/>
      },
      {
        path: '/charts/pie',
        element: <Pie/>
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