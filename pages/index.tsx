import _ from 'lodash'
import { useAppSelector } from '@/hooks/useRedux'
import { Button, Card, Col, Image, notification, Row } from 'antd'
import React, { Fragment } from 'react'
import { NextPageWithLayout } from './_app'
import useTrans from '@/hooks/useTrans'
import Head from 'next/head'
import BlankLayout from '@/layouts/BlankLayout'

type Props = {}

const Home: NextPageWithLayout = ({}: Props) => {
  const user = useAppSelector(state => state.appSlice.user)
  const { trans } = useTrans()
  return (
    <Fragment>
      <Head>
        <title>{trans.page.dashboard.pageTitle}</title>
      </Head>
      <Image preview={false} className='w-full h-full' width={500} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
    </Fragment>
  )
}
Home.getLayout = children => <BlankLayout>{children}</BlankLayout>
export default Home
