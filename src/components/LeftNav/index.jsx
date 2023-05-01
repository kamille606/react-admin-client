import React,{useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
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

import './index.scss'

const getItem = (label, key, icon, children, type) => ({
  key, icon, children, label, type,
})

const items = [
  getItem('首页', '/home', <HomeOutlined/>),
  getItem('商品', '/product', <AppstoreOutlined/>, [
    getItem('商品管理', '/product/products', <BarsOutlined/>),
    getItem('品类管理', '/product/category', <ToolOutlined/>),
  ]),
  getItem('用户管理', '/user', <UserOutlined/>),
  getItem('角色管理', '/role', <SafetyCertificateOutlined/>),
  getItem('图形图表', '/charts', <AreaChartOutlined/>, [
    getItem('柱状图', '/charts/bar', <BarChartOutlined/>),
    getItem('折线图', '/charts/line', <LineChartOutlined/>),
    getItem('饼图', '/charts/pie', <PieChartOutlined/>),
  ]),
]

const LeftNav = () => {
  const navigateTo = useNavigate()
  const currentRoute = useLocation()
  let firstOpenKey = currentRoute.pathname.split('/')[1]
  const [openKeys, setOpenKeys] = useState(['/' + firstOpenKey]);

  const handleClick = (e) => {
    navigateTo(e.key)
  }
  const handleOpenChange = (openKeys) => {
    setOpenKeys([openKeys[openKeys.length - 1]])
  }
  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}>
          <h1>臭宝后台</h1>
        </div>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        items={items}
        openKeys={openKeys}
        selectedKeys={[currentRoute.pathname]}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      />
    </div>
  )
}

export default LeftNav