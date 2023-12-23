import { Col, Image, Row, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { ColumnType } from 'antd/lib/table'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useQuery } from 'react-query'
import React from 'react'
import { volunteerService } from '@/services/volunteer.service'
import { IVolunteerGroupOrganizer } from '@/typeDefs/schema/volunteer.type'

type Props = {}

const VolunteersManagement = ({}: Props) => {
  const { data: dataVolunteer, refetch } = useQuery(['listVolunteer'], () =>
    volunteerService.getVolunteerGroupOrganizer()
  )
  const columns: ColumnType<IVolunteerGroupOrganizer>[] = [
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
