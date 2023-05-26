import React, {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {Layout, message} from 'antd'

import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'

const {Footer, Sider, Content} = Layout

const Admin = (props) => {

  const navigate = useNavigate()

  useEffect(() => {
    const user = props.user
    if (!user || !user.userId) {
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

export default connect(
  state => ({user: state.user}),
  {}
)(Admin)