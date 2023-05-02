import {
  AppstoreOutlined, AreaChartOutlined, BarChartOutlined,
  BarsOutlined,
  HomeOutlined, LineChartOutlined, PieChartOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React from 'react'

const getItem = (label, key, icon, children, type) => ({
  key, icon, children, label, type,
})

export const menuItems = [
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
