import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button, message, Modal} from 'antd'
import {ExclamationCircleFilled, PoweroffOutlined} from '@ant-design/icons'

import {userLogout} from '../../redux/actions'
import LinkButton from '../LinkButton'
import {formatDateNow} from '../../utils/dateUtil'
import {EMPTY} from '../../config/baseConfig'
import {reqWeatherInfo} from '../../api'

import './index.scss'

const Header = (props) => {

  const {user, headTitle} = props

  const navigate = useNavigate()
  const [weatherNow, setWeatherNow] = useState(EMPTY)
  const [temperature, setTemperature] = useState(EMPTY)
  const [timeNow, setTimeNow] = useState(formatDateNow())

  useLayoutEffect(() => {
    const id = setInterval(() => {
      setTimeNow(formatDateNow())
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

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

  const logout = () => {
    Modal.confirm({
      title: '确定退出吗?',
      icon: <ExclamationCircleFilled/>,
      onOk() {
        props.userLogout()
        navigate('/login', {replace: true})
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
        <div className="header-bottom-left">{headTitle}</div>
        <div className="header-bottom-right">
          <span>时间:{timeNow}</span>
          <span>天气：{weatherNow}</span>
          <span>温度：{temperature}℃</span>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {userLogout}
)(Header)