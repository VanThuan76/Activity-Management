import React from 'react'
import { Collapse } from 'antd'
import dayjs from 'dayjs'
import { IFeedback } from '@/typeDefs/schema/feedback.type'
const { Panel } = Collapse

type Props = {
  faqs: IFeedback[] | undefined
}

const Section_Home5 = ({faqs}: Props) => {
  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>Feedback người dùng</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {faqs && faqs.map((faq) => (
          <Collapse key={faq.id} collapsible='icon' defaultActiveKey={['1']}>
            <Panel header={faq.title} key='1'>
              <p>{faq.content}</p>
              <p>Cập nhật lúc: {dayjs(faq.updated_at).format("DD/MM/YYYY")}</p>
            </Panel>
          </Collapse>
        ))}
      </div>
    </React.Fragment>
  )
}

export default Section_Home5
