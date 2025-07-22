import React from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
const VideoCallConsultationInfo = () => {
  const navigate = useNavigate()
    const {User} = useAuth()
  return (
    <div className="bg-[#E0EAFF] p-6 md:p-10 rounded-3xl shadow-md w-full flex flex-col md:flex-row items-center gap-6">
      
      <div className="md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
          Video Call Consultation with Nearby Vaccination Doctors
        </h2>
        <p className="text-gray-700 text-md mb-3">
          Consult certified vaccination doctors through secure video calls.
        </p>
        <p className="text-gray-700 text-md">
          Get expert advice from nearby healthcare professionals without traveling. Perfect for quick doubts, follow-ups, or scheduling vaccines.
        </p>
          {
        User ? <button onClick={()=>navigate("/vcallBook ")} className='bg-blue-700 text-white px-5 p-2 rounded-[5px] mt-1'> Explore</button> :null
      }
      </div>

      <div className="md:w-1/2 flex justify-center">
        <img 
          src="/Untitled design(11).png" 
          alt="Video Call Consultation" 
          className="w-full max-w-md rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default VideoCallConsultationInfo;
