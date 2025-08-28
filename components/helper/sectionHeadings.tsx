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
  <p className="text-sm sm:text-lg font-work-sans mt-2 text-gray-700 dark:text-gray-300">
    {description}
  </p>
</div>

  )
}

export default SectionHeadings
