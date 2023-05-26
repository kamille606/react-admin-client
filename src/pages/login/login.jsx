import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {Button, Form, Input, message} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'

import memoryUtil from '../../utils/memoryUtil'
import storageUtil from '../../utils/storageUtil'
import {reqUserLogin} from '../../api'

import './login.scss'

const Login = () => {

  const navigate = useNavigate()
  const user = memoryUtil.user

  if (user && user.userId) {
    return <Navigate to="/"/>
  }

  const onFinish = async (values) => {
    const response = await reqUserLogin(values)
    if (response.success) {
      message.success('登录成功')
      const user = response.data
      memoryUtil.user = user
      storageUtil.setUser(user)
      navigate('/', {replace: true})
    } else {
      message.error(response.message)
    }
  }

  const validatorPassword = (rule, value) => {
    if (!value) {
      return Promise.reject('密码为空')
    }
    if (value.length < 3) {
      return Promise.reject('密码长度不能小于3')
    }
    return Promise.resolve()
  }

  const usernameRules = [
    {required: true, whitespace: true, message: '请输入用户名!'},
    {min: 3, message: '用户名至少3位!'},
    {max: 12, message: '用户名最多12位!'},
    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线!'}
  ]

  const passwordRules = [
    {required: true, message: '请输入密码!'},
    {validator: validatorPassword}
  ]

  return (
    <div className='login'>
      <header className='login-header'>
        <h1>后台管理项目</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <div>
          <Form name='normal_login' className='login-form' onFinish={onFinish}>
            <Form.Item name='username' rules={usernameRules}>
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder='用户名'/>
            </Form.Item>
            <Form.Item name='password' rules={passwordRules}>
              <Input prefix={<LockOutlined className="site-form-item-icon"/>} type='password' placeholder='密码'/>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
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