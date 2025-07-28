
import React from 'react'
import { useState } from 'react'
import { useDocAuth } from '../../../../../context/dockAuth'
import { toast } from 'react-toastify'

const AddBokking = () => {
    const [add, setadd] = useState("New")
    const [from, setFrom] = useState('')
    const { axios, hostpitaldataworkspace } = useDocAuth()
    
   const handleonchnge = (e) => {
  const { id, value } = e.target; // value is "14:30" for example
  const [hour, minute] = value.split(":");
  let h = parseInt(hour, 10);
  console.log(h)
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const formattedTime = `${h}:${minute} ${ampm}`;

  setFrom({ ...from, [id]: formattedTime });
  console.log(from)
};

    const handleSendTotime = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/addtime", from)
            if (data.success) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`w-[280px] h-[300px] ${add === "New" ? "justify-between" : null} flex flex-col bg-gray-100 shadow-xl rounded-lg border-blue-300 border p-4 space-y-4`}>
            <div className="flex items-center space-x-2 bg-blue-500 p-2 text-white rounded-2xl justify-evenly ">
                <button onClick={() => setadd("New")} className="bg-gray-100 text-blue-500 px-4 py-1 rounded-xl text-sm font-semibold  cursor-pointer  ">+ New</button>
                <button onClick={() => setadd("book")} className="bg-gray-100 py-1  text-sm text-blue-500 px-3 rounded-xl cursor-pointer">Your Booking Timing</button>
            </div>
            {
                add === "New" ? <div>
                    <form onSubmit={handleSendTotime}>
                        <div className="w-full space-y-2">
                            {/* Title */}
                            <h2 className="text-lg font-semibold text-gray-800">Set Booking Time Slot</h2>

                            {/* Time Inputs */}
                            <div className="flex items-center space-x-4">
                                {/* From Time */}
                                <div className="flex flex-col">
                                    <label htmlFor="fromTime" className="text-sm text-gray-600 mb-1">From</label>
                                    <input
                                        type="time"
                                        onChange={handleonchnge}
                                        id="fromTime"
                                        className="border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* To Time */}
                                <div className="flex flex-col">
                                    <label htmlFor="toTime" className="text-sm text-gray-600 mb-1">To</label>
                                    <input onChange={handleonchnge}
                                        type="time"
                                        id="toTime"
                                        className="border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type='submit' className=" w-full mt-4 bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer">
                            Add Time
                        </button>

                    </form> </div> : <div className="w-full space-y-2">
                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800 cursor-pointer">Your Booking Time</h2>

                    {/* Slot display (dynamic or placeholder) */}
                    <div className="flex bg-blue-500 items-center px-3 py-2 rounded-md">
                        <div className="text-sm text-white">{hostpitaldataworkspace.fromTime} To  {hostpitaldataworkspace.toTime}</div> {/* Replace with dynamic value */}
                    </div>
                </div>

            }
        </div>

    )
}

export default AddBokking
