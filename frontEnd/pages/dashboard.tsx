import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { useQuery } from 'react-query'
import { activityService } from '@/services/activity.service'
import BlankLayout from '@/layouts/BlankLayout'

const VolunteerChart = () => {
  const { data: dataApplyActivity, refetch } = useQuery(['listApplyActivityByVolunteer'], () =>
    activityService.listApplyActivity()
  )

  const appliedVolunteers = dataApplyActivity?.data.data.appliedVolunteers || []

  const data = {
    labels: ['Đăng ký', 'Phê duyệt', 'Không phê duyệt', 'Đã tham gia', 'Không tham gia'],
    datasets: [
      {
        label: 'Thống kê',
        data: [
          appliedVolunteers.filter(item => item.status === 0).length,
          appliedVolunteers.filter(item => item.status === 1).length,
          appliedVolunteers.filter(item => item.status === 2).length,
          appliedVolunteers.filter(item => item.status === 3).length,
          appliedVolunteers.filter(item => item.status === 4).length
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || ''
            const value = context.parsed.y || 0
            return `${label}: ${value} - ${getTextForStatus(context.dataIndex)}`
          }
        }
      }
    }
  }

  const getTextForStatus = (statusIndex: number) => {
    const statusNames = appliedVolunteers.reduce(
      (acc: any, item: any) => {
        switch (item.status) {
          case 0:
            acc[0].push(item.name)
            break
          case 1:
            acc[1].push(item.name)
            break
          case 2:
            acc[2].push(item.name)
            break
          case 3:
            acc[3].push(item.name)
            break
          case 4:
            acc[4].push(item.name)
            break
          default:
            break
        }
        return acc
      },
      [[], [], [], [], []]
    )

    return statusNames[statusIndex].join(', ') || ''
  }

  return (
    <div className='w-full'>
      <h2>Dashboard TNV</h2>
      {/* @ts-ignore */}
      <Bar data={data} options={options} />
    </div>
  )
}

VolunteerChart.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>
export default VolunteerChart
