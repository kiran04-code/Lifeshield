import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaQuestionCircle, 
  FaSignOutAlt, 
  FaCheckCircle, 
  FaHospital 
} from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { useDocAuth } from '../../../context/dockAuth';

/**
 * Dropdown Menu Component
 */
const BarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hostpitaldata, axios } = useDocAuth();

  const handleLogout = async () => {
    try {
      await axios.get("/DocterLogout");
      navigate('/docter');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className='absolute top-16 right-0 w-72 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden'
    >
      <div className='p-4'>
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg text-blue-600">
            <FaUser />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-semibold text-gray-800 truncate">
              Dr. {hostpitaldata?.fname} {hostpitaldata?.lname}
            </h2>
            <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">
              Verified <FaCheckCircle size={10} />
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <ul className='mt-3 space-y-1 text-sm text-gray-700 font-medium'>
          <Link 
            className="flex items-center gap-3 hover:bg-gray-50 p-2.5 rounded-lg transition-colors" 
            to={`/DoctorDashboard/${id}/Profile`}
          >
            <FaUser className="text-gray-400" /> My Profile
          </Link>
          <li className="flex items-center gap-3 hover:bg-gray-50 p-2.5 rounded-lg cursor-pointer transition-colors">
            <FaCalendarAlt className="text-gray-400" /> My Availability
          </li>
          <li className="text-blue-600 hover:bg-blue-50 p-2.5 rounded-lg cursor-pointer transition-colors">
            Schedule Meeting
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-100 p-2.5 rounded-lg justify-between cursor-pointer transition-colors">
            <div className='flex items-center gap-3'><FaQuestionCircle className="text-gray-400" /> Support</div>
            <span className="text-[10px] text-white bg-green-500 px-2 py-0.5 rounded-full uppercase font-bold">New</span>
          </li>
        </ul>

        {/* Footer */}
        <div className='mt-3 border-t pt-2'>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full p-2.5 rounded-lg transition-colors font-semibold"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Main Homepage Component
 */
const Homepage = () => {
  const { hostpitaldata, docterdata, hostpitaldataworkspace } = useDocAuth();
  const [isOpen, setIsopen] = useState(false);
  const { id } = useParams();

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className="md:hidden h-screen flex flex-col justify-center items-center bg-white text-center px-8">
        <CiWarning className="text-6xl text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800">Desktop Access Only</h2>
        <p className="text-gray-500 mt-2">
          The Lifeshield Dashboard is optimized for clinical environments on larger screens.
        </p>
      </div>

      <div className="hidden md:block">

        <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold">
              <FaCalendarAlt />
              <span>{new Date().toDateString()}</span>
            </div>
            <div className="flex items-center bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full gap-2 text-xs font-medium text-gray-600">
              <FaHospital className="text-blue-500" />
              <span>{hostpitaldataworkspace?.hospitalName || "Not Registered"}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="Search patients or records..."
              className="bg-gray-100 border-none px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
            />

            <div className="relative">
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsopen(!isOpen)}
              >
                <div className="bg-indigo-600 rounded-lg w-9 h-9 flex items-center justify-center text-white font-bold shadow-md group-hover:bg-indigo-700 transition-colors">
                  {hostpitaldata?.fname?.charAt(0) || "D"}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-sm leading-tight">
                    Dr. {hostpitaldata?.fname}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    Practitioner <IoIosArrowDown className='mt-0.5' />
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {isOpen && <BarPage />}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* Hero / Welcome Section */}
        <main className="flex flex-col justify-center items-center py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="text-center max-w-3xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex justify-center mb-6"
            >
              <div className="p-5 bg-white rounded-3xl shadow-xl border border-gray-50">
                <FaHospital className="text-indigo-600 text-6xl" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Welcome to <span className="text-indigo-600">Lifeshield</span>
            </h1>

            {docterdata?.hospitalRegistered ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                  Thank you for registering. Your workspace for <strong>{hostpitaldataworkspace?.hospitalName}</strong> is ready. 
                  Start managing vaccinations and patient records from the sidebar.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto">
                  Join our mission to make healthcare accessible. Register your clinic today to start tracking vaccinations.
                </p>
                <Link
                  to={`/docter/${id}`}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-indigo-200 hover:-translate-y-1"
                >
                  Register Your Hospital
                </Link>
              </div>
            )}
          </div>
        </main>

        <footer className="text-center py-10 text-xs font-medium text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Lifeshield Clinical Systems
        </footer>
      </div>
    </div>
  );
};

export default Homepage;