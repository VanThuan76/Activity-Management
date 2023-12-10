import {
  BellOutlined,
  ShoppingCartOutlined,
  ContactsOutlined,
  QuestionCircleOutlined,
  ApartmentOutlined,
  ExpandAltOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Search from 'antd/lib/input/Search'

const { Header, Content, Footer } = Layout

function BlankLayout({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState('')
  const router = useRouter()
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    router.push(e.key)
  }
  const APP_WEBSITE_MENU: MenuProps['items'] = [
    {
      label: 'Hoạt động',
      key: 'activity',
      icon: <ContactsOutlined />
    },
    {
      label: 'Tổ chức',
      key: 'organization',
      icon: <ApartmentOutlined />
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
  return (
    <React.Fragment>
      <Header className='flex justify-between items-center bg-[#fff]'>
        <div className='text-2xl px-4'>Logo</div>
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
            <BellOutlined />
            <ShoppingCartOutlined />
            <Button>Login</Button>
          </div>
        </div>
      </Header>
      <Content className='w-full min-h-[100vh] flex justify-center items-center mx-auto p-20'>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </React.Fragment>
  )
}

export default BlankLayout
