import { Button, Card, DatePicker, Form, Input, Select, SelectProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import BlankLayout from '@/layouts/BlankLayout'
import { useForm } from 'antd/lib/form/Form'
import { useDispatch } from 'react-redux'
import { setInforOrganization } from '@/store/appSlice'
import { userService } from '@/services/user.service'
import { useAppSelector } from '@/hooks/useRedux'
import { skillService } from '@/services/skill.service'
import { IUser } from '@/typeDefs/schema/user.type'
import { organizationService } from '@/services/organization.service'
import dayjs from 'dayjs'
import InputUpload from '@/components/common/UploadInput'
type Props = {
  next: any
}
const Profile = ({ next }: Props) => {
  const [form] = useForm()
  const { user } = useAppSelector(state => state.appSlice)
  const { data } = useQuery(['userDetail'], () => userService.getUserByAuth())
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.avatar)
  const [belongsOrgainzer, setBelongsOrgainzer] = useState<number | undefined>(
    data?.data.data.belongsOrgainzer.organization_id
  )
  const dispatch = useDispatch()
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

  const updateProfile = useMutation({
    mutationKey: 'updateProfile',
    mutationFn: (body: IUser) => userService.updateProfile(body),
    onSuccess(data, _variables, _context) {
      if (data.data.data) {
        dispatch(setInforOrganization(data.data.data))
        message.success('Tạo thành công')
      }
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công')
    }
  })
  //Handle submit form Login
  function handleCreate(value: IUser) {
    updateProfile.mutate(value)
    next()
  }
  useEffect(() => {
    if (user && data) {
      setBelongsOrgainzer(data.data.data.belongsOrgainzer.organization_id)
      form.setFieldsValue({
        // @ts-ignore
        ...data.data.data.user
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
  const handleAvatarChange = (newAvatarUrl: string) => {
    const updatedAvatarUrl = newAvatarUrl || ''
    setAvatarUrl(updatedAvatarUrl)
    // Kiểm tra nếu formData tồn tại, thì cập nhật avatar trong formData
    if (user && data) {
      form.setFieldsValue({
        // @ts-ignore
        ...data.data.data.user,
        avatar: updatedAvatarUrl
      })
    }
  }
  return (
    <React.Fragment>
      <Card
        title='Thông tin cá nhân'
        style={{ minWidth: 700 }}
        extra={<img style={{ maxWidth: 100, maxHeight: 100 }} alt='logo' src='/logo.svg' />}
      >
        <Form
          form={form}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={handleCreate}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item label='Avatar' name='avatar'>
            <InputUpload initSrc={avatarUrl} onChange={handleAvatarChange} />
          </Form.Item>
          <Form.Item label='Tên' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input />
          </Form.Item>

          <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Số điện thoại'
            name='description'
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Giới tính' name='gender' rules={[{ required: true, message: 'Chưa điền giới tính' }]}>
            <Select placeholder='select one gender' defaultValue={['']} optionLabelProp='label' options={options} />
          </Form.Item>

          <Form.Item
            label='Ngày sinh'
            name='birthday'
            rules={[{ required: true, message: 'Chưa điền ngày sinh' }]}
            getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
            getValueProps={i => ({ value: dayjs(i) })}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Chưa điền địa chỉ' }]}>
            <Input />
          </Form.Item>

          <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label='Kỹ năng' name='skills' rules={[{ required: true, message: 'Chưa điền kỹ năng' }]}>
            <Select mode='multiple' placeholder='select one skills' optionLabelProp='label' options={skills} />
          </Form.Item>

          <Form.Item
            label='Thuộc tổ chức'
            name='belongsOrgainzer'
            rules={[{ required: true, message: 'Chưa điền tổ chức' }]}
          >
            {belongsOrgainzer && (
              <Select
                defaultValue={belongsOrgainzer}
                placeholder='select one belongsOrgainzer'
                optionLabelProp='label'
                options={organizers}
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit' loading={updateProfile.isLoading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  )
}
Profile.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>
export default Profile
