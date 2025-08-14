import React from 'react'


type Props = {
    heading: string;
    description: string;
}
const SectionHeadings = ({heading, description}: Props) => {
  return (
    <div className='w-full p-5'>
      <h1 className='text-xl sm:text-3xl text-blue-950 font-bold'>{heading}</h1>
      <p className='text-sm sm:text-lg font-work-sans text-gray-700 mt-2'>{description}</p>
    </div>
  )
}

export default SectionHeadings
