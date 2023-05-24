import React, {forwardRef, useEffect, useImperativeHandle} from 'react'
import {Form, Input, Select} from 'antd'
import {EMPTY} from '../../../config/baseConfig'

const AddForm = (props, ref) => {

  const {categoryPid, categoryList} = props
  const [form] = Form.useForm()

  const categoryNameRules = [
    {required: true, message: '分类名称不能为空'}
  ]

  useImperativeHandle(ref, () => ({
    getFormData: form.getFieldsValue,
    validateFields: form.validateFields,
    cleanFormData: form.resetFields
  }))

  useEffect(() => {
    form.setFieldsValue({categoryPid: categoryPid.toString()})
  }, [categoryPid])

  return (
    <Form
      form={form}
      initialValues={{
        categoryPid: '0',
        categoryName: EMPTY
      }}>
      <Form.Item name="categoryPid">
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
      </Form.Item>
      <Form.Item
        name="categoryName"
        rules={categoryNameRules}>
        <Input placeholder="请输入分类名称"/>
      </Form.Item>
    </Form>
  )
}

export default forwardRef(AddForm)