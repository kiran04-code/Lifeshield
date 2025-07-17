import React from 'react'
import { CiHospital1 } from "react-icons/ci";
import { RiParentFill } from "react-icons/ri";
const HeroSection = () => {
    return (
        <div className='w-full bg-[#E0EAFF] h-screen md:flex'>
            <div>
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-[#6552E3] p-5 sm:p-6 md:p-8 lg:p-10 max-w-4xl leading-snug">
                    One small shot for you, one giant leap for Community health.
                    Get vaccinated!
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-6 md:px-8 lg:px-10 py-4 leading-relaxed max-w-3xl">
                    Your Health, Your Responsibility: Stay Updated with Vaccination Tracker. <br />
                    Track, Protect, and Empower Yourself — Ensure You're Up-to-Date on Your Vaccines!
                </p>

                <div className='flex px-4'>
                    <div className='  flex gap-5 bg-[#8f8dd5ab] p-5 items-center justify-evenly py-2 rounded-full md:w-100 w-80  '>
                        <div className='flex justify-between items-center flex-col'>
                            <div className='md:w-10 md:h-10 md:bg-[#E0EAFF] md:rounded-full md:flex  p-2 rounded-full   border-2 border-[#6552E3] justify-center items-center'>
                                <CiHospital1 className='text-2xl  text-[#6552E3]' />
                            </div>
                            <p>Hostpitals & Doctors</p>
                        </div>
                        <div className='flex justify-between items-center flex-col'>
                            <div className='md:w-10 md:h-10 md:bg-[#E0EAFF] md:rounded-full md:flex p-2 rounded-full  border-2 border-[#6552E3] justify-center items-center'>
                                <RiParentFill className='text-2xl  text-[#6552E3]' />
                            </div>
                            <p>Parents</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
  <div className='flex justify-center mt-10'>
    <img 
    src="/Blue Lets Get Vaccinated Instagram Post.png" 
    alt="Get Vaccinated" 
    className="w-full h-sc max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
  />
  </div>
</div>

        </div>
    )
}

export default HeroSection
