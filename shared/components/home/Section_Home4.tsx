import { IActivity, IActivityList } from '@/typeDefs/schema/activity.type'
import { Avatar, Card } from 'antd'
import React from 'react'
const { Meta } = Card
type Props = {
  activities: IActivity[] | undefined
}
const Section_Home4 = ({activities}: Props) => {
  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>Các hoạt động sắp tới</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {activities && activities.map((item: IActivity) => (
          <Card
            key={item.id}
            style={{ width: 550 }}
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

export default Section_Home4
