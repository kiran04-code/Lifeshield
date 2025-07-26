import React from 'react';
import { FaUserMd, FaCheckCircle } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDocAuth } from '../../../../context/dockAuth';
const Profile = () => {
  const { hostpitaldata, hostpitaldataworkspace } = useDocAuth()
  return (
    <div className="w-full min-h-screen bg-blue-50 py-6 px-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-5xl text-gray-400">
          <FaUserMd />
        </div>

        {/* Profile Info */}
       {/* Profile Info */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between w-full flex-wrap gap-4 text-center md:text-left">
  <div className="flex flex-col items-center md:items-start">
    <h1 className="text-2xl font-bold text-gray-800">
      Dr. {hostpitaldata?.fname} {hostpitaldata?.lname}
    </h1>
    <p className="text-blue-600 font-medium">Doctor</p>

    <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-2">
      <FaCheckCircle className="text-green-500" />
      <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-md font-semibold">
        IN-CLINIC VISITS
      </span>
    </div>
  </div>

  <div className="flex flex-col items-center md:items-end justify-center md:justify-end text-sm text-gray-600">
    <p>{hostpitaldataworkspace?.profileId?.email}</p>
    <p>{hostpitaldataworkspace?.profileId?.Number}</p>
  </div>
</div>
</div>

      {/* Language Section */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-1">English</h2>
        <p className="text-gray-500 text-sm">Languages</p>
      </div>

      {/* Hospital Section */}
      <div className="bg-white mt-4 p-4 rounded-xl shadow-md flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl text-orange-600">
          <MdLocalHospital />
        </div>
        <div>
          <p className='text-gray-400'>Your Register Hostpital Name</p>
          <h2 className="font-semibold capitalize">{hostpitaldataworkspace?.hospitalName }</h2>
        </div>
      </div>
      <div className="bg-white mt-4 p-4 rounded-xl shadow-md flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl text-orange-600">
          <FaMapMarkerAlt />
        </div>
        <div>
          <p className='text-gray-400'>Location</p>
          <h2 className="font-semibold capitalize">{hostpitaldataworkspace?.location}</h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
