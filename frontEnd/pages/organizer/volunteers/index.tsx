import { Col, Image, Row, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { ColumnType } from 'antd/lib/table'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useQuery } from 'react-query'
import React from 'react'
import { volunteerService } from '@/services/volunteer.service'
import { IRequestVolunteer } from '@/typeDefs/schema/volunteer.type'
import { useAppSelector } from '@/hooks/useRedux'

type Props = {}

const VolunteersManagement = ({}: Props) => {
  const { user } = useAppSelector(state => state.appSlice)
  const { data: dataVolunteer, refetch } = useQuery(['listVolunteer'], () =>
    volunteerService.getVolunteerGroupOrganizer()
  )
  const columns: ColumnType<IRequestVolunteer>[] = [
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
      title: 'Tên tình nguyện viên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ảnh đại diện',
      key: 'avatar',
      render: (_, record) => (
        <>
          <Image src={record.avatar} width={50} height={50} className='rounded-lg' />
        </>
      )
    },
    {
      title: 'Hoạt động đăng ký',
      dataIndex: 'activity_id',
      render: (_, record) => (
        <div className='flex flex-col flex-wrap justify-start items-start gap-3'>
          {record.volunteersApplied
            ?.filter(activity => activity.organizer === user?.id)
            .map(activity => (
              <p>{activity.name}</p>
            ))}
        </div>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <>{record.status === 0 ? 'Phê duyệt' : record.status === 1 ? 'Chưa phê duyệt' : 'Không phê duyệt'}</>
      )
    }
  ]

  return (
    <>
      {dataVolunteer && dataVolunteer.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý tình nguyện viên</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-between items-center gap-3'>
                <Search className='bg-blue-300 rounded-lg' placeholder='Tìm kiếm' onSearch={() => {}} enterButton />
              </div>
            </Col>
          </Row>
          <Table dataSource={dataVolunteer.data.data as any} columns={columns} />
        </React.Fragment>
      )}
    </>
  )
}
VolunteersManagement.getLayout = (children: React.ReactNode) => <DashboardLayout>{children}</DashboardLayout>
export default VolunteersManagement
