import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Card, List, message} from 'antd'

import bg from '../../../assets/images/bg.jpeg'
import {reqCategoryInfo} from '../../../api'
import {EMPTY} from '../../../config/baseConfig'
import ArrowTitle from '../../../components/ArrowTitle'

const ProductDetail = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const [productName, setProductName] = useState(EMPTY)
  const [productDesc, setProductDesc] = useState(EMPTY)
  const [productDetail, setProductDetail] = useState(EMPTY)
  const [price, setPrice] = useState(0)
  const [categoryName, setCategoryName] = useState(EMPTY)

  useEffect(() => {
    initProductInfo()
    initCategoryInfo()
  }, [])

  const initProductInfo = () => {
    if (location.state === null) {
      navigate('/product/products', {replace: true})
      return
    }
    const {productName, productDesc, productDetail, price} = location.state
    setProductName(productName)
    setProductDesc(productDesc)
    setProductDetail(productDetail)
    setPrice(price)
  }

  const initCategoryInfo = () => {
    const {categoryId} = location.state
    reqCategoryInfo(categoryId).then(response => {
      if (response.success) {
        setCategoryName(response.data.categoryName)
      } else {
        message.error('分类数据获取失败').then()
      }
    })
  }

  return (
    <Card title={<ArrowTitle>商品详情</ArrowTitle>} className="product-detail">
      <List>
        <List.Item>
          <span className="left">商品名称:</span>
          <span>{productName}</span>
        </List.Item>
        <List.Item>
          <span className="left">商品描述:</span>
          <span>{productDesc}</span>
        </List.Item>
        <List.Item>
          <span className="left">价格:</span>
          <span>{price}元</span>
        </List.Item>
        <List.Item>
          <span className="left">所属分类:</span>
          <span>{categoryName}</span>
        </List.Item>
        <List.Item>
          <span className="left">商品图片:</span>
          <span>
            <img className="product-detail-img" src={bg} alt="img"/>
          </span>
        </List.Item>
        <List.Item>
          <span className="left">商品详情:</span>
          <span dangerouslySetInnerHTML={{__html: productDetail}}/>
        </List.Item>
      </List>
    </Card>
  )
}

export default ProductDetail