import { CheckOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Row, Space, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { ColumnType } from 'antd/lib/table'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useMutation, useQuery } from 'react-query'
import { userService } from '@/services/user.service'
import React from 'react'
import { organizationService } from '@/services/organization.service'
import { IRequestOrganization } from '@/typeDefs/schema/organization.type'

type Props = {}

const RequestOrganizationManagement = ({}: Props) => {
  const { data: dataRequestOrganization, refetch } = useQuery(['listRequestOrganization'], () =>
    organizationService.getAllRequestOrganization()
  )
  const updateMutation = useMutation({
    mutationKey: ['updateMutation'],
    mutationFn: (body: { organization_id: number; status: number }) =>
      organizationService.updateRequestOrganization(body),
    onSuccess: () => {
      message.success('Cập nhật thành công')
      refetch()
    },
    onError() {
      message.error('Cập nhật không thành công')
    }
  })
  const columns: ColumnType<IRequestOrganization>[] = [
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
      title: 'Tên người đăng ký',
      dataIndex: 'name',
      render: (_, record) => <p>{record.user.name}</p>
    },
    {
      title: 'Tên tổ chức',
      dataIndex: 'name_organizer',
      render: (_, record) => <p>{record.organizer.name}</p>
    },
    {
      title: 'Địa chỉ tổ chức',
      dataIndex: 'location_organizer',
      render: (_, record) => <p>{record.organizer.location}</p>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => (
        <p>{record.status === 0 ? 'Phê duyệt' : record.status === 1 ? 'Chưa phê duyệt' : 'Không phê duyệt'}</p>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Popconfirm
            okButtonProps={{ loading: updateMutation.isLoading }}
            onConfirm={() => {
              const body = {
                organization_id: record.id,
                status: record.status
              }
              updateMutation.mutate(body)
            }}
            title={'Phê duyệt'}
          >
            <CheckOutlined className='cursor-pointer'></CheckOutlined>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      {dataRequestOrganization && dataRequestOrganization.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý yêu cầu/ban tổ chức</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-between items-center gap-3'>
                <Search className='bg-blue-300 rounded-lg' placeholder='Tìm kiếm' onSearch={() => {}} enterButton />
              </div>
            </Col>
          </Row>
          <Table dataSource={dataRequestOrganization.data.data.requestOrganizations} columns={columns} />
        </React.Fragment>
      )}
    </>
  )
}
RequestOrganizationManagement.getLayout = (children: React.ReactNode) => <DashboardLayout>{children}</DashboardLayout>
export default RequestOrganizationManagement
