import { motion } from 'motion/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Card = () => {
  return (
    <div className="p-4 ">
       <div className='flex justify-center items-center p-2 bg-[#E0EAFF]  rounded-t-xl'>
         <div className="flex items-center border pl-4 gap-2 border-blue-600 h-[55px] rounded-full overflow-hidden max-w-md w-full mt-5">

            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">

                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>

            </svg>

            <input type="text" placeholder="Search" className="w-full h-full outline-none text-gray-500 bg-transparent placeholder-gray-500 text-sm" />

        </div>
       </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center bg-[#E0EAFF] p-6 rounded-xl shadow-md">
        
        {[1, 2, 3,5].map((item) => (
          <motion.div
            key={item}


           whileHover={{
    y: -10 // moves 10px up on hover
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut"
  }}
            className="p-4 bg-white rounded-lg shadow-md max-w-xs w-full border-2 border-b-blue-600"
          >
            <img
              className="rounded-md h-40 w-full object-cover"
              src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400"
              alt="officeImage"
            />
            <p className="text-gray-900 text-xl font-semibold mt-3 ml-2">Your Card Title</p>
            <p className="text-gray-500 text-sm mt-2 ml-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore..
            </p>
            <button className='bg-blue-600 p-2 rounded-xl text-white mt-2 ml-1'>Lern More</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Card;
