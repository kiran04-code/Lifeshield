
import React from 'react'
import { useState } from 'react'
import { useDocAuth } from '../../../../../context/dockAuth'
import { toast } from 'react-toastify'
import { FaRupeeSign } from "react-icons/fa";
const AddBokking = () => {
  const [add, setadd] = useState("New")
  const [time, setTime] = useState('')
  const [price, setPrice] = useState()
  const { axios, hostpitaldataworkspace, hotdataauth } = useDocAuth()
  
  const handleSendpackageData = async (e) => {
    e.preventDefault()
    const tim = `${time} min`
    try {
      const { data } = await axios.post("/createPackage", { price: price, time: tim })
      if (data.success) {
        toast.success(data.message)
        hotdataauth()
        setadd("ok")
      }
    } catch (error) {
      console.log(error)
    }

  }
  const handleDeletePackage = async (id) => {
  
    try {
      const { data } = await axios.post("/deletePackage",{ids:id})
      if (data.success) {
        toast.success(data.message)
        hotdataauth()
        setadd("ok")
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={`w-[280px]  ${add === "New" ? "justify-between" : null} flex flex-col bg-gray-100 shadow-xl rounded-lg border-blue-300 border p-4 space-y-4`}>
      <div className="flex items-center space-x-2 bg-blue-500 p-2 text-white rounded-2xl justify-evenly ">
        <button onClick={() => setadd("New")} className="bg-gray-100 text-blue-500 px-4 py-1 rounded-xl text-sm font-semibold  cursor-pointer  ">+ New</button>
        <button onClick={() => setadd("book")} className="bg-gray-100 py-1  text-sm text-blue-500 px-3 rounded-xl cursor-pointer">Your created package</button>
      </div>
      {
        add === "New" ? <div>
          <p className="text-sm text-gray-700 italic text-center mt-4">
            💙 Your time saves lives. Price it with care, touch every heart. 🩺
          </p>

          <form onSubmit={handleSendpackageData} className='flex flex-col'>
            <div className="w-full space-y-2 flex-col flex">
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800">Create Packages</h2>

              {/* Time Inputs */}
              <div className="flex  flex-col gap-2 justify-center items-center">
                {/* From Time */}
                <div className="flex flex-col ml-2">
                  <label > Time for Meeting</label>
                  <div className='flex justify-between items-center gap-2'>
                    <input
                      type="tel"
                      onChange={(e) => setTime(e.target.value)}
                      name="time"
                      value={time}
                      className="border rounded-md text-[15px] px-1 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p>Min</p>
                  </div>
                </div>
                <div className="flex flex-col  ">
                  <label > price for Meeting in Rupees</label>
                  <div className='flex justify-center items-center gap-2'>
                    <input
                      type="tel"
                      onChange={(e) => setPrice(e.target.value)}
                      name="price"
                      value={price}
                      className="border text-[15px] px-1  rounded-md py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaRupeeSign />
                  </div>

                </div>
              </div>
            </div>

            <button type='submit' className=" w-full mt-4 bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer">
              Add Time
            </button>

          </form> </div> : <div className="w-full space-y-2">
          {/* Title */}
          <h2 className="text-[13px] font-semibold text-gray-800 cursor-pointer">Your created package </h2>

          {/* Slot display (dynamic or placeholder) */}
          <div className="flex flex-wrap gap-3 bg-blue-500 px-4 py-3 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-3 bg-blue-500 px-4 py-3 rounded-lg shadow-md">
              {
                hostpitaldataworkspace?.MeetingAvialbleTimeandpakcage.map((data, index) => (
                  <div key={index} className="bg-white text-blue-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm flex items-center gap-2">
                    <span>⏱ {data.time} • ₹{data.price}</span>
                    <button
                      onClick={() => handleDeletePackage(data._id)}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold"
                      title="Delete Package"
                    >
                      ✖
                    </button>
                  </div>
                ))
              }
            </div>

          </div>

        </div>

      }
    </div>

  )
}

export default AddBokking
