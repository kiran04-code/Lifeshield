import React, { useState } from 'react';
import { useDocAuth } from '../../context/dockAuth';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  Smartphone, 
  Mail, 
  ChevronRight, 
  Stethoscope 
} from 'lucide-react';
import Loader from '../../utils/Loader';

const CreateProfile = () => {
  const [isloading, setisloading] = useState(false);
  const { docterdata } = useDocAuth();
  const [formData, setFormData] = useState({});
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  const { axios } = useAuth();

  const genderOptions = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
    { name: "Other", value: "Other" },
  ];

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gender) return toast.error("Please select your gender");
    
    setisloading(true);
    try {
      const { data } = await axios.post("/HostkRegister", { 
        from: formData, 
        Gender: gender 
      });
      
      if (data.success) {
        toast.success(data.message);
        navigate("/hostpiyalshow");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to update profile");
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <Stethoscope size={300} className="text-blue-600" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white max-w-lg w-full rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-8 md:p-12 relative z-10 border border-slate-100"
      >
        {/* Header */}
        <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Step 1: Personal Details
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-4 tracking-tight">
                Complete Your <span className="text-[#1057EC]">Profile.</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-2">
                Set up your professional identity on the LifeShield network.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                <User size={14} /> Full Name
            </label>
            <div className="grid grid-cols-12 gap-3">
              <select className="col-span-3 px-3 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 font-bold focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
                <option>Dr.</option>
                <option>Mr.</option>
                <option>Ms.</option>
              </select>
              <input 
                type="text" 
                name="fname" 
                placeholder="First" 
                onChange={handleFormData}
                className="col-span-9 px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium" 
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                name="Mname" 
                placeholder="Middle (Optional)" 
                onChange={handleFormData}
                className="px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium text-sm" 
              />
              <input 
                type="text" 
                name="lname" 
                placeholder="Last" 
                onChange={handleFormData}
                className="px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium text-sm" 
                required
              />
            </div>
          </div>

          {/* Gender Pills */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Gender Identification</label>
            <div className="flex gap-2">
              {genderOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGender(opt.value)}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border ${
                    gender === opt.value 
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "bg-white border-slate-100 text-slate-500 hover:border-blue-200"
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* DOB */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                <Calendar size={14} /> Date of Birth
            </label>
            <input 
                type="date" 
                name="date" 
                onChange={handleFormData} 
                className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium text-slate-700" 
                required
            />
          </div>

          {/* Contact Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    <Smartphone size={14} /> Mobile
                </label>
                <div className="px-4 py-4 bg-slate-100 border border-slate-100 rounded-2xl text-slate-500 font-bold text-sm">
                    +91 {docterdata?.Number}
                </div>
            </div>
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    <Mail size={14} /> Email
                </label>
                <div className="px-4 py-4 bg-slate-100 border border-slate-100 rounded-2xl text-slate-500 font-bold text-sm truncate">
                    {docterdata?.email}
                </div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            type="submit"
            disabled={isloading}
            className="w-full mt-6 bg-[#1057EC] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 group"
          >
            {isloading ? <Loader /> : (
                <>
                    Continue to Registration <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProfile;