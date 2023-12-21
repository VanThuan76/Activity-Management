import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Image, message, Popconfirm, Row, Space, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { ColumnType } from 'antd/lib/table'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useMutation, useQuery } from 'react-query'
import React, { useState } from 'react'
import { activityService } from '@/services/activity.service'
import { IActivity } from '@/typeDefs/schema/activity.type'
import FormActivity from './form'

type Props = {}

const ActivityManagement = ({}: Props) => {
  const [open, setOpen] = useState(false)
  const [action, setAtion] = useState<string>('')
  const [rowId, setRowId] = useState<number>()
  const { data: dataActivity, refetch } = useQuery(['listActivty'], () => activityService.getAllActivity())
  const deleteMutation = useMutation({
    mutationKey: ['deleteMutation'],
    mutationFn: (activityId: number) => activityService.deleteActivity(activityId),
    onSuccess: () => {
      message.success('Xoá thành công')
      refetch()
    },
    onError() {
      message.error('Xoá không thành công')
    }
  })
  const columns: ColumnType<IActivity>[] = [
    {
      title: '#',
      key: 'id',
      render: (value, record, index) => (
        <div>
          <p>{index}</p>
        </div>
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Số lượng tình nguyện viên',
      dataIndex: 'num_of_volunteers',
      key: 'num_of_volunteers'
    },
    {
      title: 'Feedbacks',
      key: 'feedback',
      render: (_, record) => (
        <div className='w-full flex flex-col justify-start items-start gap-3'>
          {record.feedback &&
            record.feedback.map(feedback => (
              <>
                <div className='w-full flex justify-between items-center'>
                  <Image src={feedback.avatar} width={50} height={50} className='rounded-lg' />
                  <p>{feedback.name}</p>
                </div>
                <p>Nội dung: {feedback.content}</p>
              </>
            ))}
        </div>
      )
    },
    {
      title: 'Hình ảnh',
      key: 'status',
      render: (_, record) => (
        <>
          <Image src={record.image} width={250} height={150} className='rounded-lg' />
        </>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => <p>{record.status === 0 ? 'Đang mở' : 'Đã đóng'}</p>
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <div
            className='cursor-pointer'
            onClick={() => {
              setAtion('edit')
              setOpen(true)
              setRowId(record.id)
            }}
          >
            <EditOutlined />
          </div>
        </Space>
      )
    }
  ]

  return (
    <>
      {dataActivity && dataActivity.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý hoạt động</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-between items-center gap-3'>
                <Search className='bg-blue-300 rounded-lg' placeholder='Tìm kiếm' onSearch={() => {}} enterButton />
                <Button
                  onClick={() => {
                    setAtion('create')
                    setRowId(NaN)
                    setOpen(true)
                  }}
                >
                  Tạo mới
                </Button>
              </div>
            </Col>
          </Row>
          <Table dataSource={dataActivity.data.data.activities} columns={columns} />
          {action === 'create' && !rowId ? (
            <FormActivity refetch={refetch} open={open} setOpen={setOpen} />
          ) : (
            <FormActivity refetch={refetch} editId={rowId} open={open} setOpen={setOpen} />
          )}
        </React.Fragment>
      )}
    </>
  )
}
ActivityManagement.getLayout = (children: React.ReactNode) => <DashboardLayout>{children}</DashboardLayout>
export default ActivityManagement
