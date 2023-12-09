import _ from 'lodash';
import { useAppSelector } from '@/hooks/useRedux'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Button, Card, Col, notification, Row } from 'antd'
import React, { useState } from 'react'
import { NextPageWithLayout } from './_app'
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
import usePagination from '@/hooks/usePagination'
import { useMutation, useQuery } from 'react-query'
import { dataDynamicService } from '@/services/data.service'
import useTrans from '@/hooks/useTrans';
import Head from 'next/head';
import useFetchNotify from '@/hooks/useFetchNotify';

type Props = {}

const Home: NextPageWithLayout = ({ }: Props) => {
  const user = useAppSelector(state => state.appSlice.user)
  const { trans } = useTrans()
  // const { dataFailedLength, dataSuccessedLength } = useFetchNotify()
  // const COLORS = ['#FC2947', '#00C49F'];
  // const data = [
  //   { name: 'Jan', active: dataSuccessedLength, error: dataFailedLength },
  //   { name: 'Feb', active: dataSuccessedLength, error: dataFailedLength },
  //   { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  //   { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  //   { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  //   { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  //   { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  //   { name: 'Aug', uv: 3000, pv: 1398, amt: 2210 },
  //   { name: 'Sep', uv: 2000, pv: 9800, amt: 2290 },
  //   { name: 'Oct', uv: 2780, pv: 3908, amt: 2000 },
  //   { name: 'Nov', uv: 1890, pv: 4800, amt: 2181 },
  //   { name: 'Dec', uv: 2390, pv: 3800, amt: 2500 },
  // ];
  // const dataCircle = [
  //   { name: 'Data Failed', value: dataFailedLength },
  //   { name: 'Data Successed', value: dataSuccessedLength },
  // ];

  return (
    <>
      <Head>
        <title>{trans.page.dashboard.pageTitle}</title>
      </Head>
      <Card style={{ marginBottom: 100 }} title={`${trans.page.dashboard.headTitle} ${user?.userName}`}>
        {/* <Row>
            <Col span={12}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataCircle}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataCircle.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Label
                      value="Data"
                      position="center"
                      fontSize={20}
                      fontWeight="bold"
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Col>
            <Col span={12}>
              <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#00C49F" />
                <Bar dataKey="error" fill="#FC2947" />
              </BarChart>
            </Col>
          </Row> */}
      </Card>
      {/* } */}
    </>
  )
}
Home.getLayout = (children) => <DashboardLayout>{children}</DashboardLayout>
export default Home