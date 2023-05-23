import React, {useEffect, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {Button, Card, Cascader, Form, Input, InputNumber, message} from 'antd'

import ArrowTitle from '../../../components/ArrowTitle'
import PictureWall from './picture-wall'
import RichTextEdit from './rich-text-edit'
import {reqCategoryList} from '../../../api'

const {Item} = Form

const ProductAddUpdate = () => {

  const location = useLocation()
  const [form] = Form.useForm()
  const pictureRef = useRef(null)
  const richTextRef = useRef(null)

  const [isUpdate, setIsUpdate] = useState(false)
  const [product, setProduct] = useState({
    productName: undefined,
    productDesc: undefined,
    productDetail: undefined,
    productImages: undefined,
    categoryPid: undefined,
    categoryId: undefined
  })
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
      form.setFieldsValue({
        productName: product.productName,
        productDesc: product.productDesc,
        productPrice: product.productPrice,
        categoryIds: [product.categoryPid, product.categoryId]
      })
      setProduct(product)
    }
  }

  function buildOptionTree(list, categoryPid) {
    const tree = []
    for (const one of list) {
      if (one.categoryPid === categoryPid) {
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
      const images = pictureRef.current.getImages()
      const detail = richTextRef.current.getRichText()
      console.log(values)
      console.log(images)
      console.log(detail)
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
          name="productPrice"
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
          name="productImages">
          <PictureWall ref={pictureRef} images={product.productImages}/>
        </Item>

        <Item
          label="商品详情"
          name="productDetail"
          wrapperCol={{span: 15}}>
          <RichTextEdit ref={richTextRef} richText={product.productDetail}/>
        </Item>

        <Item>
          <Button type="primary" onClick={submit}>提交</Button>
        </Item>
      </Form>
    </Card>
  )
}

export default ProductAddUpdate