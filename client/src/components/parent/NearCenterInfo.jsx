import React from 'react';

const NearCenterInfo = () => {
  return (
    <div className="bg-[#E0EAFF] p-6 md:p-10 rounded-3xl shadow-md w-full flex flex-col md:flex-row items-center gap-6">
      
      {/* Text Section */}
      <div className="md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
          Book Slots at Nearby Vaccination Centers
        </h2>
        <p className="text-gray-700 text-md mb-3">
          Easily find and book vaccination slots at centers near your location.
        </p>
        <p className="text-gray-700 text-md">
          This feature helps parents and individuals book appointments quickly by showing real-time availability based on selected age groups or vaccine type.
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img 
          src="/Untitled design(10).png" 
          alt="Vaccination Slot Booking" 
          className="w-full max-w-md rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default NearCenterInfo;
