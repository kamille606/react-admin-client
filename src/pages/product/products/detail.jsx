import React from 'react'
import {Button, List, Card} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

const ProductDetail = () => {

  const title = (
    <span>
      <ArrowLeftOutlined/>
      <span>商品详情</span>
    </span>
  )

  return (
    <Card title={title}>
      <List>
        <List.Item>
          <span>商品名称</span>
          <span>联想</span>
        </List.Item>
      </List>
    </Card>
  )
}

export default ProductDetail