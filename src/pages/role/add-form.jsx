import React, {forwardRef, useImperativeHandle} from 'react'
import {Form, Input} from 'antd'

import {EMPTY} from '../../config/baseConfig'

const {Item} = Form

const AddForm = (props, ref) => {

  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    validateFields: form.validateFields,
    cleanFormData: form.resetFields
  }))

  const roleNameRules = [
    {required: true, message: '角色名称不能为空'}
  ]

  return (
    <Form
      labelCol={{span: 4}}
      wrapperCol={{span: 15}}
      form={form}
      initialValues={{
      roleName: EMPTY
    }}>
      <Item
        label="角色名称"
        name="roleName"
        rules={roleNameRules}>
        <Input placeholder="请输入角色名称"/>
      </Item>
    </Form>
  )
}

export default forwardRef(AddForm)