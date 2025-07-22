import React, { useState } from 'react';

const CreateProfile = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    // Basic mobile validation for India
    const valid = /^[6-9]\d{9}$/;
    if (!valid.test(value)) {
      setPhoneError('Mobile number should be valid');
    } else {
      setPhoneError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#85acff] px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-800">Create Profile with <p className='text-blue-600'>LifeShield</p></h2>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Help us maintain our medical community’s integrity with verified credentials.
        </p>

        {/* Name Fields */}
        <div className="flex space-x-2 mb-4">
          <select className="w-1/4 px-2 py-2 border rounded bg-yellow-50 text-gray-800">
            <option>Dr</option>
          </select>
          <input type="text" placeholder="First" className="w-1/3 px-3 py-2 border rounded bg-yellow-50" />
          <input type="text" placeholder="Middle" className="w-1/3 px-3 py-2 border rounded bg-yellow-50" />
          <input type="text" placeholder="Last" className="w-1/3 px-3 py-2 border rounded bg-yellow-50" />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border rounded-full text-gray-700 hover:bg-blue-100">Male</button>
            <button className="px-4 py-2 border rounded-full text-gray-700 hover:bg-blue-100">Female</button>
            <button className="px-4 py-2 border rounded-full text-gray-700 hover:bg-blue-100">Other</button>
          </div>
        </div>

        {/* DOB */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Date of birth</label>
          <input type="date" className="w-full px-4 py-2 border rounded bg-white" />
        </div>

        {/* Phone Number */}
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1">Mobile Number With Country Code</label>
          <div className="flex">
            <select className="px-3 py-2 border rounded-l bg-white text-gray-800">
              <option>IN</option>
              <option>US</option>
              <option>UK</option>
            </select>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="07774025744"
              className="w-full px-4 py-2 border border-l-0 rounded-r bg-yellow-50"
            />
          </div>
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            defaultValue="kiran.rathod24@vit.edu"
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-600"
            readOnly
          />
        </div>
        <button className="w-full bg-[#004bec] text-white font-medium py-2 rounded hover:bg-[#6978b9] transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateProfile;
