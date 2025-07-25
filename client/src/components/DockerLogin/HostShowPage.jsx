import React from 'react'
import { FaUserDoctor } from "react-icons/fa6";

const HostShowPage = () => {
  return (
    <div className='flex justify-center items-center w-full py-12 px-4 sm:px-6 lg:px-8'>
      <div className='flex gap-2 p-4 sm:p-5 bg-blue-200 rounded-lg justify-center items-center cursor-pointer hover:bg-blue-300 max-w-md w-full shadow-md transition duration-200 ease-in-out'>
        <FaUserDoctor className='text-blue-600 text-xl sm:text-2xl' />
        <p className='text-[16px] sm:text-[18px] text-black font-medium text-center break-words'>
          Dr. Kiran Rathod
        </p>
      </div>
    </div>
  )
}

export default HostShowPage;
