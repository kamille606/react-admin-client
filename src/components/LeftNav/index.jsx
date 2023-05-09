import React,{useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Menu} from 'antd'

import {menuItems} from '../../config/menuConfig'
import './index.scss'

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
        items={menuItems}
        openKeys={openKeys}
        selectedKeys={[currentRoute.pathname]}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      />
    </div>
  )
}

export default LeftNav