import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {message} from 'antd'

import {menuItems} from '../../config/menuConfig'

import {getWeather} from '../../api'
import {formatDate} from '../../utils/dateUtil'
import memory from '../../utils/memoryUtil'

import './index.scss'

const Header = () => {

  const currentRoute = useLocation()
  const [weatherNow, setWeatherNow] = useState('');
  const [temperature, setTemperature] = useState('');
  const [timeNow, setTimeNow] = useState(formatDate());
  const [user] = useState(memory.user);
  const [title, setTitle] = useState('');

  useEffect(()=>{
    initWeatherInfo().catch(error => {
      console.log(error)
    })
    initTitle(currentRoute.pathname)
    setInterval(() => {
      setTimeNow(formatDate())
    }, 1000)
  },[currentRoute.pathname])


  const initWeatherInfo = async () => {
    const response = await getWeather()
    if (response.success) {
      const data = JSON.parse(response.data)
      setWeatherNow(data.now.text)
      setTemperature(data.now.temp)
    } else {
      message.error('获取天气信息失败')
    }
  }

  const initTitle = (pathname) => {
    console.log(menuItems)
    menuItems.forEach(item => {
      if (item.key===pathname) {
        setTitle(item.label)
      }
    })
  }

  return (
    <div className='header'>
      <div className='header-top'>
        <span>欢迎，{user.nickname}</span>
        {/*<a href='javascript:'>退出</a>*/}
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>{title}</div>
        <div className='header-bottom-right'>
          <span>时间:{timeNow}</span>
          {/*<img></img>*/}
          <span>天气：{weatherNow}</span>
          <span>温度：{temperature}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;