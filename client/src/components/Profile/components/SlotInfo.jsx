import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth'

const SlotInfo = () => {
  const [dataBooked,setBookData] = useState([])
  const [loader,setloader] = useState(false)
  const {axios} = useAuth()
  const getBookedData = async()=>{
    setloader(false)
    const {data} = await axios.get("findBookedSlot")
    setBookData(data.bookedData)
    setloader(true)
  }
  useEffect(()=>{
 getBookedData()
  },[dataBooked])
  return (
   <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gray-50">
  <div className="w-full overflow-x-auto">
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-4 rounded-md shadow-sm">
  <p className="font-semibold mb-1">Important Note:</p>
  <ul className="list-disc pl-5 text-sm space-y-1">
    <li>
      <span className="text-red-600 font-medium">Red mark</span> indicates your appointment is still  <span className="font-semibold">pending. OR Rejected</span>
    </li>
    <li>
      <span className="text-green-600 font-medium">Green mark</span> means your <span className="font-semibold">appointment is registered successfully.</span>
    </li>
    <li>Please allow <span className="font-semibold">5 to 10 minutes</span> for your request to be approved.</li>
    <li>Once approved, <span className="font-semibold">please refresh</span> the page to see the updated status.</li>
  </ul>
</div>

    <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
      <thead>
        <tr className="bg-[#8497BE] text-white text-[12px] whitespace-nowrap">
          <th className="py-3 px-4 text-left">Sr No.</th>
          <th className="py-3 px-4 text-left">Hospital Name</th>
          <th className="py-3 px-4 text-left">Booking Time</th>
          <th className="py-3 px-4 text-left">Vaccine</th>
          <th className="py-3 px-4 text-left">Address</th>
          <th className="py-3 px-4 text-left">Hotspital Number</th>
          <th className="py-3 px-4 text-left">Action</th>
          <th className="py-3 px-4 text-left">Print</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(dataBooked) && dataBooked.length > 0 ? (
          dataBooked.map((booking, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-blue-50 transition">
              <td className="py-3 px-4 text-[12px]">{index + 1}</td>
              <td className="py-3 px-4 text-[12px]">{booking.Hname}</td>
              <td className="py-3 px-4 text-[12px]">{booking.SlotTime} PM</td>
              <td className="py-3 px-4 text-[12px]">{booking.Vname}</td>
              <td className="py-3 px-4 text-[12px]">{booking.hostId?.location || "N/A"}</td>
              <td className="py-3 px-4 text-[12px]">{booking.hostId?.Number || "N/A"}</td>
              <td><button className={`text-[10px]  ${booking.status === "Rejected" ? "bg-red-500":"bg-green-500"}  p-2 rounded-2xl text-white`}>{booking.status}</button></td>
              <td className="py-3 px-4">
                <button
                  onClick={() => window.print()}
                  className="bg-green-600 text-white text-[12px] px-3 py-1 rounded-md hover:bg-   green-700 transition"
                >
                  Print Appointment #{index + 1}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-gray-500">
              No bookings found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default SlotInfo
