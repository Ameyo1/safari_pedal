import BookingForm from '@/components/booking/BookingForm';
import SectionHeadings from '@/components/helper/sectionHeadings';
import Section from '@/components/layout/Section'
import { fetchTourById } from '@/lib/data';
import React from 'react'

interface Props {
  params: { id?: string };
}
const Booking = async ({ params }: Props) => {

       
  return (
    <div>
         <Section bg="white">
        <SectionHeadings heading="Book This Tour" description="Please fill in the details below." />
        <BookingForm/>

      </Section> 
    </div>
  )
}

export default Booking