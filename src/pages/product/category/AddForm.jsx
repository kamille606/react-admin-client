import React from 'react'
import {Form, Select, Input} from 'antd'

const AddForm = () => {

  const categoryNameRules = [
    {min: 2, message: '分类名称至少2位!'},
    {max: 12, message: '分类名称最多12位!'},
  ]

  return (
    <Form initialValues={{parentId:'0',categoryName:''}}>
      <Form.Item name='parentId'>
        <Select>
          <Select.Option value='0'>一级分类</Select.Option>
          <Select.Option value='1'>电脑</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='categoryName' rules={categoryNameRules}>
        <Input placeholder='请输入分类名称'/>
      </Form.Item>
    </Form>
  )
}

export default AddForm