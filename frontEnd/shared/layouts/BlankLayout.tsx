import {
  ContactsOutlined,
  QuestionCircleOutlined,
  ExpandAltOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Search from 'antd/lib/input/Search'
import { useAppSelector } from '@/hooks/useRedux'
import { deleteCookie, getCookie } from 'cookies-next'
import { APP_SAVE_KEYS } from '@/constant/AppConstant'
import { useDispatch } from 'react-redux'
import { login } from '@/store/appSlice'
import jwt_decode from 'jwt-decode'

const { Header, Content, Footer } = Layout

function BlankLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector(state => state.appSlice)
  const dispatch = useDispatch()
  const [current, setCurrent] = useState('')
  const router = useRouter()
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    window.location.href = `/${e.key}`
  }
  const handleLogout = () => {
    deleteCookie(APP_SAVE_KEYS.KEYS)
    deleteCookie(APP_SAVE_KEYS.ROLE)
    router.push("/login")
    window.location.reload();
  }
  const APP_WEBSITE_MENU: MenuProps['items'] = [
    {
      label: 'Hoạt động',
      key: 'activity',
      icon: <ContactsOutlined />
    },
    {
      label: 'Về chúng tôi',
      key: 'about-us',
      icon: <ExpandAltOutlined />
    },
    {
      label: 'FAQ',
      key: 'faq',
      icon: <QuestionCircleOutlined />
    }
  ]
  useEffect(() => {
    const key = getCookie(APP_SAVE_KEYS.KEYS)
    const role = getCookie(APP_SAVE_KEYS.ROLE)
    if (typeof key === 'string' && role) {
        const decodeData: any = jwt_decode(key)
        dispatch(login({ userName: decodeData.username, role: decodeData.role_id, id: decodeData.id }))
    }
}, [])

  return (
    <React.Fragment>
      <Header className='flex justify-between items-center bg-[#fff]'>
        <div className='text-2xl px-4 cursor-pointer'>
          <img width={100} onClick={() => router.push('/')} src='/logo.svg' />
        </div>
        <div className='w-full grid grid-cols-5 justify-start items-center gap-2'>
          <Menu
            className='col-span-2 border-none'
            theme='light'
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={APP_WEBSITE_MENU}
          />
          <Search
            className='col-span-2 bg-blue-300 rounded-lg'
            placeholder='Tìm kiếm'
            onSearch={() => {}}
            enterButton
          />
          <div className='flex justify-end items-center gap-4'>
            {user && <UserOutlined onClick={() => router.push('/profile')} />}
            {!user && <Button onClick={() => router.push('/login')}>Đăng nhập</Button>}
            {user && Number(user?.role) === 3 && <Button onClick={() => router.push('/admin/user')}>ADMIN</Button>}
            {user && Number(user?.role) === 2 && (
              <Button onClick={() => router.push('/organizer/activity')}>TỔ CHỨC</Button>
            )}
            {user && Number(user?.role) === 1 && (
              <Button onClick={() => router.push('/request_organization')}>Trở thành tổ chức</Button>
            )}
            {user && <Button onClick={() => handleLogout()}>Đăng xuất</Button>}
          </div>
        </div>
      </Header>
      <Content className='w-full min-h-[100vh] flex flex-col justify-center items-center mx-auto p-20'>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </React.Fragment>
  )
}

export default BlankLayout

