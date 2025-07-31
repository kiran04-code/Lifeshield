import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import { toast } from "react-toastify"
const Admin = () => {
  const [hotdatam, sethotData] = useState([])
  const [True, setTrue] = useState(false)

  const { axios } = useAuth()
  const allhotdata = async () => {
    try {
      const { data } = await axios.get("/findAllHostpital")
      sethotData(data.hotData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    allhotdata()
  }, [hotdatam])

  const handleVefy = async (id, True) => {
    try {
      const { data } = await axios.post("/makeVerify", { id: id, vale: True })
      allhotdata()
      toast.success(data.message)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-[#C2D5FD] w-full h-screen flex-col'>
      <div className='text-4xl text-blue-700 font-bold p-7 flex justify-center items-center flex-col'>
        Lifeshield Admin Panel
        <p className="text-xl font-semibold text-gray-800">
          Panel for Verification of Doctors and Their Clinics
        </p>

      </div>

      <div className="overflow-x-auto p-10 ">

        <table className="min-w-full bg-white border border-gray-300 shadow rounded-2xl">
          <thead>
            <tr className="bg-blue-600 text-white text-left text-nowrap">
              <th className="py-3 px-4 border-b">Hospital Name</th>
              {/* <th className="py-3 px-4 border-b">Doctor Name</th> */}
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Phone Number</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Address</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {hotdatam?.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50 text-[14px]">
                <td className="py-3 px-4 border-b">{entry.hospitalName}</td>
                {/* <td className="py-3 px-4 border-b">{entry.doctor}</td> */}
                <td className="py-3 px-4 border-b">{entry.profileId.email}</td>
                <td className="py-3 px-4 border-b">{entry.Number}</td>
                <td className="py-3 px-4 border-b">{entry.village}</td>
                <td className="py-3 px-4 border-b">{entry.location}</td>
                <td className="py-3 px-4 border-b">
                  {
                    entry.verify ? <span className='text-green-500 font-semibold bg-blue-100 p-2 rounded-3xl'>verifyed </span> : <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded " onClick={() => { handleVefy(entry._id, True); setTrue(true) }}>
                      Verify
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Admin
