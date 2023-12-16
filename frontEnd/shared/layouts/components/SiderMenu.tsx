import { IDataMenu } from '@/typeDefs/route.type'
import { AuditOutlined, CalendarOutlined, ClusterOutlined, HomeOutlined, LockOutlined, MonitorOutlined, PullRequestOutlined, StarOutlined, UserAddOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps, Typography, theme } from 'antd'
import { useRouter } from 'next/router'
import user from 'pages/admin/user'
import React, { useState } from 'react'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem({
  label,
  key,
  icon,
  children
}: {
  label: React.ReactNode
  key: React.Key
  icon?: React.ReactNode
  children?: MenuItem[]
}): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const SiderMenu = () => {
  const { token } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const menu = [
    {
      key: '/',
      label: 'Trang chủ',
      icon: <HomeOutlined />
    },
    {
      key: '/admin',
      icon: <AuditOutlined />,
      label: 'Quản trị viên',
      children: [
        {
          key: '/admin/user',
          icon: <UserAddOutlined />,
          label: 'Quản lý tài khoản'
        },
        {
          key: '/admin/activity',
          icon: <CalendarOutlined />,
          label: 'Quản lý hoạt động'
        },
        {
          key: '/admin/feedback',
          icon: <StarOutlined />,
          label: 'Quản lý đánh giá'
        },
        {
          key: '/admin/skill',
          icon: <MonitorOutlined />,
          label: 'Quản lý kỹ năng'
        },
        {
          key: '/admin/organization',
          icon: <ClusterOutlined />,
          label: 'Quản lý ban tổ chức'
        },
        {
          key: '/admin/request-organization',
          icon: <PullRequestOutlined />,
          label: 'Quản lý yêu cầu/ban tổ chức'
        },
        {
          key: '/admin/faq',
          icon: <MonitorOutlined />,
          label: 'Quản lý FAQ'
        }
      ]
    }
  ]
  return (
    <Sider
      style={{ backgroundColor: token.colorBgBase }}
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      width={250}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 32,
          margin: 16,
          background: token.colorBgBase,
          borderRadius: 5,
          cursor: 'pointer'
        }}
        onClick={() => router.push('/')}
      >
        {collapsed ? (
          <img style={{ maxWidth: 32, maxHeight: 32 }} alt='logo' src='/logo.png' />
        ) : (
          <>
            <Typography>Activity Management</Typography>
            <img style={{ maxWidth: 32, maxHeight: 32 }} alt='logo' src='/logo.png' />
          </>
        )}
      </div>
      <Menu
        style={{ backgroundColor: token.colorBgBase }}
        defaultSelectedKeys={[router.pathname]}
        mode='inline'
        items={menu}
        onClick={menu => {
          router.push(menu.key)
        }}
      />
    </Sider>
  )
}

export default SiderMenu
