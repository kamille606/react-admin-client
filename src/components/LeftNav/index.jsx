import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {connect} from 'react-redux'
import {Menu} from 'antd'

import {setHeadTitle} from '../../redux/actions'
import {menuItems} from '../../config/menuConfig'

import './index.scss'

const getMenuMap = (menuItems, menuMap) => {
  menuItems.forEach(item => {
    menuMap.set(item.key, item.label)
    if (item.children) {
      getMenuMap(item.children, menuMap)
    }
  })
  return menuMap
}

const menuMap = getMenuMap(menuItems, new Map())

const LeftNav = (props) => {

  const {user} = props

  const navigate = useNavigate()
  const currentRoute = useLocation()

  let selectedKey = currentRoute.pathname
  const firstOpenKey = selectedKey.split('/')[1]

  const [menus, setMenus] = useState([])
  const [openKeys, setOpenKeys] = useState(['/' + firstOpenKey])

  if (selectedKey.startsWith('/product/products')) {
    selectedKey = '/product/products'
  }

  useEffect(() => {
    if (user.role) {
      setMenus(user.role.menus.split(','))
    }
  }, [user])

  useEffect(() => {
    props.setHeadTitle(menuMap.get(selectedKey))
  }, [selectedKey])

  const getAuthMenuItems = (menuItems) => {
    return menuItems.reduce((pre, item) => {
      if (menus.indexOf(item.key) !== -1) {
        pre.push({
          label: item.label,
          key: item.key,
          icon: item.icon,
          children: item.children ? getAuthMenuItems(item.children) : null
        })
      }
      return pre
    }, [])
  }
  const handleClick = (e) => {
    navigate(e.key)
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
        items={getAuthMenuItems(menuItems)}
        openKeys={openKeys}
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      />
    </div>
  )
}

export default connect(
  (state) => ({user: state.user}),
  {setHeadTitle}
)(LeftNav)