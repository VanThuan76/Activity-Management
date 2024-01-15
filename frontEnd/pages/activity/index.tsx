import { activityService } from '@/services/activity.service'
import { organizationService } from '@/services/organization.service'
import { skillService } from '@/services/skill.service'
import { IActivity } from '@/typeDefs/schema/activity.type'
import { Avatar, Badge, Button, Card, DatePicker, Form, Input, message, Pagination, Select } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'antd/lib/form/Form'
import { convertDate } from '@/utils/convertDate'
import ListActivityFull from '@/components/ListActivityFull'
const { Meta } = Card
const { RangePicker } = DatePicker

const ActivityPage = () => {
  const router = useRouter()
  const [form] = useForm()
  const { query } = router
  const [key, setKey] = useState('')
  const [filterActivity, setFilterActivity] = useState<IActivity[] | undefined>()
  const { data: dataActivitySearch, refetch: refetchSearch } = useQuery(
    ['listActivitySearch'],
    () => activityService.searchActivity(key as string),
    { enabled: key !== '' }
  )
  const { data: skills } = useQuery(['skills'], () => skillService.getAllSkill(), {
    select(data) {
      const result = data.data.data
      if (!result) return
      const res = result.skills.map(skill => ({
        label: skill.name,
        value: skill.id
      }))
      return res
    }
  })
  const { data: organizers } = useQuery(['organizers'], () => organizationService.getAllOrganization(), {
    select(data) {
      const result = data.data.data
      if (!result) return
      const res = result.organizations.map(organization => ({
        label: organization.name,
        value: organization.id
      }))
      return res
    }
  })
  const { data: dataActivity, refetch } = useQuery(['listActivity'], () => activityService.getAllActivity())
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyValue = params.get('key')
    setKey(keyValue || (query.key as string) || '')
    refetchSearch()
  }, [])
  useEffect(() => {
    if (key === '') {
      if (dataActivity && dataActivity.data && dataActivity.data.data.activities) {
        const sortedActivities = [...dataActivity.data.data.activities].sort((a, b) => {
          if (a.status === 0 && b.status !== 0) {
            return -1
          } else if (a.status !== 0 && b.status === 0) {
            return 1
          }
          return 0
        })
        setFilterActivity(sortedActivities)
      }
    } else {
      refetchSearch()
      setFilterActivity(dataActivitySearch?.data.data.activities)
    }
  }, [dataActivity, key]) // Chỉ gọi lại khi dataActivity thay đổi
  const filterActivityMute = useMutation({
    mutationKey: 'filterActivityMute',
    mutationFn: (body: { name?: string; address?: string; skills?: number[]; orgainzer?: number }) =>
      activityService.searchMultipleActivity(body),
    onSuccess(data, _variables, _context) {
      setFilterActivity(data.data.data.activities)
      if (data.data.data) {
        message.success('Tìm kiếm thành công')
      }
    },
    onError(error, variables, context) {
      message.error('Tìm kiếm không thành công')
    }
  })
  const handleFilter = (value: any) => {
    const queryParams: { [key: string]: string } = {}
    if (value.name) {
      queryParams.name = value.name
    }
    if (value.address) {
      queryParams.address = value.address
    }
    if (value.orgainzer) {
      queryParams.orgainzer = value.orgainzer
    }
    router.push({
      pathname: '/activity',
      query: queryParams
    })
    const body = {
      name: value.name,
      address: value.address,
      orgainzer: value.orgainzer,
      date: {
        from_at: value.date && convertDate(value.date[0].$d),
        to_at: value.date && convertDate(value.date[1].$d)
      },
      skills: value.skills
    }
    filterActivityMute.mutate(body)
  }
  return (
    <React.Fragment>
      <Head>
        <title>Danh sách hoạt động</title>
        <meta name='description' content='Danh sách hoạt động' />
        <meta name='keywords' content='Activity Management' />
      </Head>
      <h1 className='flex flex-col justify-center items-center gap-10 mb-24 text-6xl leading-8 text-bold text-[#0F147F]'>
        Danh sách hoạt động
      </h1>
      <div className='w-full flex justify-start items-center gap-4'>
        <Form
          form={form}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={handleFilter}
          autoComplete='off'
          layout='inline'
          className='mb-4 flex gap-4'
        >
          <Form.Item label='Tên hoạt động' name='name'>
            <Input />
          </Form.Item>
          <Form.Item label='Địa điểm' name='address'>
            <Input />
          </Form.Item>
          <Form.Item label='Bắt đầu - Kết thúc' name='date'>
            <RangePicker />
          </Form.Item>
          <Form.Item label='Thuộc tổ chức' name='orgainzer'>
            <Select placeholder='select one orgainzer' optionLabelProp='label' options={organizers} />
          </Form.Item>
          <Form.Item label='Kỹ năng' name='skills' className='w-1/2'>
            <Select mode='multiple' placeholder='select multiple skills' optionLabelProp='label' options={skills} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit'>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
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
      <div>
        <h1>Danh sách hoạt động full</h1>
        <ListActivityFull></ListActivityFull>
      </div>
    </React.Fragment>
  )
}

export default ActivityPage
