import React from 'react'
import Left from './components/left'
import { Outlet } from 'react-router-dom'

const ProfilePage = () => {
  return (
    <div className='flex flex-col md:flex-row md:gap-5 md:p-10 w-full min-h-screen bg-[#F9FAFB]'>
      {/* Left Sidebar */}
      <div className='bg-[#E0EAFF] md:w-1/4 w-full'>
        <Left />
      </div>

      {/* Right Content */}
      <div className='bg-[#E0EAFF] flex-1 p-5'>
        <div className='' >
            <div>
                <h1 className='text-2xl font-semibold text-blue-600'>Hello, Kiran</h1>
            </div>
        <div>
          <Outlet/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
