import React from 'react'
import {Form, Input} from 'antd'

const UpdateForm = (props) => {

  const categoryNameRules = [
    {min: 2, message: '分类名称至少2位!'},
    {max: 12, message: '分类名称最多12位!'}
  ]

  return (
    <Form initialValues={{categoryName: props.categoryName}}>
      <Form.Item name="categoryName" rules={categoryNameRules}>
        <Input placeholder="请输入分类名称"/>
      </Form.Item>
    </Form>
  )
}

export default UpdateForm