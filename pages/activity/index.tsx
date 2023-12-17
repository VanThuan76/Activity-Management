import { activityService } from '@/services/activity.service'
import { Avatar, Card } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
const { Meta } = Card

const ActivityPage = () => {
  const { data: dataActivity, refetch } = useQuery(['listActivity'], () => activityService.getAllActivity())
  return (
    <React.Fragment>
      <h1 className='flex flex-col justify-center items-center gap-10 mb-24 text-6xl leading-8 text-bold text-[#0F147F]'>
        Danh sách hoạt động
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {dataActivity && dataActivity.data && dataActivity.data.data.activities.map(item => (
          <Card
            key={item.id}
            style={{ width: 400 }}
            cover={<img alt='example' src={item.image} />}
          >
            <Meta
              avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />}
              title={item.name}
              description={item.description}
            />
          </Card>
        ))}
      </div>
    </React.Fragment>
  )
}

export default ActivityPage
