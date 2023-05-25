import React, {forwardRef, useEffect, useImperativeHandle} from 'react'
import {Form, Input, Select} from 'antd'

import {EMPTY} from '../../config/baseConfig'

const {Item} = Form
const {Option} = Select

const UserForm = (props, ref) => {

  const {roleList, user} = props
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    validateFields: form.validateFields,
    cleanFormData: form.resetFields
  }))
  useEffect(() => {
    initFormData()
  }, [user])

  const initFormData = () => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        password: user.username,
        mobile: user.mobile,
        email: user.email,
        roleId: user.roleId
      })
    }
  }

  const usernameRules = [
    {required: true, message: '用户名称不能为空'}
  ]

  return (
    <Form
      labelCol={{span: 4}}
      wrapperCol={{span: 15}}
      form={form}
      initialValues={{
        username: EMPTY,
      }}>
      <Item
        label="用户名"
        name="username"
        rules={usernameRules}>
        <Input placeholder="请输入用户名"/>
      </Item>

      <Item
        label="密码"
        name="password"
        rules={usernameRules}>
        <Input type="password" placeholder="请输入密码"/>
      </Item>

      <Item
        label="手机号"
        name="mobile">
        <Input placeholder="请输入手机号"/>
      </Item>

      <Item
        label="邮箱"
        name="email">
        <Input placeholder="请输入邮箱"/>
      </Item>

      <Item
        label="角色"
        name="roleId"
        rules={usernameRules}>
        <Select placeholder='请选择角色'>
          {
            roleList.map(role =>
              <Option key={role.roleId} value={role.roleId}>
                {role.roleName}
              </Option>
            )
          }
        </Select>
      </Item>
    </Form>
  )
}

export default forwardRef(UserForm)