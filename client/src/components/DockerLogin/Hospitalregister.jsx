import React, { useState } from 'react';
import { useDocAuth } from '../../context/dockAuth';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../utils/Loader';
const CreateProfile = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isloading,setisloading] = useState(false)
  const { docterdata } = useDocAuth()
  const [from, setFrom] = useState({})
  const navigate  = useNavigate()
  const [Gender,setGenter] = useState('')
  const {axios} = useAuth()
  const gender = [
    { name: "Male" },
    { name: "Female" },
    { name: "Other" },
  ]
const handleFromData = (e) => {
  const { name, value } = e.target;
  setFrom( ({ ...from, [name]: value }));
};
  const hynadleSubmitFrom = async (e) => {
    setisloading(true)
  e.preventDefault();
  try {
    const { data } = await axios.post("/HostkRegister", {from,Gender:Gender});
    console.log(data); // ✅ Now this will have your response
    if(data.success){
      toast.success(data.message)
      navigate("/hostpiyalshow")
      setisloading(false)
    }
    else{
      toast.error(data.message)
      setisloading(false)
    }
  } catch (error) {
    console.error("Submission error:", error);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#85acff] px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-800">Create Profile with <p className='text-blue-600'>LifeShield</p></h2>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Help us maintain our medical community’s integrity with verified credentials.
        </p>
       <form action="" onSubmit={hynadleSubmitFrom}>
         <div className="flex space-x-2 mb-4">
          <select className="w-1/4 px-2 py-2 border rounded bg-yellow-50 text-gray-800">
            <option>Dr</option>
          </select>
          <input type="text" onChange={handleFromData} name="fname" placeholder="First" className="w-1/3 px-3 py-2 border rounded bg-yellow-50" />
          <input type="text" onChange={handleFromData} name="Mname" placeholder="Middle" className="w-1/3 px-3 py-2 border rounded bg-yellow-50" />
          <input type="text" onChange={handleFromData} name="lname" placeholder="Last" className="w-1/3 px-3 py-2 border rounded bg-yellow-50" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <div className="flex space-x-3">
            {
              gender.map(({name}) => (
                <button type='button' onClick={()=>setGenter(name)} className={`px-4 py-2 border rounded-full  ${ Gender === name ? "bg-blue-100":null} text-gray-700 hover:bg-blue-100`}>{name}</button>
              ))
            }
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Date of birth</label>
          <input type="date" name="date" onChange={handleFromData} className="w-full px-4 py-2 border rounded bg-white" />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1">Mobile Number With Country Code</label>
          <div className="flex">
            <select className="px-3 py-2 border rounded-l bg-white text-gray-800">
              <option>IN</option>
            </select>
            <input
              type="text"
              value={docterdata?.Number}

              placeholder="07774025744"
              className="w-full px-4 py-2 border border-l-0 rounded-r bg-yellow-50 text-gray-600"
            />
          </div>
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            defaultValue={docterdata?.email}
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-600"
            readOnly
          />
        </div>
        <button className="w-full bg-[#004bec] text-white font-medium py-2 rounded hover:bg-[#6978b9] transition">
          {
            isloading ? <Loader/>:"Next"
          }
        </button>
       </form>
      </div>
    </div>
  );
};

export default CreateProfile;
