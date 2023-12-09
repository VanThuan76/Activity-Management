// ** Next,React Imports
import { useRouter } from 'next/router'
import { NextShield } from 'next-shield'
import { ReactNode, useContext } from 'react'

// ** Types Imports
import { useQuery } from 'react-query'
import { useAppSelector } from '@/hooks/useRedux'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
  children: ReactNode
}
export function Shield({ children }: Props) {
  const { isAuth, privateRoute } = useAppSelector(state => state.appSlice)
  const router = useRouter()
  const shieldConfig = {
    router,
    isAuth: isAuth,
    isLoading: false,
    LoadingComponent: <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin />
    </div>,
    privateRoutes: privateRoute,
    publicRoutes: ['/login'],
    loginRoute: '/login',
    accessRoute: "/"
  }

  return (
    <>
      <NextShield {...shieldConfig}>{children}</NextShield>
    </>
  )
}

