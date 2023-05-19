import React, {useEffect, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {Card, Cascader, Button, Form, Input, InputNumber, message} from 'antd'

import ArrowTitle from '../../../components/ArrowTitle'
import PictureWall from './picture-wall'
import {reqCategoryList} from '../../../api'

const {Item} = Form

const ProductAddUpdate = () => {

  const location = useLocation()
  const [form] = Form.useForm()
  const pictureRef = useRef(null)

  const [isUpdate, setIsUpdate] = useState(false)
  const [product, setProduct] = useState({})
  const [categoryOptions, setCategoryOptions] = useState([])

  useEffect(() => {
    getCategoryOptions().then(options => {
      setCategoryOptions(options)
    })
    initFormData()
  }, [])

  const initFormData = () => {
    const product = location.state
    if (product) {
      setIsUpdate(!!product)
      const {categoryPid, categoryId} = product
      form.setFieldsValue({
        productName: product.productName,
        productDesc: product.productDesc,
        price: product.price,
        categoryIds: [categoryPid, categoryId]
      })
      setProduct(product)
    }
  }

  function buildOptionTree(list, parentId) {
    const tree = []
    for (const one of list) {
      if (one.parentId === parentId) {
        const child = buildOptionTree(list, one.categoryId)
        const node = {
          value: one.categoryId,
          label: one.categoryName,
          children: child,
          isLeaf: child.length <= 0
        }
        tree.push(node)
      }
    }
    return tree
  }

  const getCategoryOptions = async () => {
    const response = await reqCategoryList(null)
    if (response.success) {
      return buildOptionTree(response.data, 0)
    } else {
      message.error(response.message).then()
      return []
    }
  }

  const submit = async () => {
    try {
      const values = await form.validateFields()
      const imageFiles = pictureRef.current.getImageFiles()
      console.log(values)
      console.log(imageFiles)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card title={<ArrowTitle>{isUpdate ? '修改商品' : '添加商品'}</ArrowTitle>}>
      <Form
        labelCol={{span: 3}}
        wrapperCol={{span: 8}}
        form={form}>

        <Item
          label="商品名称"
          name="productName"
          rules={[
            {required: true, message: '商品名称不能为空'}
          ]}>
          <Input placeholder="请输入商品名称"/>
        </Item>

        <Item
          label="商品描述"
          name="productDesc"
          rules={[
            {required: true, message: '商品描述不能为空'}
          ]}>
          <Input.TextArea
            placeholder="请输入商品描述"
            autosize={{minRows: 2}}/>
        </Item>

        <Item
          label="商品价格"
          name="price"
          rules={[
            {required: true, message: '价格不能为空'},
            {type: 'number', min: 0, message: '价格格式不正确'}
          ]}>
          <InputNumber
            placeholder="请输入商品价格"
            addonAfter="元"/>
        </Item>

        <Item
          label="商品分类"
          name="categoryIds"
          rules={[
            {required: true, message: '必须指定商品分类'}
          ]}>
          <Cascader
            placeholder="请指定商品分类"
            options={categoryOptions}/>
        </Item>

        <Item
          label="商品图片"
          name='images'>
          <PictureWall ref={pictureRef}/>
        </Item>

        <Item label="商品详情">
          <div>商品详情</div>
        </Item>

        <Item>
          <Button type="primary" onClick={submit}></Button>
        </Item>
      </Form>
    </Card>
  )
}

export default ProductAddUpdate