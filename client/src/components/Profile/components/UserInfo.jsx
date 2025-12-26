import React from 'react'
import { useAuth } from '../../../context/auth'
import ageFinder from '../../../lib/ageCalculator'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa'

const UserInfo = () => {
    const { User, setUser, axios } = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const { data } = await axios.get("/logout")
            if (data.success) {
                toast.success(data.message)
                setUser(null)
                navigate("/parent")
            } else {
                toast.error("Issue to Logout!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full animate-in fade-in duration-500'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100'>
                <div className='flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left'>
                    <div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex justify-center items-center text-4xl font-bold shadow-lg shadow-blue-200 ring-4 ring-white'>
                        {User?.fullName?.substring(0, 1).toUpperCase()}
                    </div>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight'>{User?.fullName}</h1>
                        <p className='text-blue-600 font-medium flex items-center justify-center sm:justify-start gap-2'>
                            <FaEnvelope className="text-xs" /> {User?.email}
                        </p>
                    </div>
                </div>
                
                <button 
                    onClick={logout} 
                    className='flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95 border border-red-100'
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className="space-y-6">
                    <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest">Account Details</h3>
                    <InfoBlock icon={<FaUser className="text-blue-500"/>} label="Full Name" value={User?.fullName} />
                    <InfoBlock icon={<FaEnvelope className="text-blue-500"/>} label="Email Address" value={User?.email} />
                </div>

                <div className="space-y-6">
                    <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest">Personal Details</h3>
                    <InfoBlock icon={<FaPhone className="text-green-500"/>} label="Phone Number" value={User?.Number || "Not Provided"} />
                    <div className="grid grid-cols-2 gap-4">
                        <InfoBlock icon={<FaBirthdayCake className="text-purple-500"/>} label="Birth Date" value={User?.date} />
                        <InfoBlock icon={<FaCalendarAlt className="text-orange-500"/>} label="Current Age" value={`${ageFinder(User?.date)} Years`} />
                    </div>
                </div>
            </div>

            <div className="mt-12 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
                <p className="text-gray-500 text-sm italic">
                    Contact support if you need to change your registered email or phone number.
                </p>
            </div>
        </div>
    )
}

const InfoBlock = ({ icon, label, value }) => (
    <div className='flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-50 shadow-sm hover:shadow-md transition-shadow'>
        <div className='mt-1 p-2 bg-gray-50 rounded-lg'>{icon}</div>
        <div>
            <label className='block text-xs font-bold text-gray-400 uppercase tracking-tight'>{label}</label>
            <p className='text-gray-800 font-semibold mt-0.5'>{value}</p>
        </div>
    </div>
)

export default UserInfo