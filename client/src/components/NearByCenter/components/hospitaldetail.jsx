import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { hospitalDetailss } from '../../../assets/assets'
import Loader2 from '../../../utils/Loader2'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
const Hospitaldetail = () => {
  const [hostpitalData, sethostpital] = useState(null)
  const { name } = useParams()

  const handleFuntionwithlocation = useCallback(() => {
    const datas = hospitalDetailss.filter((data) => data.name === name)
    sethostpital(datas)
  }, [name])

  useEffect(() => {
    handleFuntionwithlocation()
  }, [handleFuntionwithlocation])

  return (
    <div className="p-6 bg-gray-50 min-h-screen py-40">
      {hostpitalData ? (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
          {hostpitalData.map((data) => (
            <div key={data.name}>
              <h1 className="text-2xl font-bold text-blue-700 mb-2">{data.name}</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm  flex  gap-2 justify-center items-center">
                  <FaPhoneAlt className='text-2xl text-blue-600 '/>
                  <p>{data.contact}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex gap-2 ">
                  <FaLocationDot className='text-2xl text-blue-700'/>
                  <p>{data.address}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg shadow-sm col-span-1 sm:col-span-2">
                  <p className="font-semibold">🕒 Timings</p>
                  <p>{data.timings}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg shadow-sm col-span-1 sm:col-span-2">
                  <p className="font-semibold">💉 Services</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {data.services.split(" ").map((service, index) => (
                      <li key={index}>{service.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader2 />
      )}
    </div>
  )
}

export default Hospitaldetail
