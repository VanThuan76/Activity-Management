import DashboardLayout from '@/layouts/DashboardLayout'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { useQuery } from 'react-query'
import { volunteerService } from '@/services/volunteer.service'
import { useAppSelector } from '@/hooks/useRedux'
import { activityService } from '@/services/activity.service'

const OrganizerChart = () => {
  const { user } = useAppSelector(state => state.appSlice)
  const { data: dataRequestVolunteers } = useQuery(['listRequestVolunteers'], () =>
    volunteerService.getAllRequestVolunteer()
  )
  const { data: dataVolunteer } = useQuery(['listVolunteer'], () =>
    volunteerService.getVolunteerGroupOrganizer()
  )
  const { data: dataActivity, refetch } = useQuery(['listActivty'], () => activityService.getAllActivity(), {
    select(data) {
      const filterActivity = data.data.data.activities.filter(activity => activity.creator_id === +user!.id)
      return filterActivity
    }
  })
  const data = {
    labels: ['Tổng số TNV', 'Tổng số hoạt động', 'Tổng số TNV đã đăng ký'],
    datasets: [
      {
        label: 'Thống kê',
        data: [dataVolunteer?.data.data.length, dataActivity?.length, dataRequestVolunteers?.data.data.requestVolunteers.filter(item => item.status === 0)],
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
      <h2>Dashboard Tổ chức</h2>
      <Bar data={data} options={options} />
    </div>
  )
}
OrganizerChart.getLayout = (children: React.ReactNode) => <DashboardLayout>{children}</DashboardLayout>
export default OrganizerChart
