import React, { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Sign-up");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
    console.log(email,otp)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hnadle = useCallback(()=>{
       if( emailPattern.test(email)){
  toast.success(`OTP sent to ${email}`,)
  setShowOtpInput(true)
 }
  })
useEffect(()=>{
  hnadle()
},[email])
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-opacity-40 backdrop-blur-[6px]">
      <motion.div className="bg-[#E0EAFF] w-full max-w-2xl shadow-xl p-6 md:p-10 rounded-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-blue-700 text-center">
          {activeTab}
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {activeTab === "Sign-up" ? (
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
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
          ) : (
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
          )}
        </form>

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
