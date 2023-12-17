import React from 'react'
import ImageSection_AboutUs1 from '../images/ImageSection_AboutUs1'

const Section_AboutUs1 = () => {
  return (
    <React.Fragment>
      <div className='w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-24'>
          <div className='flex flex-col justify-start items-start'>
            <h1 className='flex flex-col gap-10 mb-5 text-6xl leading-8 text-bold text-[#0F147F]'>
              What's mean<span>HUST Volunteer ?</span>
            </h1>
            <p className='text-xl'>Một nền tảng.....</p>
          </div>
          <ImageSection_AboutUs1 className='w-full' />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Section_AboutUs1
