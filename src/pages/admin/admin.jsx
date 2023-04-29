import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Layout} from 'antd'

import memoryUtil from '../../utils/memoryUtil'

import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'
import Home from '../home/home'
import Product from '../product/product'
import Category from '../product/category'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Login from '../login/login'


const {Footer, Sider, Content} = Layout

const Admin = () => {
  const user = memoryUtil.user

  if (!user || !user.id) {
    return <Navigate to="/login"/>
  }

  return (
    <Layout style={{height: '100%'}}>
      <Sider>
        <LeftNav/>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{backgroundColor: 'white'}}>
          <Routes>
            <Route path='/' element={<Admin/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </Content>
        <Footer style={{backgroundColor: 'aqua', textAlign: 'center'}}>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin