import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import {Menu} from 'antd'
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  BarsOutlined,
  HomeOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'

import logo from '../../assets/images/logo.png'
import './index.scss'

const getItem = (label, key, icon, children, type) => ({
  key, icon, children, label, type,
})

const items = [
  getItem('首页', '1', <HomeOutlined/>),
  getItem('商品', '2', <AppstoreOutlined/>, [
    getItem('品类管理', '2-1', <BarsOutlined/>),
    getItem('商品管理', '2-2', <ToolOutlined/>),
  ]),
  getItem('用户管理', '3', <UserOutlined/>),
  getItem('角色管理', '4', <SafetyCertificateOutlined/>),
  getItem('图形图表', '5', <AreaChartOutlined/>, [
    getItem('柱状图', '5-1', <BarChartOutlined/>),
    getItem('折线图', '5-2', <LineChartOutlined/>),
    getItem('饼图', '5-3', <PieChartOutlined/>),
  ]),
]

const LeftNav = () => {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo"/>
        <h1>琳宝后台</h1>
      </Link>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  )
}

export default LeftNav