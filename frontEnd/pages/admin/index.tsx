import DashboardLayout from '@/layouts/DashboardLayout'
import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import { useQuery } from 'react-query';
import { userService } from '@/services/user.service';

const AdminChart = () => {
  const { data: dataUser, refetch } = useQuery(['listUser'], () => userService.getAllUser())
  const data = {
    labels: ['Số lượng TNV', 'Số lượng tổ chức'],
    datasets: [
      {
        label: 'Thống kê',
        data: [dataUser?.data.data.users.filter(user => user.role_id === 1).length, dataUser?.data.data.users.filter(user => user.role_id === 2).length],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  return (
    <div>
      <h2>Dashboard Admin</h2>
      <Bar data={data} options={options} />
    </div>
  )
}
AdminChart.getLayout = (children: React.ReactNode) => <DashboardLayout>{children}</DashboardLayout>
export default AdminChart
