import React, {useEffect, useState} from 'react'
import {Button, Card, message, Modal, Table} from 'antd'

import LinkButton from '../../components/LinkButton'
import {formatDate} from '../../utils/dateUtil'
import {PAGE_SIZE} from '../../config/baseConfig'
import {reqUserList} from '../../api'

const User = () => {

  const [userList, setUserList] = useState([])
  const [isShowForm, setIsShowForm] = useState(false)

  useEffect(() => {
    queryUserList()
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
  const userAddOrUpdate = () => {

  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '电话',
      dataIndex: 'mobile',
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
      render: () => (
        <span>
          <LinkButton>修改</LinkButton>
          <LinkButton>删除</LinkButton>
        </span>
      )
    },
  ]
  const title = (
    <Button
      type='primary'
      onClick={() => setIsShowForm(true)}>
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
        title="添加用户"
        open={isShowForm}
        onOk={userAddOrUpdate}
        onCancel={() => setIsShowForm(false)}
        okText="添加"
        cancelText="取消"
      >
        <div>添加或者更新</div>
      </Modal>
    </Card>
  )
}

export default User