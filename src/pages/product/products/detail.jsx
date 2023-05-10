import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {List, Card, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import bg from '../../../assets/images/bg.jpeg'
import LinkButton from '../../../components/LinkButton'
import {reqCategoryInfo} from '../../../api'

const ProductDetail = () => {

  const location = useLocation();
  const navigateTo = useNavigate()
  const {productName, productDesc, productDetail, price, categoryId} = location.state

  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    initCategoryInfo()
  }, [])

  const initCategoryInfo = () => {
    reqCategoryInfo(categoryId).then(response => {
      if (response.success) {
        setCategoryName(response.data.categoryName)
      } else {
        message.error('分类数据获取失败').then()
      }
    })
  }

  const title = (
    <span>
      <LinkButton onClick={() => navigateTo(-1)}>
         <ArrowLeftOutlined style={{color: '#1677FFFF', marginRight: 10, fontSize:17}}/>
      </LinkButton>

      <span>商品详情</span>
    </span>
  )

  return (
    <Card title={title} className="product-detail">
      <List>
        <List.Item>
          <span className='left'>商品名称:</span>
          <span>{productName}</span>
        </List.Item>
        <List.Item>
          <span className='left'>商品描述:</span>
          <span>{productDesc}</span>
        </List.Item>
        <List.Item>
          <span className='left'>价格:</span>
          <span>{price}元</span>
        </List.Item>
        <List.Item>
          <span className='left'>所属分类:</span>
          <span>{categoryName}</span>
        </List.Item>
        <List.Item>
          <span className='left'>商品图片:</span>
          <span>
            <img className='product-detail-img' src={bg} alt='img'/>
          </span>
        </List.Item>
        <List.Item>
          <span className='left'>商品详情:</span>
          <span dangerouslySetInnerHTML={{__html: productDetail}}/>
        </List.Item>
      </List>
    </Card>
  )
}

export default ProductDetail