import { Carousel } from 'antd'
import React from 'react'

const Section_Home2 = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }
  return (
    <React.Fragment>
      <div className='w-full grid grid-cols-1 justify-center items-center gap-5'>
        <h1 className='flex flex-col justify-center items-center gap-5 mb-5 text-4xl leading-8 text-bold text-[#0F147F]'>
          Sinh viên tình nguyện
          <span>Đại học Bách Khoa Hà Nội</span>
        </h1>
        <Carousel afterChange={onChange}>
          <div className='max-w-[1980px] max-h-[700px] relative overflow-hidden'>
            <img
              className='w-full h-full object-cover object-center rounded-lg'
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[700px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  )
}

export default Section_Home2
