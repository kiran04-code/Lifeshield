import React from 'react'
import { motion } from 'motion/react'
import { RiParentFill } from "react-icons/ri";
import { CiHospital1 } from "react-icons/ci";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDocAuth } from '../context/dockAuth';
const DocterHroSection = () => {
    const navigate  = useNavigate()
    const {docterdata} = useDocAuth()
  return (
    <div id="hostpital">
       <div className='w-full bg-[#E0EAFF] md:flex' >
                  <div>
                      <h1 className="text-[30px] sm:text-2xl md:text-4xl lg:text-6xl font-bold text-[#1057EC] p-5 sm:p-6 md:p-8 lg:p-10 max-w-4xl leading-snug">
                          A trusted space for doctors committed to community health
                          <motion.span
                              className="inline-block mx-2"
                              animate={{ y: [0, 10, 0] }}
                              transition={{
                                  duration: 1,
                                  delay: 1,
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  ease: "easeInOut"
                              }}
                          >
                              <FaUserDoctor className="inline text-[#1057EC]" />
                          </motion.span>
                          Care Begins with You.
                      </h1>
      
                      <p className=" italic text-base sm:text-lg md:text-[15px] text-gray-600 px-4 sm:px-6 md:px-8 lg:px-10 py-4 leading-relaxed max-w-3xl ">
                          -Provide online consultations and manage infant vaccination bookings with ease.
                          Expand your reach, deliver timely care, and support families anytime, anywhere.
                      </p>
      
                      <div className='flex md:px-8 px-3  py-2'>
                          <div className='  flex gap-5 bg-[#322bff7a] p-6 items-center justify-centere py-2  rounded-xl cursor-pointer  '>
                              <div className='flex justify-center items-center flex-col'>
                                  {
                                    docterdata ? <div className='flex flex-col justify-center items-center overflow-hidden'><div className='md:w-10 md:h-10 md:rounded-full  flex p-2 rounded-full bg-white   border-2 border-[#6552E3] justify-center items-center' onClick={()=>navigate("/DokcterLogin")}>
                                      <CiHospital1 className='text-2xl  text-[#5039e2]  ' />
                                  </div>
                                  <p>profile</p></div>
                                  :
                                  <div className='flex flex-col justify-center items-center overflow-hidden'><div className='md:w-10 md:h-10 bg-white  md:rounded-full w-10 h-10  flex p-2 rounded-full   border-2 border-[#6552E3] justify-center items-center' onClick={()=>navigate("/DokcterLogin")}>
                                      <CiHospital1 className='text-2xl  text-[#5039e2]' />
                                  </div>
                                  <p>For Hospitals & Doctors Login Here</p></div>
                                  }
                              </div>
      
                          </div>
                      </div>
                  </div>
                  <div className="">
                      <div className='flex justify-center  md:mt-5'>
                          <img
                              src="/School Productivity Tracker(6).gif"
                              alt="Get Vaccinated"
                              className="w-[600px] sm:w-[500px]  h-auto md:mr-10 object-contain"
                          />
      
                      </div>
                  </div>
      
              </div>
    </div>
  )
}

export default DocterHroSection
