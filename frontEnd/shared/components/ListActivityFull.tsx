import { activityService } from '@/services/activity.service'
import { IActivity } from '@/typeDefs/schema/activity.type'
import { Avatar, Badge, Button, Card, Pagination } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
const { Meta } = Card

const ListActivityFull = () => {
  const router = useRouter()
  const { data: dataActivity, refetch } = useQuery(['listActivity'], () => activityService.getAllActivity())
  const [filterActivity, setFilterActivity] = useState<IActivity[] | undefined>(dataActivity?.data.data.activities)

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-4'>
        {filterActivity &&
          filterActivity.map(item => (
            <Card
              key={item.id}
              style={{ width: 400 }}
              cover={
                <div className='col-span-1 w-full'>
                  <Badge.Ribbon
                    text={item.status === 0 ? 'Đang mở' : 'Đã đóng'}
                    color={item.status === 0 ? 'green' : 'red'}
                  >
                    <img className='w-full' height={250} src={item.image} />
                  </Badge.Ribbon>
                </div>
              }
            >
              <Meta
                avatar={<Avatar src={item.image} />}
                title={item.name}
                description={
                  <div className='flex justify-between items-center'>
                    <p>Tổ chức: {item.inforOrganizer?.name}</p>
                    <Button onClick={() => router.push(`/activity/${item.id}`)}>Xem chi tiết</Button>
                  </div>
                }
              />
            </Card>
          ))}
      </div>
      <Pagination
        onChange={value =>
          setFilterActivity(
            dataActivity?.data.data.activities.slice(0, dataActivity?.data.data.activities?.length / value)
          )
        }
        defaultCurrent={1}
        total={dataActivity?.data.data.activities.length}
      />
    </div>
  )
}

export default ListActivityFull
