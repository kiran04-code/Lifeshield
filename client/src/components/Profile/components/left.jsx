import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg"
import { LuTicketCheck } from "react-icons/lu"
import { Link } from 'react-router-dom'

const Left = () => {
 const [hover,setHover] = useState("Personal Details")
    const account  =[
 {
    name:"Personal Details",
    icons:<CgProfile className='text-xl'/>,
    link:""
 },
 {
    name:"Vaccines Booking Slot",
    icons:<LuTicketCheck  className='text-xl'/>,
    link:"SlotInfo"
 },
 {
    name:"Meet Booking Detail",
    icons:<LuTicketCheck  className='text-xl'/>,
    link:"meetBooking"
 }

    ]
  return (
    <div className='flex flex-col h-full md:h-screen p-5'>
      {/* Title */}
      <h1 className='text-2xl font-bold mb-6 text-blue-700'>Account Center</h1>

      {/* Navigation Items */}
      <div className='flex md:flex-col gap-5 flex-row  overflow-x-scroll'>
        {
            account.map((data,index)=>(
                <Link to={`/profile/${data.link}`} onClick={()=>setHover(data.name)}  className={` ${hover === data.name ? "bg-[#8497be] text-white":null}    flex items-center gap-3  p-2 rounded-md cursor-pointer transition `}>
          {data.icons}
          <p className='text-md font-medium text-nowrap'>{data.name}</p>
        </Link>
            ))
        }
       
      </div>
    </div>
  )
}

export default Left
