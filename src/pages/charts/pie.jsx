import React, {useState} from 'react'
import {Button, Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

const Pie = () => {

  const [data, setData] = useState([
    {value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}
  ])

  const update = () => {
    setData(data.map(item => {
      if (item.name === 'Search Engine') {
        return {...item, value: item.value + 100}
      }
      return item
    }))
  }

  const getOption = () => {
    return {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '60%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  return (
    <>
      <Card>
        <Button onClick={update}>更新</Button>
      </Card>

      <Card>
        <ReactEcharts option={getOption()}/>
      </Card>
    </>
  )
}

export default Pie