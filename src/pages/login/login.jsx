import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {Button, Form, Input, message} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {userLogin} from '../../api'
import memoryUtil from '../../utils/memoryUtil'
import storageUtil from '../../utils/storageUtil'

import './login.scss'

const Login = () => {

  const navigateTo = useNavigate()
  const user = memoryUtil.user

  if (user && user.id) {
    return <Navigate to="/"/>
  }

  const onFinish = async (values) => {
    const {data} = await userLogin(values)
    if (data.success) {
      message.success('登录成功')
      const user = data.data
      memoryUtil.user = user
      storageUtil.setUser(user)
      navigateTo('/', {replace: true})
    } else {
      message.error(data.message)
    }
  }

  const validatorPassword = (rule, value) => {
    if (!value) {
      return Promise.reject('密码为空')
    }
    if (value.length < 4 || value.length > 12) {
      return Promise.reject('密码长度不能小于4或者大于12')
    }
    return Promise.resolve()
  }

  const usernameRules = [
    {required: true, whitespace: true, message: '请输入用户名!'},
    {min: 4, message: '用户名至少4位!'},
    {max: 12, message: '用户名最多12位!'},
    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线!'}
  ]

  const passwordRules = [
    {required: true, message: '请输入密码!'},
    {validator: validatorPassword}
  ]

  return (
    <div className="login">
      <header className="login-header">
        <h1>{'后台管理项目'}</h1>
      </header>
      <section className="login-content">
        <h2>{'用户登录'}</h2>
        <div>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item name="username" rules={usernameRules}>
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
            </Form.Item>
            <Form.Item name="password" rules={passwordRules}>
              <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="密码"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {'登录'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  )
}

export default Login