import React from 'react'


type Props = {
    heading: string;
    description: string;
}
const SectionHeadings = ({heading, description}: Props) => {
  return (
    <div className="w-full p-5">
  <h1 className="text-xl sm:text-3xl font-bold text-blue-950 dark:text-blue-200">
    {heading}
  </h1>
  <p className="text-lg sm:text-lg font-work-sans mt-2 text-gray-900 dark:text-gray-100">
    {description}
  </p>
</div>

  )
}

export default SectionHeadings
