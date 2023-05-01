import React from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {Layout} from 'antd'

import memoryUtil from '../../utils/memoryUtil'

import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'

const {Footer, Sider, Content} = Layout

const Admin = () => {
  const navigate = useNavigate()
  const user = memoryUtil.user

  if (!user || !user.id) {
    navigate('/login')
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider>
        <LeftNav/>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{backgroundColor: 'white'}}>
          <Outlet/>
        </Content>
        <Footer style={{backgroundColor: 'aqua', textAlign: 'center'}}>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin