import { APP_URL } from '@/constant/AppConstant'
import useTrans from '@/hooks/useTrans'
import { logout } from '@/store/appSlice'
import {
  BellOutlined,
  CodeSandboxOutlined,
  LogoutOutlined,
  NotificationOutlined,
  SearchOutlined,
  SettingOutlined
} from '@ant-design/icons/lib/icons'
import { Col, Dropdown, Input, MenuProps, Row, Switch } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { deleteCookie } from 'cookies-next'
import { US, VN } from 'country-flag-icons/react/3x2'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Appbar = () => {
  const router = useRouter()
  const { trans, lang, changeLanguage } = useTrans()
  const dispatch = useDispatch()
  const [isOpenModalLogout, setOpenModalLogout] = useState(false)
  const items: MenuProps['items'] = [
    {
      key: '2',
      label: <div>{trans.common.setting}</div>,
      icon: <SettingOutlined />,
      onClick: () => router.push(APP_URL.SETTINGS)
    },
    {
      key: '1',
      label: <div>{trans.common.logout}</div>,
      icon: <LogoutOutlined />,
      onClick: () => setOpenModalLogout(true)
    }
  ]
  // const notifyItems: MenuProps['items'] = testNotification.map(noti => ({
  //     key: noti?.requestID,
  //     label: noti?.type,
  //     type: "divider",
  //     onClick: () => { console.log(noti) }
  // }))
  const langDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: <div>{trans.page.setting.enLang}</div>,
      icon: <US title='United States' style={{ width: '24px', height: '24px' }} />,
      onClick: () => changeLanguage('en')
    },
    {
      key: '2',
      label: <div>{trans.page.setting.vnLang}</div>,
      icon: <VN title='VietNam' style={{ width: '24px', height: '24px' }} />,
      onClick: () => changeLanguage('vi')
    }
  ]
  const handleSearch = (value: string | number) => {
    console.log('search value:', value)
    // Perform search operation here
  }
  function handleLogout() {
    deleteCookie('keys')
    deleteCookie('sessionKey')
    deleteCookie('role')
    deleteCookie('timeExpired')
    dispatch(logout())
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }

  return (
    <Row gutter={32} justify='space-between' align='middle'>
      <Col flex='1' span='10'>
        <Input.Search
          style={{ display: 'flex', margin: '0 auto' }}
          placeholder={`${trans.common.search}...`}
          allowClear
          enterButton={<SearchOutlined />}
          size='large'
          onSearch={value => handleSearch(value)}
        />
      </Col>
      <Col flex='1' span='5'>
        <Row>
          <Col span={6}>
            <Dropdown>
              <div style={{ fontSize: '24px' }}>
                <BellOutlined />
              </div>
            </Dropdown>
          </Col>
          <Col span={6} className='flex items-center cursor-pointer'>
            <Dropdown menu={{ items: langDropdownItems }}>
              {lang === 'en' ? (
                <US title='United States' style={{ width: '24px', height: '24px' }} />
              ) : (
                <VN title='VietNam' style={{ width: '24px', height: '24px' }} />
              )}
            </Dropdown>
          </Col>
          <Col style={{ cursor: 'pointer' }} span={6}>
            <Dropdown menu={{ items }}>
              <div className='h-full text-2xl flex items-center justify-center'>
                <img
                  className='block mx-auto max-w-[32px] max-h-[32px] rounded-[50px]'
                  alt='userIcon'
                  src='/userIcon.png'
                />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Col>
      <Modal
        open={isOpenModalLogout}
        title='Bạn sắp đăng xuất?'
        onOk={handleLogout}
        onCancel={() => setOpenModalLogout(false)}
        okText='Đồng ý'
        cancelText='Hủy'
      ></Modal>
    </Row>
  )
}

export default React.memo(Appbar)
