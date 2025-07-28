import React from 'react'
import Layout from './vaccinesSlotBokkingDetails/layout'
import ShowBooking from './vaccinesSlotBokkingDetails/ShowBooking'
import { Outlet } from 'react-router-dom'

const Appoinments = () => {
  return (
    <div >
      <div className=' flex p-2'>
        <h1 className='text-2xl p-2 bg-blue-400 font-bold mt-2 rounded-2xl text-white'>Appoinments</h1>
      </div>
      <div className='flex  justify-between mt-1 px-5'>
        
        <div>
         <Layout/>
        </div>
        <div>
          <ShowBooking />
        </div>
      </div>
    </div>
  )
}

export default Appoinments
