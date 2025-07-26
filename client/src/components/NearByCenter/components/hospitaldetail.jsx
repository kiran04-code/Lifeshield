import React, { useCallback, useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import { hospitalDetailss } from '../../../assets/assets'
import Loader2 from '../../../utils/Loader2'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useDocAuth } from '../../../context/dockAuth';
const Hospitaldetail = () => {
  const [hostpitalData, sethostpital] = useState([])
  const [filterdata, setFilterData] = useState([])
  const { axios } = useDocAuth()
  const { name } = useParams()
   useEffect(() => {
    if (!name || hostpitalData.length === 0) return;

    const filtered = hostpitalData.filter((data) => data._id === name);
    setFilterData(filtered);
  }, [name, hostpitalData]);

 useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data } = await axios.get("/findAllHostpital");
        sethostpital(data.hotData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllData();
  }, []);

  return (
       <div className="p-6 bg-gray-50 min-h-screen py-40">
      {filterdata ? (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
          {filterdata.map((data) => (
            <div key={data._id}>
              <h1 className="text-2xl font-bold text-blue-700 mb-2">{data.hospitalName}</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                {/* Phone Number */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex gap-2 justify-center items-center">
                  <FaPhoneAlt className="text-2xl text-blue-600" />
                  <p>{data.Number}</p>
                </div>

                {/* Location */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex gap-2 items-center">
                  <FaLocationDot className="text-2xl text-blue-700" />
                  <p>{data.location}</p>
                </div>

                {/* Timings */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm col-span-1 sm:col-span-2">
                  <p className="font-semibold">🕒 Timings</p>
                  <p>{data.timeopne}</p>
                </div>

                {/* Services */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm col-span-1 sm:col-span-2">
                  <p className="font-semibold">💉 Services</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {data.specialization?.split(",").map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Book Button */}
              <div className="flex justify-end">
                <button
                  className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleBooking(data._id)}
                >
                  Book Vaccination Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hospitals found.</p>
      )}
    </div>
  );
};


export default Hospitaldetail
