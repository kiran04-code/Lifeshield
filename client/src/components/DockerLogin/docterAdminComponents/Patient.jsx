import React from 'react'
import Layout from './meetingSlotBookDetails/LayoutMeeting'
import ShowBookingDataMeeting from './meetingSlotBookDetails/ShowBookingDataMeetingdata'

const Patient = () => {
  return (
   <div >
      <div className=' flex p-2'>
        <h1 className='text-2xl p-2 bg-blue-400 font-bold mt-2 rounded-2xl text-white'> Meeting Appointments</h1>
      </div>
      <div className='flex  justify-between mt-1 px-5'>
        
        <div>
         <Layout/>
        </div>
        <div>
          <ShowBookingDataMeeting />
        </div>
      </div>
    </div>
  )
}

export default Patient
