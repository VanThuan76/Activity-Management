import React from 'react'
import { useQuery } from 'react-query'
import { Collapse } from 'antd'
import dayjs from 'dayjs'
import { feedbackService } from '@/services/feedback.service'
const { Panel } = Collapse

const FeedbackPage = () => {
  const { data: dataFeedback } = useQuery(['listFeedback'], () => feedbackService.getAllFeedbackNoAuth())
  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>Feedback</h1>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
        {dataFeedback &&
          dataFeedback.data.data &&
          dataFeedback.data.data.feedbacks.map(feedback => (
            <Collapse key={feedback.id} collapsible='icon' defaultActiveKey={['1']}>
              <Panel header={feedback.title} key='1'>
                <p>{feedback.content}</p>
                <p>Cập nhật lúc: {dayjs(feedback.updated_at).format('DD/MM/YYYY')}</p>
              </Panel>
            </Collapse>
          ))}
      </div>
    </React.Fragment>
  )
}

export default FeedbackPage
