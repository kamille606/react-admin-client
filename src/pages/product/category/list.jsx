import React, {useEffect, useRef, useState} from 'react'
import {Button, Card, message, Modal, Table} from 'antd'
import {ArrowRightOutlined, PlusOutlined} from '@ant-design/icons'

import LinkButton from '../../../components/LinkButton'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {EMPTY, PAGE_SIZE} from '../../../config/baseConfig'
import {reqCategoryAdd, reqCategoryList, reqCategoryUpdate} from '../../../api'

const CategoryList = () => {

  const addFormRef = useRef(null)
  const updateFormRef = useRef(null)

  const [categoryPid, setCategoryPid] = useState(0)
  const [parentName, setParentName] = useState(EMPTY)
  const [category, setCategory] = useState({})
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])

  const [tableLoading, setTableLoading] = useState(false)
  const [showStatus, setShowStatus] = useState(0)

  useEffect(() => {
    queryCategoryList()
  }, [categoryPid])

  const queryCategoryList = () => {
    setTableLoading(true)
    reqCategoryList(categoryPid).then(response => {
      if (response.success) {
        const categoryList = response.data
        if (categoryPid === 0) {
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
    setCategoryPid(0)
    setParentName(EMPTY)
    setSubCategoryList([])
  }
  const showSubCategoryList = (category) => {
    setCategoryPid(category.categoryId)
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
      const response = await reqCategoryAdd(values.categoryPid, values.categoryName)
      if (response.success) {
        message.success('添加成功')
        addFormRef.current.cleanFormData(['categoryName'])
        setShowStatus(0)
        queryCategoryList()
      } else {
        message.error(response.message)
      }
    } catch (err) {
      console.log(err)
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
      console.log(err)
    }
  }

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
    },
    {
      title: '操作',
      width: 300,
      render: (category) => (
        <span>
            <LinkButton onClick={() => showUpdateCategoryForm(category)}>
              修改分类
            </LinkButton>
          {categoryPid === 0 ? (
            <LinkButton onClick={() => showSubCategoryList(category)}>
              查看子分类
            </LinkButton>) : null}
          </span>
      )
    }
  ]
  const title = categoryPid === 0 ? '一级分类列表' : (
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
    <Button type='primary' onClick={() => showAddCategoryForm()}>
      <PlusOutlined/>
      添加分类
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
            defaultPageSize: PAGE_SIZE
          }}
          dataSource={categoryPid === 0 ? categoryList : subCategoryList}
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
            categoryPid={categoryPid}
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

export default CategoryList