import { motion } from 'framer-motion';
import React from 'react';
import { useAuth } from '../context/auth';
const Login = () => {
    const {setIsLOG} = useAuth()
  return (
    <div onClick={()=>setIsLOG(false)} className="fixed inset-0  backdrop-blur-[10px] bg-opacity-30 flex justify-center items-center z-50 p-4">
      <motion.div
        animate={{ y: [200, 0] }}
        transition={{ duration: 0.5 }}
        className="w-full sm:w-[400px] md:w-[500px] h-[600px] bg-[#E0EAFF]  rounded-2xl shadow-lg"
      >
        {/* Add your login form content here */}
           <h1 className='text-xl text-center font-bold mt-10'>LifeShield</h1>
      </motion.div>
    </div>
  );
};

export default Login;
