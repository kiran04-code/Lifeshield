import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Sign In");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-opacity-40 backdrop-blur-[6px]">
      <motion.div
       
        className="bg-[#E0EAFF] w-full max-w-2xl shadow-xl  p-6 md:p-10"
      >
        <h1 className="text-3xl font-semibold mb-6 text-blue-700 text-center">
          {activeTab}
        </h1>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 bg-white   focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 bg-white   focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 bg-white   focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 bg-white   focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 w-150 text-white px-8 py-2  hover:bg-blue-800 transition duration-200"
            >
              Login Here
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-3 text-gray-500">Or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        {/* Google Button */}
        <button className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-400 rounded-full text-gray-800 font-medium bg-white hover:bg-gray-100 transition duration-200 mb-4">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Create Account Button */}
        <button
          onClick={() => setActiveTab("Sign Up")}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-400 rounded-full text-gray-800 font-medium bg-white hover:bg-gray-100 transition duration-200"
        >
          <FaUserPlus className="text-xl" />
          Create a New Account
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
