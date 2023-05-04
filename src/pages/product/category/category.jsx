import React, {useEffect, useState} from 'react'
import {Button, Card, message, Table, Modal} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons'

import {reqCategoryList} from '../../../api'
import LinkButton from '../../../components/LinkButton'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

const Category = () => {

  const [parentId, setParentId] = useState(0)
  const [parentName, setParentName] = useState('')
  const [category, setCategory] = useState({})
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])

  const [columns, setColumns] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [showStatus, setShowStatus] = useState(0)

  useEffect(() => {
    initTableColumns()
    queryCategoryList().catch(e => console.log(e))
  }, [parentId])

  const queryCategoryList = async () => {
    if (categoryList.length === 0) {
      setTableLoading(true)
      const response = await reqCategoryList(parentId)
      setTableLoading(false)
      if (response.success) {
        const categoryList = response.data
        if (parentId === 0) {
          setCategoryList(categoryList)
        } else {
          setSubCategoryList(categoryList)
        }
      } else {
        message.error('获取分类列表失败')
      }
    }
  }

  const showSubCategoryList = (category) => {
    setParentId(category.categoryId)
    setParentName(category.categoryName)
  }

  const showFirstCategoryList = () => {
    setParentId(0)
    setParentName('')
    setSubCategoryList([])
  }

  const showUpdateCategoryForm = (category) => {
    setCategory(category)
    setShowStatus(2)
  }

  const handleCancel = () => {
    setShowStatus(0)
  }

  const categoryAdd = () => {
    console.log('categoryAdd')
  }

  const categoryUpdate = () => {
    console.log('categoryUpdate')
  }

  const initTableColumns = () => {
    setColumns([
      {
        title: '分类名称',
        dataIndex: 'categoryName',
        key: 'categoryName'
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => showUpdateCategoryForm(category)}>修改分类</LinkButton>
            {parentId === 0 ? <LinkButton onClick={() => showSubCategoryList(category)}>查看子分类</LinkButton> : null}
          </span>
        )
      }
    ])
  }

  const title = parentId === 0 ? '一级分类列表' : (
    <span>
      <LinkButton style={{fontSize: 16}} onClick={showFirstCategoryList}>
        一级分类列表
      </LinkButton>
      <ArrowRightOutlined style={{marginRight: 5}}/>
      <span>{parentName}</span>
    </span>
  )
  const extra = (
    <Button onClick={() => setShowStatus(1)}>
      <PlusOutlined/>
      添加
    </Button>
  )

  return (
    <div>
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          loading={tableLoading}
          rowKey="categoryId"
          pagination={{
            showQuickJumper: true,
            defaultPageSize: 5
          }}
          dataSource={parentId === 0 ? categoryList : subCategoryList}
          columns={columns}/>

        <Modal
          title="添加分类"
          open={showStatus===1}
          onOk={categoryAdd}
          onCancel={handleCancel}
          okText='添加'
          cancelText='取消'
        >
          <AddForm parentId={category.parentId}/>
        </Modal>

        <Modal
          title="修改分类"
          open={showStatus===2}
          onOk={categoryUpdate}
          onCancel={handleCancel}
          okText='修改'
          cancelText='取消'
        >
          <UpdateForm categoryName={category.categoryName}/>
        </Modal>
      </Card>
    </div>
  )
}

export default Category