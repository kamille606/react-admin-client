import React, {useEffect} from 'react'
import {Form, Input} from 'antd'

const UpdateForm = (props) => {

  const categoryName = props.categoryName
  const [form] = Form.useForm();

  const categoryNameRules = [
    {min: 2, message: '分类名称至少2位!'},
    {max: 12, message: '分类名称最多12位!'}
  ]

  useEffect(() => {
    form.setFieldsValue({categoryName})
  }, [props])

  return (
    <Form form={form}>
      <Form.Item name="categoryName" rules={categoryNameRules}>
        <Input placeholder="请输入分类名称"/>
      </Form.Item>
    </Form>
  )
}

export default UpdateForm