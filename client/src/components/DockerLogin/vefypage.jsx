'use client'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader3 from '../../utils/Loder3';
import Loader2 from '../../utils/Loader2';
import Loader from '../../utils/Loader';
import { useDocAuth } from '../../context/dockAuth';

const VerifyPage = () => {
  const {hostpitaldataworkspace} = useDocAuth()
  const navigate = useNavigate();
    const { id } = useParams()
  if(hostpitaldataworkspace?.verify=== true){
    navigate(`/DokcterdashBord/${id}`)
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Registration Received
        </h2>
        <p className="text-gray-700 text-lg font-medium">
          Your request to register your hospital with <span className="font-semibold text-blue-600">Lifeshield</span> has been received.
          <br />
          Please wait while we verify your account.
          <br />
          This process may take up to <span className="font-semibold text-blue-500">5 minutes</span>.
        </p>
        <div className="mt-6">
         <Loader/>
          <span className="text-sm text-gray-500">Verifying...</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
