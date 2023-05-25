import React, {useEffect, useRef, useState} from 'react'
import {Button, Card, message, Modal, Table} from 'antd'

import LinkButton from '../../components/LinkButton'
import UserForm from './user-form'
import {formatDate} from '../../utils/dateUtil'
import {PAGE_SIZE} from '../../config/baseConfig'
import {reqRoleList, reqUserAdd, reqUserDelete, reqUserList, reqUserUpdate} from '../../api'

const User = () => {

  const userFormRef = useRef(null)

  const [user, setUser] = useState({})
  const [userList, setUserList] = useState([])
  const [roleList, setRoleList] = useState([])
  const [isShowForm, setIsShowForm] = useState(false)

  useEffect(() => {
    queryUserList()
    queryRoleList()
  }, [])

  const queryUserList = () => {
    reqUserList().then(response => {
      if (response.success) {
        setUserList(response.data)
      } else {
        message.error(response.message).then()
      }
    })
  }
  const queryRoleList = () => {
    reqRoleList().then(response => {
      if (response.success) {
        setRoleList(response.data)
      } else {
        message.error(response.message).then()
      }
    })
  }
  const userDelete = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const response = await reqUserDelete(user.userId)
        if (response.success) {
          message.success('删除成功').then()
          queryUserList()
        } else {
          message.error(response.message).then()
        }
      },
      okText: '确认',
      cancelText: '取消'
    })
  }
  const showAdd = () => {
    setUser({})
    setIsShowForm(true)
  }
  const showUpdate = (user) => {
    setUser(user)
    setIsShowForm(true)
  }
  const userAddOrUpdate = async () => {
    try {
      const values = await userFormRef.current.validateFields()
      let response
      let resultMessage
      if (user.userId) {
        resultMessage = '用户修改成功'
        response = await reqUserUpdate({userId: user.userId, ...values})
      } else {
        resultMessage = '用户添加成功'
        response = await reqUserAdd(values)
      }
      if (response.success) {
        message.success(resultMessage).then()
        setIsShowForm(false)
        userFormRef.current.cleanFormData()
        queryUserList()
      } else {
        message.error(response.message).then()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '所属角色',
      dataIndex: 'roleName'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      render: formatDate
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          <LinkButton onClick={() => showUpdate(user)}>修改</LinkButton>
          <LinkButton onClick={() => userDelete(user)}>删除</LinkButton>
        </span>
      )
    }
  ]
  const title = (
    <Button
      type="primary"
      onClick={showAdd}>
      创建用户
    </Button>
  )

  return (
    <Card title={title}>
      <Table
        bordered={true}
        rowKey="userId"
        pagination={{
          showQuickJumper: true,
          defaultPageSize: PAGE_SIZE
        }}
        dataSource={userList}
        columns={columns}/>

      <Modal
        title={user.userId ? '修改用户' : '添加用户'}
        open={isShowForm}
        onOk={userAddOrUpdate}
        onCancel={() => setIsShowForm(false)}
        okText={user.userId ? '修改' : '添加'}
        cancelText="取消"
      >
        <UserForm ref={userFormRef} roleList={roleList} user={user}/>
      </Modal>
    </Card>
  )
}

export default User