

import { FaHospital , FaList, FaCalendar,  } from 'react-icons/fa';
import { FaBars } from "react-icons/fa6";
import { FaUser, FaStar, FaUserFriends, FaFileAlt, FaCalendarAlt, FaCoins, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useDocAuth } from '../../../context/dockAuth';
import { CiWarning } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const BarPage = () => {
    const {id} = useParams()
    var {hostpitaldata,docterdata} = useDocAuth()
  const [showMenu, setShowMenu] = useState(true); // Set to true for always visible (toggle optional)

  return (
    <motion.div initial={{
        opacity:0,

    }
    } whileInView={{
        opacity:1,
        y:[-20,10]
    }}   className='absolute top-40 right-4 w-72 bg-white shadow-lg rounded-xl border'>
      {showMenu && (
        <div className='p-4'>
          {/* Header */}
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-500">
              <FaUser />
            </div>
            <div>
              <h2 className="font-semibold">Dr. {hostpitaldata?.fname} {hostpitaldata?.lname} <span className="text-blue-600"> ✔</span></h2>
            </div>
          </div>
          {/* Menu Items */}
          <ul className='mt-3 space-y-2 text-sm text-gray-700'>
            <Link className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded  " to={`/DokcterdashBord/${id}/Profile`}><FaUser /> My Profile</Link>
           <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"><FaCalendarAlt /> My Availability</li>
            <li className="text-blue-600 hover:bg-blue-50 p-2 rounded">Schedule Meeing</li>
            <li className="hover:bg-gray-100 p-2 rounded">Request Training</li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded justify-between">
              <div className='flex items-center gap-2'><FaQuestionCircle /> My Support Tickets</div>
              <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">New</span>
            </li>
          </ul>

          {/* Footer */}
          <div className='mt-4 border-t pt-3'>
            <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full p-2 rounded">
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};


const Homepage = () => {
  var { hostpitaldata,docterdata } = useDocAuth();
   const [isbutton,setisbutton] = useState()
  useEffect(()=>{
   setisbutton(docterdata)
  },[docterdata])
  const [isOpen, setIsopen] = useState(false);
const {id} = useParams()
  return (
    <div className=''>
      {/* Navbar */}
     <div className=" w-full md:hidden md:w-full md:h-5  h-screen flex justify-center items-center bg-gray-100 text-center px-4">
      <p className="md:text-[12px] text-lg font-semibold text-red-600">
        Sorry! This Dashboard is available only on desktop.
      </p>
    </div>
      <div className=" hidden md:w-full bg-white shadow px-4 py-3 md:flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
        {/* Left side */}
        <div className="flex flex-wrap gap-4 items-center">
          <h1 className="text-lg font-bold text-blue-600">LifeShield</h1>

          <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            <FaCalendarAlt />
            <span>{new Date().toDateString()}</span>
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full gap-2 text-sm">
            <FaHospital />
            <span>Your Hospital</span>
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full gap-2 text-sm ml-2">
            <CiWarning className='text-red-700 text-xl' />
            <span>This Dashboard is available only on desktop.</span>
          </div>
         
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded-full text-sm focus:outline-none"
          />

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsopen(!isOpen)}
          >
            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold uppercase">
              K
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                Dr. {hostpitaldata?.fname} {hostpitaldata?.lname}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <span className="bg-blue-500 text-white px-2 rounded">
                  DOCTOR
                </span>
                <IoIosArrowDown className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && <BarPage />}
      </div>

      {/* Hero Section */}
      <div className="md:min-h-screen md:flex flex-col md:justify-center md: hidden items-center bg-gradient-to-r from-indigo-100 via-white to-indigo-100 px-4">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center items-center mb-4">
            <FaHospital className="text-indigo-600 text-5xl" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Lifeshield
          </h1>
          {
            isbutton.hotPitalRegisters === true ? <div><p className="text-gray-600 text-md md:text-xl mb-8">
  Thank you for registering your hospital on our platform. Together, let's work toward making healthcare more efficient and vaccination tracking easier for everyone.
</p>
</div>:<div><p className="text-gray-600 text-md md:text-xl mb-8">
            Join our mission to make healthcare more accessible. Register your hospital today and help track vaccinations efficiently.
          </p>
          <Link
            to={`/DokcterdashBord/${id}/register-hospital`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition shadow-lg"
          >
            Register Your Hospital
          </Link></div>
          }
        </div>
        <footer className="mt-16 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Lifeshield. All rights reserved.
        </footer>
      </div>
    </div>
  );
};


export default Homepage;
