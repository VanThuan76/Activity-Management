import { useAppSelector } from '@/hooks/useRedux'
import { activityService } from '@/services/activity.service'
import { IActivity } from '@/typeDefs/schema/activity.type'
import { Avatar, Button, Card, message } from 'antd'
import React from 'react'
import { useMutation } from 'react-query'
const { Meta } = Card
type Props = {
  activities: IActivity[] | undefined
}
const Section_Home4 = ({ activities }: Props) => {
  const { user } = useAppSelector(state => state.appSlice)
  const applyActivityMutation = useMutation({
    mutationKey: 'applyActivity',
    mutationFn: (body: { activity_id: number }) => activityService.applyActivity(body),
    onSuccess(data, _variables, _context) {
      if (data) {
        message.success('Đăng ký thành công')
      }
    },
    onError(error, variables, context) {
      message.error('Đăng ký không thành công')
    }
  })

  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>Các hoạt động sắp tới</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {activities &&
          activities.map((item: IActivity) => (
            <Card key={item.id} style={{ width: 550 }} cover={<img alt='example' src={item.image} />}>
              <Meta
                avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />}
                title={item.name}
                description={
                  <div className='flex justify-between items-center'>
                    <p>{item.description}</p>
                    {user && (
                      <Button onClick={() => applyActivityMutation.mutate({ activity_id: item.id })}>
                        Đăng ký tham gia
                      </Button>
                    )}
                  </div>
                }
              />
            </Card>
          ))}
      </div>
    </React.Fragment>
  )
}

export default Section_Home4
