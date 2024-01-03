import { useMutation, useQuery } from 'react-query'
import { Button, Form, Input, message, Modal, Row, Col, DatePicker, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react'
import { activityService } from '@/services/activity.service'
import { skillService } from '@/services/skill.service'
import InputUpload from '@/components/common/UploadInput'
import dayjs from 'dayjs'

interface Props {
  editId?: number
  open: any
  setOpen: any
  refetch: any
}
const status = [
  {
    lable: 'Đang mở',
    value: 0
  },
  {
    lable: 'Đã đóng',
    value: 1
  }
]
const FormActivity = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm()
  const [imageUrrl, setImageUrrl] = useState<string | undefined>()
  const isEditIdValidNumber = typeof editId === 'number'
  const { data } = useQuery(['activity'], () => activityService.getActivityById(editId as number), {
    enabled: isEditIdValidNumber
  })
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
  const [skillsDefault, setSkillsDefault] = useState<any[] | undefined>(
    data?.data.data.skillsActivity?.map(skill => ({
      label: skill.name,
      value: skill.id
    }))
  )
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
  useEffect(() => {
    if (editId && data) {
      setImageUrrl(data.data.data.image)
      setSkillsDefault(
        data.data.data.skillsActivity?.map(skill => ({
          label: skill.name,
          value: skill.id
        }))
      )
      form.setFieldsValue({
        ...data.data.data
      })
    }
  }, [data])
  const handleImageChange = (newAvatarUrl: string) => {
    const updatedImageUrl = newAvatarUrl || ''
    setImageUrrl(updatedImageUrl)
    // Kiểm tra nếu formData tồn tại, thì cập nhật avatar trong formData
    if (data) {
      form.setFieldsValue({
        // @ts-ignore
        ...data.data.data.user,
        image: updatedImageUrl
      })
    }
  }

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
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

        <Form.Item label='Địa điểm' name='location' rules={[{ required: true, message: 'Chưa điền địa điểm' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Hình ảnh' name='image'>
          <InputUpload initSrc={imageUrrl} onChange={handleImageChange} />
        </Form.Item>

        <Form.Item
          label='Từ ngày'
          name='from_at'
          rules={[{ required: true, message: 'Chưa điền từ ngày' }]}
          getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
          getValueProps={i => ({ value: dayjs(i) })}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label='Đến ngày'
          name='to_at'
          rules={[{ required: true, message: 'Chưa điền đến ngày' }]}
          getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
          getValueProps={i => ({ value: dayjs(i) })}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label='Số lượng TN tối đa'
          name='max_of_volunteers'
          rules={[{ required: true, message: 'Chưa điền số lượng TN tối đa' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item label='Trạng thái' name='status' rules={[{ required: true, message: 'Chưa điền trạng thái' }]}>
          <Select placeholder='select one status' optionLabelProp='label' options={status} />
        </Form.Item>

        <Form.Item label='Kỹ năng' name='skills' rules={[{ required: true, message: 'Chưa điền kỹ năng' }]}>
          <Select
            defaultValue={skillsDefault && skillsDefault}
            mode='multiple'
            placeholder='select one skills'
            optionLabelProp='label'
            options={skills}
          />
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
