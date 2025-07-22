import React from 'react'
import { useNavigate } from 'react-router-dom'
const DockerLogin = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col justify-center items-center mt-20 px-4">
      <div className="p-10 sm:p-20 rounded-2xl bg-[#C2D5FD] flex flex-col items-center shadow-lg">
        <img src="/02logo.png" alt="LifeShield Logo" className="w-40 mb-4" />

        <p className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Get Started with <span className="text-blue-700">LifeShield</span>
        </p>

        <div className="mt-2 gap-4 flex flex-col sm:flex-row">
          <button onClick={()=>{navigate("/DokcterLogin/Login");scrollTo(0,0)}} className="bg-blue-700 hover:bg-blue-800 transition px-6 py-2 rounded-xl w-40 text-white font-medium">
            Login
          </button>
          <button onClick={()=>{navigate("/DokcterLogin/CreatAccount");scrollTo(0,0)}} className="bg-blue-700 hover:bg-blue-800 transition px-6 py-2 rounded-xl w-40 text-white font-medium">
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default DockerLogin
