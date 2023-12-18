import { useMutation, useQuery } from 'react-query'
import { Button, Form, Input, message, Modal, Row, Col, DatePicker, Select, SelectProps } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { activityService } from '@/services/activity.service'

interface Props {
  editId?: number
  open: any
  setOpen: any
  refetch: any
}
const FormActivity = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm()
  const isEditIdValidNumber = typeof editId === 'number'
  const newMutation = useMutation({
    mutationKey: 'NewActivity',
    mutationFn: (body: { name: string; description: string; location: string; skills: string[] }) =>
      activityService.newActivity(body),
    onSuccess(data, _variables, _context) {
      const res = data.data
      if (!res) return
      message.success('Tạo thành công')
      setOpen(false)
      refetch()
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công')
    }
  })
  const updateMutation = useMutation({
    mutationKey: 'update',
    mutationFn: (body: { name: string; description: string; location: string; skills: string[] }) =>
      activityService.updateActivity(editId as number, body),
    onSuccess(data, _variables, _context) {
      const res = data.data
      if (!res) return
      message.success('Cập nhật thành công')
      setOpen(false)
      refetch()
    },
    onError(error, variables, context) {
      message.error('Cập nhật không thành công')
    }
  })
  function handleNewActivity(value: any) {
    if (editId) {
      updateMutation.mutate(value)
    } else {
      newMutation.mutate(value)
    }
  }
  const { data } = useQuery(['activity'], () => activityService.getActivityById(editId as number), {
    enabled: isEditIdValidNumber
  })
  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue({
        ...data.data.data
      })
    }
  }, [data])
  const options: SelectProps['options'] = [
    {
      label: 'Nam',
      value: 0
    },
    {
      label: 'Nữ',
      value: 1
    }
  ]
  return (
    <Modal
      title={editId ? `Chỉnh sửa hoạt động` : 'Tạo hoạt động mới'}
      centered
      open={open}
      width={1000}
      footer={false}
    >
      <Form
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handleNewActivity}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item label='Tên hoạt động' name='name' rules={[{ required: true, message: 'Chưa điền tên hoạt động' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Chưa điền mô tả' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Địa điểm' name='location' rules={[{ required: true, message: 'Chưa điền địa điểm' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Giới tính' name='gender' rules={[{ required: true, message: 'Chưa điền giới tính' }]}>
          <Select placeholder='select one country' defaultValue={['']} optionLabelProp='label' options={options} />
        </Form.Item>

        <Row justify={'center'} align={'middle'} gutter={16}>
          <Col>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button onClick={() => setOpen(false)} htmlType='button'>
                Huỷ bỏ
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button htmlType='submit'>{editId ? 'Chỉnh sửa' : 'Tạo mới'}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default FormActivity
