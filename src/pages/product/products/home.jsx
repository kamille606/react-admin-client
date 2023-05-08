import React, {useEffect, useState} from 'react'
import {Button, Card, Input, message, Select, Space, Table} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {PAGE_SIZE} from '../../../config/baseConfig'
import {reqProductPage} from '../../../api'
import LinkButton from '../../../components/LinkButton'

const ProductHome = () => {

  const [total, setTotal] = useState(0)
  const [productList, setProductList] = useState([])
  const [searchType, setSearchType] = useState('productName')
  const [searchKeyword, setSearchKeyword] = useState('')

  const [columns, setColumns] = useState([])
  const [tableLoading, setTableLoading] = useState(false)

  useEffect(() => {
    initTableColumns()
    queryProductList()
  }, [])

  const queryProductList = (current = 1) => {
    setTableLoading(true)
    reqProductPage({
      current, pageSize: PAGE_SIZE, searchKeyword, searchType
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
              <Button type="primary">下架</Button>
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
      }
    ])
  }

  const title = (
    <Space>
      <Select
        value={searchType}
        onChange={setSearchType}
        style={{width: 120}}>
        <Select.Option value="productName">按名称搜索</Select.Option>
        <Select.Option value="productDesc">按描述搜索</Select.Option>
      </Select>
      <Input
        value={searchKeyword}
        onChange={(event) => {
          setSearchKeyword(event.target.value)
        }}
        placeholder="关键字"
        style={{width: 150}}/>
      <Button type="primary" onClick={() => queryProductList()}>搜索</Button>
      <Button type="default" onClick={() => setSearchKeyword('')}>重置</Button>
    </Space>
  )

  const extra = (
    <Button type="primary">
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