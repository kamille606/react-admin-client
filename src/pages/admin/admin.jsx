import React, {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {Layout, message} from 'antd'

import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'
import memoryUtil from '../../utils/memoryUtil'

const {Footer, Sider, Content} = Layout

const Admin = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const user = memoryUtil.user
    if (!user || !user.id) {
      message.error('暂未登录，返回登录页面').then()
      navigate('/login', {replace: true})
    }
  }, [navigate])

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider>
        <LeftNav/>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{margin: 15, backgroundColor: 'white'}}>
          <Outlet/>
        </Content>
        <Footer style={{backgroundColor: 'aqua', textAlign: 'center'}}>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin