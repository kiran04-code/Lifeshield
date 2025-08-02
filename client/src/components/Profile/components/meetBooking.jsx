import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth'
import {useNavigate} from "react-router-dom"
const MeetBooking = () => {
    const [dataBooked, setBookData] = useState([])
    const [loader, setloader] = useState(false)
    const navigate = useNavigate()
    const { axios } = useAuth()
    const getBookedData = async () => {
        setloader(false)
        const { data } = await axios.get("/MeetBookingDtaa")
        setBookData(data.datas)
        setloader(true)
    }
    useEffect(() => {
        getBookedData()
    }, [dataBooked])
    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gray-50">
            <div className="w-full overflow-x-auto">
                <p className="text-sm text-blue-700 mt-2">
                    ✅ After booking your slot, no further action is needed — the doctor’s team will contact you and the meeting link will be available in your profile. Stay updated with Lifeshield.
                </p>


                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
                    <thead>
                        <tr className="bg-[#8497BE] text-white text-[12px] whitespace-nowrap">
                            <th className="py-3 px-4 text-left">Sr No.</th>
                            <th className="py-3 px-4 text-left">Hospital Name</th>
                            <th className="py-3 px-4 text-left">Meeting Duration</th>
                            <th className="py-3 px-4 text-left">payment</th>
                            <th className="py-3 px-4 text-left">Address</th>
                            <th className="py-3 px-4 text-left">Hotspital Number</th>
                            <th className="py-3 px-4 text-left">PayMoney</th>
                            <th className="py-3 px-4 text-left">MeetLink</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(dataBooked) && dataBooked.length > 0 ? (
                            dataBooked?.map((booking, index) => (
                                <tr key={index} className="border-t border-gray-200 hover:bg-blue-50 transition">
                                    <td className="py-3 px-4 text-[12px]">{index + 1}</td>
                                    <td className="py-3 px-4 text-[12px]">{booking.hospitalId.hospitalName}</td>
                                    <td className="py-3 px-4 text-[12px]">{booking.duration}</td>
                                    <td className="py-3 px-4 text-[12px]  "><p className='p-1 bg-green-400 text-nowrap  text-white rounded-xl'>{booking.payment ? "payment done" : null}</p></td>
                                    <td className="py-3 px-4 text-[12px]">{booking.hospitalId?.location || "N/A"}</td>
                                    <td className="py-3 px-4 text-[12px]">{booking.hospitalId?.Number || "N/A"}</td>
                                    <td><button className="text-[10px]">{booking.paymentmoney} rupees</button></td>
                                    <td className="py-3 px-4">
                                        {
                                            booking.MeetId === "false"? <span
                                            className="bg-green-600 text-white text-[12px] px-3 py-1 rounded-md text-nowrap transition"
                                        >
                                           Joining Soon
                                        </span>:<button
                                            onClick={() => navigate(`/Room/${booking.MeetId}`)}
                                            className="bg-green-600 text-white text-[12px] px-3 py-1 rounded-md hover:bg-green-700 transition"
                                        >
                                           Join
                                        </button>
                                        }
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

export default MeetBooking

