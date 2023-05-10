import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Card, Cascader, Upload, Button, Form, Input, InputNumber, message} from 'antd'

import ArrowTitle from '../../../components/ArrowTitle'
import {reqCategoryList} from '../../../api'
import {useLocation} from 'react-router-dom'

const ProductAddUpdate = () => {

  const location = useLocation()
  const [form] = Form.useForm()

  const [isUpdate, setIsUpdate] = useState(false)
  const [product, setProduct] = useState({})

  const [categoryOptions, setCategoryOptions] = useState([])

  useLayoutEffect(() => {
    const product = location.state
    setIsUpdate(!!product)
    setProduct(product || {})
  }, [])

  useEffect(() => {
    getCategoryOptions(0).then(options => {
      setCategoryOptions(options)
    })
  }, [])

  const getCategoryOptions = async (parentId) => {
    const response = await reqCategoryList(parentId)
    if (response.success) {
      return response.data.map(category => ({
        value: category.categoryId,
        label: category.categoryName,
        isLeaf: false
      }))
    } else {
      message.error(response.message).then()
      return []
    }
  }

  const loadCategoryData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    const options = await getCategoryOptions(targetOption.value)
    if (options && options.length > 0) {
      targetOption.children = options
    } else {
      targetOption.isLeaf = true
    }
    targetOption.loading = false
    setCategoryOptions([...categoryOptions])
  }

  const submit = async () => {
    try {
      const values = await form.validateFields()
      console.log(values)
    } catch (err) {
      console.log(err)
    }
  }

  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 6}
  }

  return (
    <Card title={<ArrowTitle>{isUpdate ? '修改商品' : '添加商品'}</ArrowTitle>}>
      <Form
        {...formItemLayout}
        form={form}>
        <Form.Item
          label="商品名称" name="productName"
          rules={[
            {required: true, message: '商品名称不能为空'}
          ]}>
          <Input placeholder="请输入商品名称"/>
        </Form.Item>
        <Form.Item
          label="商品描述" name="productDesc"
          rules={[
            {required: true, message: '商品描述不能为空'}
          ]}>
          <Input.TextArea placeholder="请输入商品描述" autosize={{minRows: 2}}/>
        </Form.Item>
        <Form.Item
          label="商品价格" name="price"
          rules={[
            {required: true, message: '价格不能为空'},
            {type: 'number', min: 0, message: '价格格式不正确'}
          ]}>
          <InputNumber placeholder="请输入商品价格" addonAfter="元"/>
        </Form.Item>
        <Form.Item label="商品分类" name='categoryIds'>
          <Cascader
            options={categoryOptions}
            loadData={loadCategoryData}/>
        </Form.Item>
        <Form.Item label="商品图片">
          <div>商品图片</div>
        </Form.Item>
        <Form.Item label="商品详情">
          <div>商品详情</div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={submit}></Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ProductAddUpdate