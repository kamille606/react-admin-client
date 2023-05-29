import React from 'react'
import {useNavigate} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'

import LinkButton from '../LinkButton'

const ArrowTitle = (props) => {

  const {children} = props
  const navigate = useNavigate()

  return (
    <span>
      <LinkButton onClick={() => navigate(-1)}>
        <ArrowLeftOutlined style={{color: '#1677FFFF', marginRight: 10, fontSize: 17}}/>
      </LinkButton>
      <span>{children}</span>
    </span>
  )
}

export default ArrowTitle