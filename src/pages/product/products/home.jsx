import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Card, Input, message, Select, Space, Table} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import LinkButton from '../../../components/LinkButton'
import {PAGE_SIZE} from '../../../config/baseConfig'
import {reqProductOffShelf, reqProductOnSell, reqProductPage} from '../../../api'

const ProductHome = () => {

  const navigateTo = useNavigate()

  const [productList, setProductList] = useState([])
  const [searchType, setSearchType] = useState('productName')
  const [searchKeyword, setSearchKeyword] = useState('')

  const [total, setTotal] = useState(1)
  const [current, setCurrent] = useState(1)
  const [columns, setColumns] = useState([])
  const [tableLoading, setTableLoading] = useState(false)

  useEffect(() => {
    initTableColumns()
    queryProductList(current)
  }, [])

  useEffect(() => {
    console.log('监听', current)
  }, [current])

  const queryProductList = (reqCurrent) => {
    console.log('',reqCurrent)
    setCurrent(reqCurrent)
    setTableLoading(true)
    reqProductPage({
      current: reqCurrent, pageSize: 2, searchKeyword, searchType
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

  const goProductDetail = (product) => {
    navigateTo('/product/products/detail', {state: product})
  }

  const updateProductStatus = async (product) => {
    console.log('修改前', aaaa)
    let response
    switch (product.status) {
      case 1:
        response = await reqProductOffShelf(product.productId)
        break
      case 2:
        response = await reqProductOnSell(product.productId)
        break
      default:
        message.error('未知商品状态')
    }
    if (response.success) {
      message.success('操作成功')
      queryProductList(current)
      console.log('修改后', current)
    } else {
      message.error(response.success)
    }
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
        width: 100,
        render: (product) => {
          const {status} = product
          return (
            <span>
              <Button
                type="primary"
                danger={status === 1}
                onClick={() => updateProductStatus(product)}>
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
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
              <LinkButton onClick={() => goProductDetail(product)}>详情</LinkButton>
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
      <Button type="primary" onClick={() => queryProductList(current)}>搜索</Button>
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
          current: current,
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