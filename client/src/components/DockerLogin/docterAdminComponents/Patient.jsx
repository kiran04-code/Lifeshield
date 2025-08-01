import React, { useState } from 'react'
import Layout from './meetingSlotBookDetails/LayoutMeeting'
import ShowBookingDataMeeting from './meetingSlotBookDetails/ShowBookingDataMeetingdata'
import Loader from '../../../utils/Loader'
import { useParams } from 'react-router-dom'
import { useDocAuth } from '../../../context/dockAuth'
import { toast } from 'react-toastify'

const Patient = () => {
  const [load, setload] = useState(false)
  const { axios,hostpitaldataworkspace } = useDocAuth()
  const handleMeetingPermission = async () => {
  
    const userResponse = confirm("Do you want to enable your consultation service?");

    try {
      if (userResponse) {
        setload(true)
        console.log(hostpitaldataworkspace)
        const { data } = await axios.post("/startCunstacyService", { value: true })
        if (data.success) {
          toast.success(data.message)
          setload(false)
        }

      }
      else {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div >
      {
        hostpitaldataworkspace?.vcallONOff ? <div> <div className=' flex p-2'>
          <h1 className='text-2xl p-2 bg-blue-400 font-bold mt-2 rounded-2xl text-white'> Meeting Appointments</h1>
        </div>
          <div className='flex  justify-between mt-1 px-5'>

            <div>
              <Layout />
            </div>
            <div>
              <ShowBookingDataMeeting />
            </div>
          </div></div> : <div className="w-full h-screen bg-[#a2c0ff] flex justify-center items-center flex-col px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-4">
            Welcome to Lifeshield Video Consultancy Services!
          </h1>

          <p className="text-lg text-gray-700 font-semibold text-center max-w-xl mb-6">
            Join us in helping every parent make informed vaccination choices for their children! You can now offer 20 or 30-minute paid consultations directly through Lifeshield. Not only do you guide parents with your expertise, but you also earn for every session you take. Ready to get started? Enable your consultation service today!
          </p>

          <div className="w-full flex justify-center p-2">
            <img src="/Untitled design(11).png" alt="Consultation Illustration" className="w-64 md:w-80 rounded-xl" />
          </div>
          <div className=' w-82  bg-blue-100 text- white flex justify-center items-center px-19 rounded-2xl py-2 '>

            <button className='text-white bg-blue-600 p-2 rounded-xl' onClick={() => handleMeetingPermission()} >

              {
                load ? <Loader /> : "Enable Feature"
              }

            </button>

          </div>
        </div>

      }
    </div>
  )
}

export default Patient
