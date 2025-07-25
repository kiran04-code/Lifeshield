import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sider from './docterAdminComponents/Sider'
const DashBoad = () => {
  const {id} = useParams()
  return (
    <div className='flex'>
     <div className=''>
       <Sider/>
     </div>
    <div className='w-full h-screen'>
          <Outlet/>
    </div>
    </div>
  )
}

export default DashBoad
