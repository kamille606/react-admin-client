import React, {forwardRef, useEffect, useImperativeHandle} from 'react'
import {Form, Input, Select} from 'antd'

import {EMPTY} from '../../../config/baseConfig'

const {Item} = Form

const AddForm = (props, ref) => {

  const {categoryPid, categoryList} = props
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    getFormData: form.getFieldsValue,
    validateFields: form.validateFields,
    cleanFormData: form.resetFields
  }))

  useEffect(() => {
    form.setFieldsValue({categoryPid: categoryPid.toString()})
  }, [categoryPid])

  const categoryNameRules = [
    {required: true, message: '分类名称不能为空'}
  ]

  return (
    <Form
      labelCol={{span: 4}}
      wrapperCol={{span: 15}}
      form={form}
      initialValues={{
        categoryPid: '0',
        categoryName: EMPTY
      }}>

      <Item
        label="上级分类"
        name="categoryPid">
        <Select>
          <Select.Option key="0" value="0">一级分类</Select.Option>
          {
            categoryList.map(item => (
              <Select.Option
                key={item.categoryId.toString()}
                value={item.categoryId.toString()}>
                {item.categoryName}
              </Select.Option>
            ))
          }
        </Select>
      </Item>

      <Item
        label="分类名称"
        name="categoryName"
        rules={categoryNameRules}>
        <Input placeholder="请输入分类名称"/>
      </Item>
    </Form>
  )
}

export default forwardRef(AddForm)