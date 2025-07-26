import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader2 from '../../utils/Loader2';
import { useDocAuth } from '../../context/dockAuth';
import { useNavigate } from 'react-router-dom';
import Loader3 from '../../utils/Loder3';
import { useParams } from 'react-router-dom';
const HospitalRegisterForm = () => {
  const [location, setlocation] = useState([])
  const [filterHostpilat, setfilterhotspil] = useState([])
  const [selecthostpital, setselecthostpital] = useState('')
  const [locationseting, setlocationsetting] = useState('')
  const {id} = useParams()
  const [loader, setloader] = useState(false)
  const { axios, docterdata,hostpitaldata } = useDocAuth()
  const navigate = useNavigate()
  const [number, setNumber] = useState(); // default to empty string
useEffect(() => {
  if (docterdata?.Number) {
    setNumber(docterdata.Number); // update when data is available
  }
}, [docterdata]); // runs whenever docterdata changes
  var [formData, setFormData] = useState({
    hospitalName: '',
    specialization: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const findInerarHostpital = useCallback(async () => {
    setloader(false)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const LAT = latitude;
        const LON = longitude;
        const apiKey = '7e951727013c4c94ab1a32c2db0ab4b3';
        const data = await fetch(`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${LON},${LAT},2000&limit=50&apiKey=${apiKey}`)
        const res = await data.json()
        setlocation(res.features)
        setloader(true)
      },
      (error) => {
        console.error("Location access denied:", error);
      })
  }, [])
  console.log(selecthostpital)
  useEffect(() => {
    const filterData = location.find((data, index) => data.properties.name === selecthostpital)
    setfilterhotspil(filterData)
  }, [selecthostpital])
  useEffect(() => {
    findInerarHostpital()
  }, [])
  const hnadleCretaWorkSpace = async (e) => {
    try {
      e.preventDefault();
      console.log('Submitted Hospital Data:', { formData });
      const { data } = await axios.post("/createWrokSpace", {formData,locationseting,number})
      if (data.success) {
        toast.success(data.message)
       navigate(`/DokcterdashBord/${id}`)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(data.message)
    }
  }
  return loader ? (
    <div className="w-full min-h-screen flex justify-center items-center bg-blue-50 p-4">
      <div className="w-full max-w-xl">

        {/* Instruction Box */}
        <div className="bg-blue-100 border-l-4 border-blue-700 text-yellow-800 p-4 rounded-md shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-2">📌 How to Register Your Hospital</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>🧭 <strong>Allow location access</strong> when prompted to auto-detect your hospital's area.</li>
            <li>🏥 <strong>Find your hospital</strong> from the dropdown list based on nearby suggestions.</li>
            <li>✍️ <strong>Register your hospital</strong> by providing its name, address, and services offered.</li>
          </ul>
          <p className="mt-3 text-sm text-red-600">
            ⚠️ If your hospital is not listed, we're sorry — you're not eligible to register on Lifeshield at this time.
          </p>
        </div>
        {/* Form */}
        <form onSubmit={hnadleCretaWorkSpace} className="bg-white shadow-md rounded-lg p-6 space-y-5">
          <h2 className="text-2xl font-bold text-center text-blue-700">Hospital Registration</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>

            {/* Dropdown */}
            <select
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              onChange={handleChange}
              onClick={(e) => setselecthostpital(e.target.value)}
              name="hospitalName"
              defaultValue=""
            >
              <option value="" disabled>
                -- Select a hospital --
              </option>
              {location.map((data, index) => (
                <option key={index} value={data.properties.name} >
                  {data.properties.name}
                </option>
              ))} 
            </select>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Or enter hospital name manually"
              required
            />
          </div>
          {/* location  */}
          <div>
            <select
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              onChange={handleChange}
              onClick={(e) => setlocationsetting(e.target.value )}
              name="location"
              defaultValue=""
            >
              <option value="" disabled>
                -- Select a hospital --
              </option>
              <option onChange={handleChange} 
                value={`${filterHostpilat?.properties?.address_line1}-${filterHostpilat?.properties?.address_line2}`} >
                {`${filterHostpilat?.properties?.address_line1}-${filterHostpilat?.properties?.address_line2}`}
              </option>
            </select>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <textarea
              type="text"
              onChange={handleChange}
              value={locationseting}
              className="w-full px-4 py-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter hospital location"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. Cardiology, Pediatrics"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
            <input
              type="text"
              name="Number"
              value={docterdata?.Number}
               onChange={()=>setNumber(docterdata?.Number)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. Cardiology, Pediatrics"
              
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register Hospital
          </button>
        </form>
      </div>
    </div>
  ) : <div className="w-full flex flex-col items-center mt-20 px-4">
    {/* Instruction Box */}
    <div className="w-full max-w-xl bg-blue-50 border-l-4 border-blue-700 text-blue-800 p-5 rounded-md shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-3">📌 How to Register Your Hospital</h3>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li>🧭 <strong>Allow location access</strong> when prompted to auto-detect your hospital's area.</li>
        <li>🏥 <strong>Find your hospital</strong> from the dropdown list based on nearby suggestions.</li>
        <li>✍️ <strong>Register your hospital</strong> by providing its name, address, and services offered.</li>
      </ul>
      <p className="mt-4 text-sm text-red-600 font-medium">
        ⚠️ If your hospital is not listed, we're sorry — you're not eligible to register on <span className="font-bold">Lifeshield</span> at this time.
      </p>
    </div>

    {/* Loader */}
    <Loader3 />
  </div>

};

export default HospitalRegisterForm;
