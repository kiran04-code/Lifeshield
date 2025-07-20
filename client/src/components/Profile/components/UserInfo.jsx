import React from 'react'
import { useAuth } from '../../../context/auth'
import ageFinder from '../../../lib/ageCalculator'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const UserInfo = () => {
   const { User,setUser,axios} = useAuth()
   const navigate = useNavigate()
   const logout = async(req,res)=>{
  try {
    const {data} = await axios.get("http://localhost:3010/api/logout")
    if(data.success){
      toast.success(data.message)
      setUser(null)
      navigate("/parent")
    }
    else{
      toast.error("Isuue to Logout!")
    }
  } catch (error) {
    console.log(error)
  }
   }
  return (
    <div className='w-full p-5'>
      {/* Profile Header */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-5 w-full'>
        <div className='flex items-center gap-4'>
          <div className='w-20 h-20 rounded-full bg-red-300'></div>
          <div>
            <h1 className='text-xl sm:text-2xl font-bold uppercase'>{User.fullName}</h1>
            <p className='text-sm text-gray-600'>{User.email}</p>
          </div>
        </div>
      </div>

      {/* Info Section 1 */}
      <div className='mt-8 w-full'>
        <div className='  p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Full Name</label>
            <input
              type='text'
              value={User.fullName}
              className='px-4 py-2 border border-gray-300 bg-white text-gray-700  '
              readOnly
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Email</label>
            <input
              type='email'
              value={User.email}
              className='px-4 py-2 border border-gray-300 bg-white text-gray-700  '
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Info Section 2 */}
      <div className='mt-8 w-full'>
        <div className='  p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Phone Number</label>
            <input
              type='text'
              value={User.Number}
              className='px-4 py-2 border border-gray-300 bg-white text-gray-700  '
              readOnly
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Date of Birth</label>
            <input
              type='text'
              value={User.date}
              className='px-4 py-2 border border-gray-300 bg-white text-gray-700  '
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Age & Logout */}
      <div className='mt-8 w-full'>
        <div className='  p-5 flex flex-col md:flex-row justify-between items-center gap-5'>
          <div className='flex flex-col gap-2 w-full md:w-auto'>
            <label className='text-sm font-medium'>Your Age</label>
            <input
              type='text'
              value= {ageFinder(User.date)}
              className='px-4 py-2 border border-gray-300 bg-white text-gray-700  '
              readOnly
            />
          </div>
          <button onClick={()=>logout()} className='bg-blue-500 text-white px-6 py-2 w-full md:w-40   hover:bg-blue-600 transition duration-300'>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
