import React, { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import {useNavigate} from "react-router-dom"
import { formToJSON } from "axios";
const Login = () => {
  const [activeTab, setActiveTab] = useState("Sign-up");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [datas,setdatas] = useState({})
  const [email, setEmail] = useState();
  const {User,setUser,axios} = useAuth()
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()
 const hnadlechnage = (e)=>{
  const {name,value} = e.target
  setdatas({...datas,[name]:value})
 }
 const hnadleSubmit = useCallback(async(e)=>{
e.preventDefault()
try {
  const {data} = await  axios.post("http://localhost:3010/api/Signup",datas)
  if(data.success){
    setUser(data.userData)
    toast.success(data.message)
    navigate("/parent")
  }
  else{
    setUser(null)
    console.log(data)
    toast.error(data.message)
  }
} catch (error) {
  console.log(error)
}
 })
 console.log(email)
const hnadlesubmit = async()=>{
  try {
  const {data} = await axios.get("http://localhost:3010/api/signin",{email:email})
  if(data.success){
    toast.success(data.message)
    setShowOtpInput(true)
  }
  else{
    toast.success("Error to Send Message")
    setShowOtpInput(false)
  }
  } catch (error) {
    toast.success(error.message)
    setShowOtpInput(false)
  }
}
useEffect(()=>{
  hnadlesubmit()
},[email])
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-opacity-40 backdrop-blur-[6px]">
      <motion.div className="bg-[#E0EAFF] w-full max-w-2xl shadow-xl p-6 md:p-10 rounded-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-blue-700 text-center">
          {activeTab}
        </h1>

        {/* Form */}
        
          {activeTab === "Sign-up" ? (
            <form className="space-y-4" onSubmit={hnadleSubmit} >
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                 onChange={hnadlechnage}
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="Number"
                  onChange={hnadlechnage}
                  placeholder="Enter Your Mobile Number"
                  className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                 onChange={hnadlechnage}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="date"
                  onChange={hnadlechnage}
                  className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-700 text-white w-147 px-8 py-2 hover:bg-blue-800 transition duration-200"
                >
                  Sign Up
                </button>
              </div>
            </div>
             </form>
          ) : (
            <form>
              <div>
              {!showOtpInput ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="bg-green-600 w-147 text-white px-8 py-2 hover:bg-green-700 transition duration-200"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}
            </div>
            </form>
          )}
       

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-3 text-gray-500">Or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        {/* Google Button */}
        <button className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-400 rounded-full bg-white text-gray-800 font-medium hover:bg-gray-100 transition duration-200 mb-4">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Toggle Tab */}
        {activeTab === "Sign-up" ? (
          <button
            onClick={() => {
              setActiveTab("Sign-in");
              setShowOtpInput(false);
            }}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-400 rounded-full bg-white text-gray-800 font-medium hover:bg-gray-100 transition duration-200"
          >
            <FaUserPlus className="text-xl" />
            Already have an account?
          </button>
        ) : (
          <button
            onClick={() => {
              setActiveTab("Sign-up");
              setShowOtpInput(false);
            }}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-400 rounded-full bg-white text-gray-800 font-medium hover:bg-gray-100 transition duration-200"
          >
            <FaUserPlus className="text-xl" />
            Create a New Account
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
