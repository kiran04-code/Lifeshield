import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const   HospitalRegisterForm = () => {
    const [location ,setlocation] = useState('')
  const [formData, setFormData] = useState({
    hospitalName: '',
    location: '',
    specialization: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Hospital Data:', formData);
    // You can now send this data to your backend via fetch or axios
  };

useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    setlocation(data)
  },
  (error) => {
    console.error("Location access denied:", error);
  }
);

},[])
console.log(location.display_name)
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-blue-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center text-blue-700">Hospital Registration</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter hospital name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={location.display_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register Hospital
        </button>
      </form>
    </div>
  );
};

export default HospitalRegisterForm;
