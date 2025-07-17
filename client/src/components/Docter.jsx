import React from 'react';
import { CiHospital1 } from "react-icons/ci";

const Docter = () => {
  return (
    <div className="w-full bg-[#E0EAFF] md:rounded-tr-full md:p-16 p-4">
      {/* Hospital Tag */}
      <div className="flex gap-2 items-center text-[#1057EC] p-2 w-fit rounded-md mb-4 border-2 border-[#1057EC]">
        <CiHospital1 size={24} />
        <span className="text-base font-medium">For Hospitals</span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-tl-2xl md:rounded-tr-full overflow-hidden p-4 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        {/* Text Section */}
        <div className="md:w-1/2 w-full space-y-4">
          <h1 className="text-xl md:text-3xl font-bold text-[#1057EC]">
            Your hospital is shown to users based on location — helping you serve more families.
          </h1>
          <p className="text-gray-700">
            Our platform helps families find and book hospital slots based on real-time location.
            Hospitals can manage appointments, availability, and reports through a dedicated Docker-powered dashboard.
          </p>
          <button className="bg-[#1057EC] hover:bg-[#0c45c4] transition text-white px-5 py-2 rounded-2xl">
            Learn More
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 w-full">
          <img
            src="/doc.jpg"
            alt="Doctor and Nurses"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Docter;
