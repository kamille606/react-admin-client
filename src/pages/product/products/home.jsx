import React, {useEffect, useState} from 'react'
import {Card, Select, Input, Button, Table, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {PAGE_SIZE} from '../../../config/baseConfig'
import {reqProductPage} from '../../../api'
import LinkButton from '../../../components/LinkButton'

const ProductHome = () => {

  const [total, setTotal] = useState(0)
  const [productList, setProductList] = useState([])

  const [columns, setColumns] = useState([])
  const [tableLoading, setTableLoading] = useState(false)

  useEffect(() => {
    initTableColumns()
    queryProductList()
  }, [])

  const queryProductList = (current = 1) => {
    setTableLoading(true)
    reqProductPage({
      current, pageSize: PAGE_SIZE
    }).then(response => {
      if (response.success) {
        const {total, data} = response
        setTotal(total)
        setProductList(data)
      } else {
        message.error('获取商品列表失败').then()
      }
    })
    setTableLoading(false)
  }

  const initTableColumns = () => {
    setColumns([
      {
        title: '商品名称',
        dataIndex: 'productName',
        width: 130
      },
      {
        title: '商品描述',
        dataIndex: 'productDesc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: 100,
        render: (price) => '￥' + price
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (status) => {
          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ])
  }

  const title = (
    <span>
      <Select value='1' style={{width: 120}}>
        <Select.Option value='1'>按名称搜索</Select.Option>
        <Select.Option value='2'>按描述搜索</Select.Option>
      </Select>
      <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}}/>
      <Button type='primary'>搜索</Button>
    </span>
  )

  const extra = (
    <Button type='primary'>
      <PlusOutlined/>
      添加商品
    </Button>
  )

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered={true}
        loading={tableLoading}
        rowKey="productId"
        pagination={{
          total: total,
          showQuickJumper: true,
          defaultPageSize: PAGE_SIZE,
          onChange: queryProductList
        }}
        dataSource={productList}
        columns={columns}>

      </Table>
    </Card>
  )
}

export default ProductHome