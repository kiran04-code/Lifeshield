import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { motion } from 'motion/react';
const About = () => {
  return (
    <div className='mt-5 ' id="aboute">
      <div className='w-full px-2 py-2'>
        
        {/* Capsule-Shaped About Box */}
        <motion.div  className='bg-[#E0EAFF] px-9 py-10 md:rounded-tl-full md:rounded-br-full rounded-b-[200px] shadow-md overflow-hidden'>
          <h1 className='text-2xl pb-4 text-center  text-[#155DFC] font-bold'>
            About Lifeshield
          </h1>
       <div className='md:w-full md:justify-center md:flex '>
          
            <p className="text-[#155DFC] font-semibold  md:flex md:text-center md:w-[80%] md:text-base italic md:items-center md:justify-center  leading-relaxed">
            Lifeshield is a centralized platform designed for doctors, hospitals, and healthcare providers to simplify the vaccination process for children aged 1 month to 16 years.  
            From booking nearby vaccination slots and scheduling home nurse visits to enabling expert video consultations, Lifeshield ensures safe, timely, and accessible immunization for every child.
          
          </p>
       </div>
        
         <div className=' flex justify-center items-center pb-2'>
               <button className=' mt-5 bg-[#155DFC] p-3 rounded-2xl text-white flex gap-2 justify-center items-center'>
            Lern More <IoIosArrowForward/>
          </button>
         </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
