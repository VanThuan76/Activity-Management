import Head from 'next/head'
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { IBaseResponse } from '@/typeDefs/baseReponse.type'
import { IActivity } from '@/typeDefs/schema/activity.type'
import BlankLayout from '@/layouts/BlankLayout'
import { Button, Avatar, List, Badge, message, Form, Input, Card } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { activityService } from '@/services/activity.service'
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from 'next/router'
import { feedbackService } from '@/services/feedback.service'
import { userService } from '@/services/user.service'

type Props = {
  activity: IBaseResponse<IActivity>
}
const DetailActivity = ({ activity }: Props) => {
  const { data: userDetail } = useQuery(['userDetail'], () => userService.getUserByAuth(), {
    select(data) {
      return data.data.data.activityApplied
    }
  })
  const currentDate = new Date()
  const router = useRouter()
  const { user } = useAppSelector(state => state.appSlice)
  const newFeedbackMutation = useMutation({
    mutationKey: 'newFeedback',
    mutationFn: (body: { activity_id: number; title: string; content: string }) => feedbackService.newActivity(body),
    onSuccess(data, _variables, _context) {
      const res = data.data
      if (!res) return
      message.success('Tạo thành công')
      window.location.reload()
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công')
    }
  })

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

  const cancelActivityMutation = useMutation({
    mutationKey: 'cancelActivity',
    mutationFn: (body: { activity_id: number }) => activityService.cancelActivity(body),
    onSuccess(data, _variables, _context) {
      if (data) {
        message.success('Đăng ký thành công')
      }
    },
    onError(error, variables, context) {
      message.error('Đăng ký không thành công')
    }
  })

  function handleNewFeedback(value: any) {
    const body = {
      activity_id: activity.data.id,
      title: value.title,
      content: value.content
    }
    newFeedbackMutation.mutate(body)
  }
  if (!activity) return <React.Fragment></React.Fragment>
  return (
    <React.Fragment>
      <Head>
        <title>Hoạt động chi tiết</title>
        <meta name='description' content='Hoạt động chi tiết' />
        <meta name='keywords' content='Activity Management' />
      </Head>
      <section className='w-full h-full grid grid-cols-1 gap-10'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-start items-start gap-24'>
          <div className='col-span-1 w-full'>
            <Badge.Ribbon
              text={activity.data.status === 0 ? 'Đang mở' : 'Đã đóng'}
              color={activity.data.status === 0 ? 'green' : 'red'}
            >
              <img className='w-full' height={500} src={activity.data.image} />
            </Badge.Ribbon>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
              <h1>Tên: {activity.data.name}</h1>
              <h2>Địa điểm: {activity.data.location}</h2>
            </div>
            <div className='flex flex-col'>
              <h3>Kỹ năng</h3>
              <div className='flex flex-wrap justify-start items-start gap-3'>
                {activity.data.skillsActivity?.map((skill, index) => (
                  <p key={index} className='border-2 border-blue-700'>
                    {skill.name}
                  </p>
                ))}
              </div>
            </div>
            <h3 style={{whiteSpace: 'pre-line'}}>Nội dung: {activity.data.description}</h3>
            <div className='w-full flex justify-between items-center'>
              <p>Số lượng TN đã tham dự: {activity.data.num_of_volunteers}</p>
              <p>Số lượng TN tối đa: {activity.data.max_of_volunteers}</p>
            </div>
            <div className='w-full flex justify-between items-center'>
              <p>Thời gian tham gia: {activity.data.from_at}</p>
              <p>Thời gian kết thúc: {activity.data.to_at}</p>
            </div>
            {activity.data.num_of_volunteers === activity.data.max_of_volunteers ||
            new Date(activity.data.to_at).getTime() < currentDate.getTime() ? (
              <>
                <p>Đã đủ TN viên tham gia hoặc hoạt động hết hạn tham gia</p>
              </>
            ) : (
              <>
                {activity.data.status === 0 && user ? (
                  <>
                    {userDetail && userDetail.some((item: any) => item.activity_id === activity.data.id) ? (
                      <>
                        <p>Bạn đã đăng ký</p>
                        <Button onClick={() => cancelActivityMutation.mutate({ activity_id: activity.data.id })}>
                          Huỷ đăng ký
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          applyActivityMutation.mutate({ activity_id: activity.data.id })
                          setTimeout(() => {
                            router.push('/activity')
                            message.success('Đăng ký thành công')
                          }, 500)
                        }}
                      >
                        Đăng ký
                      </Button>
                    )}
                  </>
                ) : (
                  <Button onClick={() => (!user ? router.push('/login') : router.push('/activity'))}>
                    Vui lòng đăng ký tài khoản hoặc chờ hoạt động khác
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <List
          itemLayout='horizontal'
          dataSource={activity.data.feedback}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<span>{item.name}</span>}
                description={
                  <div>
                    <p>Tiêu đề: {item.title}</p>
                    <p>{item.content}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        {userDetail && userDetail.some((item: any) => item.activity_id === activity.data.id) ? (
          <Card title='Feedback'>
            <Form
              name='newFeedback'
              initialValues={{ remember: true }}
              onFinish={handleNewFeedback}
              autoComplete='off'
              layout='vertical'
            >
              <Form.Item label='Tiêu đề' name='title' rules={[{ required: true, message: 'Chưa điền tiêu đề' }]}>
                <Input />
              </Form.Item>

              <Form.Item label='Nội dung' name='content' rules={[{ required: true, message: 'Chưa điền nội dung' }]}>
                <Input />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button htmlType='submit'>Bình luận</Button>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          <></>
        )}
      </section>
    </React.Fragment>
  )
}
DetailActivity.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>
export default DetailActivity

export const getStaticProps: GetStaticProps = async ctx => {
  const id = ctx.params?.id
  if (id) {
    try {
      const responseActivity = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/activities/${id}`)
      const activity = await responseActivity.json()
      return {
        props: {
          activity
        }
      }
    } catch (error) {
      return {
        props: {
          activity: null,
          error: 'Failed to fetch activity data'
        }
      }
    }
  } else {
    return {
      props: {},
      notFound: true
    }
  }
}
export const getStaticPaths: GetStaticPaths = async _ctx => {
  return {
    paths: [],
    fallback: true
  }
}
