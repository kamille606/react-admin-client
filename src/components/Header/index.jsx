import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Button, message, Modal} from 'antd'
import {ExclamationCircleFilled, PoweroffOutlined} from '@ant-design/icons'

import LinkButton from '../LinkButton'
import {menuItems} from '../../config/menuConfig'
import {reqWeatherInfo} from '../../api'
import {formatDate} from '../../utils/dateUtil'
import memory from '../../utils/memoryUtil'
import store from '../../utils/storageUtil'

import './index.scss'

const Header = () => {

  const navigateTo = useNavigate()
  const currentRoute = useLocation()
  const [weatherNow, setWeatherNow] = useState('')
  const [temperature, setTemperature] = useState('')
  const [timeNow, setTimeNow] = useState(formatDate())
  const [user] = useState(memory.user)
  const [title, setTitle] = useState('')

  useEffect(() => {
    initTitle(currentRoute.pathname)
    const id = setInterval(() => {
      setTimeNow(formatDate())
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [currentRoute.pathname])

  useEffect(() => {
    initWeatherInfo()
  }, [])

  const initWeatherInfo = () => {
    reqWeatherInfo().then(response => {
      if (response.success) {
        const data = JSON.parse(response.data)
        setWeatherNow(data.now.text)
        setTemperature(data.now.temp)
      } else {
        message.error('获取天气信息失败').then()
      }
    }).catch(err => message.error('获取天气信息失败'))
  }

  const initTitle = (pathname) => {
    menuItems.forEach(item => {
      if (item.key === pathname) {
        setTitle(item.label)
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === pathname)
        if (cItem) {
          setTitle(cItem.label)
        }
      }
    })
  }

  const logout = () => {
    Modal.confirm({
      title: '确定退出吗?',
      icon: <ExclamationCircleFilled/>,
      onOk() {
        store.removeUser()
        memory.user = {}
        navigateTo('/login', {replace: true})
      },
      okText: '退出',
      cancelText: '取消'
    })
  }

  return (
    <div className="header">
      <div className="header-top">
        <span className="header-top-hello">欢迎，{user.nickname}</span>
        <Button
          type="primary"
          icon={<PoweroffOutlined/>}
          onClick={logout}
        />
        <LinkButton onClick={logout}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>时间:{timeNow}</span>
          {/*<img></img>*/}
          <span>天气：{weatherNow}</span>
          <span>温度：{temperature}℃</span>
        </div>
      </div>
    </div>
  )
}

export default Header