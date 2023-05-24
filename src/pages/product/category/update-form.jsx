import React, {forwardRef, useEffect, useImperativeHandle} from 'react'
import {Form, Input} from 'antd'

const UpdateForm = (props, ref) => {

  const {categoryName} = props
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    getFormData: form.getFieldsValue,
    validateFields: form.validateFields
  }))
  useEffect(() => {
    form.setFieldsValue({categoryName})
  }, [categoryName])

  const categoryNameRules = [
    {required: true, message: '分类名称不能为空'}
  ]

  return (
    <Form form={form}>
      <Form.Item name="categoryName" rules={categoryNameRules}>
        <Input placeholder="请输入分类名称"/>
      </Form.Item>
    </Form>
  )
}

export default forwardRef(UpdateForm)