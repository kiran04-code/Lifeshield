import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import { useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaLink, FaWallet, FaMapMarkerAlt, FaPhoneAlt, FaInfoCircle } from "react-icons/fa";

const MeetBooking = () => {
    const [dataBooked, setBookData] = useState([]);
    const [loader, setloader] = useState(false);
    const navigate = useNavigate();
    const { axios } = useAuth();

    const getBookedData = async () => {
        setloader(true);
        try {
            const { data } = await axios.get("/MeetBookingDtaa");
            setBookData(data.datas);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setloader(false);
        }
    };

    useEffect(() => {
        getBookedData();
    }, []); // Empty dependency array prevents infinite loop

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaCalendarCheck className="text-blue-600" />
                        My Consultations
                    </h1>
                    
                    {/* Info Alert Box */}
                    <div className="mt-4 flex items-start gap-3 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-800 leading-relaxed">
                            After booking your slot, no further action is needed — the doctor’s team will contact you. 
                            The <strong>meeting link</strong> will appear here shortly before your session.
                        </p>
                    </div>
                </div>

                {/* Data Table (Hidden on Mobile) */}
                <div className="hidden lg:block overflow-hidden bg-white shadow-sm border border-gray-200 rounded-2xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {["Hospital", "Duration", "Payment", "Contact Info", "Amount", "Action"].map((header) => (
                                    <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {dataBooked.length > 0 ? (
                                dataBooked.map((booking, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{booking.hospitalId?.hospitalName}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <FaMapMarkerAlt size={10} /> {booking.hospitalId?.location || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                            {booking.duration}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.payment ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-gray-600 flex items-center gap-1">
                                                <FaPhoneAlt size={10} /> {booking.hospitalId?.Number}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            ₹{booking.paymentmoney}
                                        </td>
                                        <td className="px-6 py-4">
                                            <ActionBtn booking={booking} navigate={navigate} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className="py-20 text-center text-gray-400">No appointments found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Card Layout (Visible only on Mobile) */}
                <div className="lg:hidden space-y-4">
                    {dataBooked.map((booking, index) => (
                        <div key={index} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">{booking.hospitalId?.hospitalName}</h3>
                                    <p className="text-xs text-gray-500">{booking.hospitalId?.location}</p>
                                </div>
                                <span className="text-blue-600 font-bold text-sm">₹{booking.paymentmoney}</span>
                            </div>
                            
                            <div className="flex items-center justify-between py-2 border-y border-gray-50">
                                <span className="text-xs text-gray-500 italic">Duration: {booking.duration}</span>
                                {booking.payment && (
                                    <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                                        <FaWallet size={12} /> Paid
                                    </span>
                                )}
                            </div>

                            <ActionBtn booking={booking} navigate={navigate} fullWidth />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Sub-component for the Action Button to keep code clean
const ActionBtn = ({ booking, navigate, fullWidth }) => {
    const baseStyle = `${fullWidth ? 'w-full' : ''} px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2`;
    
    if (booking.MeetId === "false") {
        return (
            <div className={`${baseStyle} bg-orange-50 text-orange-600 border border-orange-100 cursor-default`}>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Joining Soon
            </div>
        );
    }
    
    if (booking.MeetId === "complete") {
        return (
            <div className={`${baseStyle} bg-gray-100 text-gray-500 cursor-default`}>
                Completed
            </div>
        );
    }
    
    return (
        <button
            onClick={() => navigate(`/Room/${booking.MeetId}`)}
            className={`${baseStyle} bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100 active:scale-95`}
        >
            <FaLink size={14} /> Join Meeting
        </button>
    );
};

export default MeetBooking;