import Head from 'next/head'
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { IBaseResponse } from '@/typeDefs/baseReponse.type'
import { IActivity } from '@/typeDefs/schema/activity.type'
import BlankLayout from '@/layouts/BlankLayout'
import { Button, Avatar, List, Badge, message } from 'antd'
import { useMutation } from 'react-query'
import { activityService } from '@/services/activity.service'
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from 'next/router'

type Props = {
  activity: IBaseResponse<IActivity>
}
const DetailActivity = ({ activity }: Props) => {
  const router = useRouter();
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
            <h3>Nội dung: {activity.data.description}</h3>
            <p>Số lượng TN đã tham dự: {activity.data.num_of_volunteers}</p>
            {activity.data.status === 0 && user ? (
              <Button onClick={() => applyActivityMutation.mutate({ activity_id: activity.data.id })}>Đăng ký</Button>
            ) : (
              <Button onClick={() => !user ? router.push("/login") : router.push("/activity")}>Vui lòng đăng ký tài khoản hoặc chờ hoạt động khác</Button>
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
        />{' '}
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
