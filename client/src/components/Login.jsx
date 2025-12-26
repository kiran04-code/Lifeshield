import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { 
  Mail, Phone, User, Calendar, 
  ShieldCheck, ArrowRight, RefreshCw, LogIn 
} from "lucide-react";
import Loader from "../utils/Loader";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Sign-up");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [datas, setDatas] = useState({ fullName: "", Number: "", email: "", date: "" });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [load, setLoad] = useState(false);
  
  const { setUser, axios } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  // Sign-Up Logic
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const { data } = await axios.post("/Signup", datas);
      if (data.success) {
        setUser(data.userData);
        toast.success("Welcome to LifeShield!");
        navigate("/parent");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoad(false);
    }
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const { data } = await axios.post("/signin", { email });
      if (data.success) {
        toast.success("OTP sent to your email");
        setShowOtpInput(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("User not found or Server error");
    } finally {
      setLoad(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const { data } = await axios.post("/vrfy", { email, otp });
      if (data.success) {
        setUser(data.userData);
        toast.success("Successfully logged in");
        navigate("/parent");
      } else {
        toast.error(data.message);
        setOtp("");
      }
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#f8fafc] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-[#f8fafc] to-indigo-50">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-[480px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[2.5rem] overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <ShieldCheck className="text-blue-500 mx-auto mb-4" size={42} />
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            {activeTab === "Sign-up" ? "Create Account" : "Access Portal"}
          </h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
            LifeShield Health Systems
          </p>
        </div>

        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === "Sign-up" ? (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSignUpSubmit} 
                className="space-y-4"
              >
                <InputField icon={<User size={18}/>} label="Full Name" name="fullName" type="text" placeholder="John Doe" onChange={handleInputChange} />
                <InputField icon={<Phone size={18}/>} label="Mobile Number" name="Number" type="text" placeholder="+91 00000 00000" onChange={handleInputChange} />
                <InputField icon={<Mail size={18}/>} label="Email Address" name="email" type="email" placeholder="john@example.com" onChange={handleInputChange} />
                <InputField icon={<Calendar size={18}/>} label="Birth Date" name="date" type="date" onChange={handleInputChange} />
                
                <button type="submit" disabled={load} className="w-full bg-blue-600 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-200 mt-4 flex justify-center items-center gap-2">
                  {load ? <Loader size="sm" /> : <>Complete Registration <ArrowRight size={16}/></>}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="signin"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                {!showOtpInput ? (
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <InputField icon={<Mail size={18}/>} label="Registered Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                    <button type="submit" disabled={load} className="w-full bg-blue-600 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2">
                      {load ? <Loader /> : <>Send Verification Code <ArrowRight size={16}/></>}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-2xl mb-4 border border-blue-100">
                      <p className="text-xs font-bold text-blue-700">Code sent to: {email}</p>
                    </div>
                    <InputField icon={<ShieldCheck size={18}/>} label="Enter 6-Digit OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="0 0 0 0 0 0" required />
                    <button type="submit" className="w-full bg-green-600 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                      {load ? <Loader /> : "Verify & Access"}
                    </button>
                    <button type="button" onClick={() => setShowOtpInput(false)} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest flex items-center justify-center gap-2 mx-auto mt-4">
                      <RefreshCw size={12} /> Resend OTP
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab Switcher */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-medium mb-4">
              {activeTab === "Sign-up" ? "Already a member?" : "New to LifeShield?"}
            </p>
            <button
              onClick={() => {
                setActiveTab(activeTab === "Sign-up" ? "Sign-in" : "Sign-up");
                setShowOtpInput(false);
              }}
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-all"
            >
              {activeTab === "Sign-up" ? <><LogIn size={14}/> Switch to Sign In</> : <><User size={14}/> Create New Account</>}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Sub-component for clean inputs
const InputField = ({ icon, label, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 outline-none transition-all"
      />
    </div>
  </div>
);

export default Login;