import React, {useEffect, useRef, useState} from 'react'
import {Card, Button, Table, message, Modal} from 'antd'

import AddForm from './add-form'
import AuthForm from './auth-form'
import {formatDate} from '../../utils/dateUtil'
import {PAGE_SIZE} from '../../config/baseConfig'
import {reqRoleAdd, reqRoleList, reqRoleUpdate} from '../../api'

const Role = () => {

  const addFormRef = useRef(null)
  const authFormRef = useRef(null)

  const [roleList, setRoleList] = useState([])
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false)
  const [isShowAuth, setIsShowAuth] = useState(false)

  useEffect(() => {
    queryRoleList()
  }, [])

  const queryRoleList = () => {
    reqRoleList().then(response => {
      if (response.success) {
        setRoleList(response.data)
      } else {
        message.error(response.message).then()
      }
    })
  }
  const roleAdd = async () => {
    try {
      const values = await addFormRef.current.validateFields()
      const response = await reqRoleAdd(values.roleName)
      if (response.success) {
        message.success('角色添加成功').then()
        setIsShowAdd(false)
        addFormRef.current.cleanFormData()
        queryRoleList()
      } else {
        message.error(response.message)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const roleUpdate = async () => {
    try {
      const menus = authFormRef.current.getMenus()
      const role = selectedRole
      role.menus = menus.join(',')
      const response = await reqRoleUpdate(role)
      if (response.success) {
        message.success('设置角色权限成功').then()
        setIsShowAuth(false)
        queryRoleList()
      } else {
        message.error(response.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '授权人',
      dataIndex: 'authName',
    },
    {
      title: '授权时间',
      dataIndex: 'authTime',
      render: formatDate
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: formatDate
    }
  ]
  const title = (
    <span>
      <Button
        type='primary'
        onClick={() => setIsShowAdd(true)}>
        创建角色
      </Button>
      <Button
        type='primary'
        style={{marginLeft: 10}}
        disabled={selectedRowKeys.length===0}
        onClick={() => setIsShowAuth(true)}>
        设置角色权限
      </Button>
    </span>
  )
  const rowSelection = {
    type: 'radio',
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRole(selectedRows[0])
      setSelectedRowKeys(selectedRowKeys);
    }
  }

  return (
    <Card title={title}>
      <Table
        bordered={true}
        rowKey="roleId"
        pagination={{
          showQuickJumper: true,
          defaultPageSize: PAGE_SIZE
        }}
        dataSource={roleList}
        columns={columns}
        rowSelection={rowSelection}/>

      <Modal
        title="创建角色"
        open={isShowAdd}
        onOk={roleAdd}
        onCancel={() => setIsShowAdd(false)}
        okText="创建"
        cancelText="取消"
      >
        <AddForm ref={addFormRef}/>
      </Modal>

      <Modal
        title="设置角色权限"
        open={isShowAuth}
        onOk={roleUpdate}
        onCancel={() => setIsShowAuth(false)}
        okText="设置"
        cancelText="取消"
      >
        <AuthForm ref={authFormRef} role={selectedRole}/>
      </Modal>
    </Card>
  )
}

export default Role