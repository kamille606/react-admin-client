import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Result} from 'antd'

const NotFound = () => {
  const navigateTo = useNavigate()
  const handleClick = () => {
    navigateTo('/')
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={handleClick}>Back Home</Button>}
    />
  )
}

export default NotFound