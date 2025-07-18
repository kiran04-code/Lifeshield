import { useState } from "react";
import React from 'react';
import { CiHospital1 } from "react-icons/ci";
import { RiParentFill } from "react-icons/ri";
import Loader from "../utils/Loader";

const Parents = () => {
  const [loader,setLoading] = useState(false)
  return (
    <div className="w-full md:p-16 p-4 md:rounded-tl-full bg-[#E0EAFF] mt-20 overflow-hidden">
      {/* Tag Header */}
      <div className="flex justify-end mb-2">
        <div className="flex gap-2 items-center text-[#1057EC] p-2 w-fit rounded-md border-2 border-[#1057EC]">
          <RiParentFill size={24} />
          <span className="text-base font-medium">For Parents</span>
        </div>
      </div>


      <div className="bg-white w-full p-4 md:p-8 md:rounded-tl-full rounded-tl-2xl flex flex-col md:flex-row gap-6 items-center overflow-hidden">
        
      
        <div className="md:w-1/2 w-full">
          <img
            src="/parent2.jpg"
            alt="Doctor and Nurses"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <h1 className="text-xl md:text-3xl font-bold text-[#1057EC]">
            Your hospital is shown to users based on location — helping you serve more families.
          </h1>
          <p className="text-gray-700">
            Our platform helps families find and book hospital slots based on real-time location.
            Hospitals can manage appointments, availability, and reports through a dedicated Docker-powered dashboard.
          </p>
          <div className="flex justify-start">
            <button  onClick={()=>setLoading(!loader)} className="bg-[#1057EC] hover:bg-[#0c45c4] transition text-white px-5 py-2 rounded-2xl">
             {
              loader ? <Loader/> : "Learn More"
             }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parents;
