import React from 'react'
import {Card, Button, Table} from 'antd'

const Role = () => {

  return (
    <Card>
      <Button type='primary'>创建角色</Button>
      <Button type='primary' style={{marginLeft: 10}}>设置角色权限</Button>
      <Table>
        <Table.Column title='角色名称' dataIndex='name' key='name' />
        <Table.Column title='创建时间' dataIndex='create_time' key='create_time' />
        <Table.Column title='授权时间' dataIndex='auth_time' key='auth_time' />
        <Table.Column title='授权人' dataIndex='auth_name' key='auth_name' />
      </Table>
    </Card>
  )
}

export default Role