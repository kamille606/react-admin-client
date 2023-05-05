import React, {useEffect, useRef, useState} from 'react'
import {Button, Card, message, Modal, Table} from 'antd'
import {ArrowRightOutlined, PlusOutlined} from '@ant-design/icons'

import {reqCategoryAdd, reqCategoryList, reqCategoryUpdate} from '../../../api'
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

  const addFormRef = useRef(null)
  const updateFormRef = useRef(null)

  useEffect(() => {
    queryCategoryList()
    initTableColumns()
  }, [parentId])

  const queryCategoryList = () => {
    setTableLoading(true)
    reqCategoryList(parentId).then(response => {
      if (response.success) {
        const categoryList = response.data
        if (parentId === 0) {
          setCategoryList(categoryList)
        } else {
          setSubCategoryList(categoryList)
        }
      } else {
        message.error('获取分类列表失败').then()
      }
    })
    setTableLoading(false)
  }

  const showFirstCategoryList = () => {
    setParentId(0)
    setParentName('')
    setSubCategoryList([])
  }

  const showSubCategoryList = (category) => {
    setParentId(category.categoryId)
    setParentName(category.categoryName)
  }

  const showAddCategoryForm = () => {
    setShowStatus(1)
  }

  const showUpdateCategoryForm = (category) => {
    setCategory(category)
    setShowStatus(2)
  }

  const handleCancel = () => {
    setShowStatus(0)
  }

  const categoryAdd = async () => {
    try {
      const values = await addFormRef.current.validateFields()
      const response = await reqCategoryAdd(values.parentId, values.categoryName)
      if (response.success) {
        message.success('添加成功')
        addFormRef.current.cleanFormData(['categoryName'])
        setShowStatus(0)
        queryCategoryList()
      } else {
        message.error(response.message)
      }
    } catch (err) {
      console.log('校验失败')
    }
  }

  const categoryUpdate = async () => {
    //表单验证
    try {
      const values = await updateFormRef.current.validateFields()
      if (values.categoryName === category.categoryName) {
        message.success('修改成功')
        setShowStatus(0)
      } else {
        const response = await reqCategoryUpdate(category.categoryId, values.categoryName)
        if (response.success) {
          message.success('修改成功')
          setShowStatus(0)
          queryCategoryList()
        } else {
          message.error(response.message)
        }
      }
    } catch (err) {
      console.log('校验失败')
    }
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
            <LinkButton onClick={() => showUpdateCategoryForm(category)}>
              修改分类
            </LinkButton>
            {parentId === 0 ? (
              <LinkButton onClick={() => showSubCategoryList(category)}>
                查看子分类
              </LinkButton>) : null}
          </span>
        )
      }
    ])
  }

  const title = parentId === 0 ? '一级分类列表' : (
    <span>
      <LinkButton
        style={{fontSize: 16}}
        onClick={() => showFirstCategoryList()}>
        一级分类列表
      </LinkButton>
      <ArrowRightOutlined style={{marginRight: 5}}/>
      <span>{parentName}</span>
    </span>
  )

  const extra = (
    <Button onClick={() => showAddCategoryForm()}>
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
          open={showStatus === 1}
          onOk={categoryAdd}
          onCancel={handleCancel}
          okText="添加"
          cancelText="取消"
        >
          <AddForm
            ref={addFormRef}
            parentId={parentId}
            categoryList={categoryList}/>
        </Modal>

        <Modal
          title="修改分类"
          open={showStatus === 2}
          onOk={categoryUpdate}
          onCancel={handleCancel}
          okText="修改"
          cancelText="取消"
        >
          <UpdateForm
            ref={updateFormRef}
            categoryName={category.categoryName}/>
        </Modal>
      </Card>
    </div>
  )
}

export default Category