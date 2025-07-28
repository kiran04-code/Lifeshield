import React from 'react'

import ShowBooking from './components/ShowBookingMeeing'

const Layout = () => {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">
  Add Available Time Slots for online Meet cunsultancy
</h1>

      <div>
       <ShowBooking/>
      </div>
    </div>
  )
}

export default Layout
