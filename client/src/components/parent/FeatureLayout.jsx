import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaFileVideo } from "react-icons/fa6";

const FeatureLayout = () => {
  const [fetu, setFetu] = useState("Search NearBy Vaccine Center");
  console.log(fetu)
const data = [
  {
    name: "Search NearBy Vaccine Center",
    link: "",
    icon:<FaLocationDot  className='text-2xl md:text-3xl'/>
  },
  {
    name: "Video Call Consultation with Nearby Vaccination Doctors",
    link: "DocterCalls",
    icon:<FaFileVideo   className='text-2xl md:text-3xl'/>
  }
];

  return (
    <div className='p-4 md:p-10 overflow-hidden'>
      <div className='bg-white w-full rounded-[40px] md:rounded-[100px] border-2 overflow-hidden border-blue-700 flex flex-col md:flex-row gap-6 md:gap-0'>
        
        {/* Sidebar */}
        <div className='flex flex-col p-4 md:p-10 gap-6 w-full md:w-[40%]'>
          <h1 className='text-3xl md:text-4xl font-bold text-blue-700 text-center md:text-left'>Features</h1>
          <div className='flex flex-col gap-4'>
            {
              data.map((info,index) => (
                <Link
                  key={index}
                  to={`/parent/${info.link}`}
                  onClick={() => setFetu(info.name)}
                  className={`${
                    fetu === info.name ? "bg-[#92b5ff]" : ""
                  }    text-[16px] md:text-[20px]  flex items-center gap-3 md:w-95 hover:bg-[#E0EAFF] p-3 transition rounded-2xl cursor-pointer`}
                >
                  <div className='bg-white border-2 border-blue-400 p-1 rounded-xl'>
                     {info.icon}
                  </div>
                  <p>{info.name}</p>
                </Link>
              ))
            }
          </div>
        </div>

        {/* Main Content */}
        <div className='w-full md:w-[60%] bg-white p-4 md:p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FeatureLayout;
