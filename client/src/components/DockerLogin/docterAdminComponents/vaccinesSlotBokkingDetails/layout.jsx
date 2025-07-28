import React from 'react'
import { Outlet } from 'react-router-dom'
import AddBokking from './Components/AddBokking'

const Layout = () => {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">
  Add Available Time Slots for Patient Booking Vaccinatioin slot
</h1>

      <div>
       <AddBokking/>
      </div>
    </div>
  )
}

export default Layout
