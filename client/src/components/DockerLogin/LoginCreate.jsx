import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Mail, Smartphone, KeyRound, ArrowRight, ShieldCheck, MailCheck } from 'lucide-react';
import { useDocAuth } from '../../context/dockAuth';
import Loader from '../../utils/Loader';

const LoginCreate = () => {
    const { nameLogin } = useParams();
    const navigate = useNavigate();
    const { axios, setDockterData } = useDocAuth();

    const [formType, setFormType] = useState("Login"); // Login or CreatAccount
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [formData, setFormData] = useState({ email: '', Number: '' });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setFormType(nameLogin);
        setIsOtpSent(false); // Reset OTP state when switching forms
    }, [nameLogin]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // --- LOGIC HANDLERS ---
    const requestOtp = async (e) => {
        e.preventDefault();
        setLoader(true);
        const endpoint = formType === "Login" ? "/loginDoc" : "/Doclogin";
        const payload = formType === "Login" ? { fromsdata: formData } : formData;

        try {
            const { data } = await axios.post(endpoint, payload);
            if (data.success) {
                toast.success(data.message);
                setIsOtpSent(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoader(false);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setLoader(true);
        const endpoint = formType === "Login" ? "/loginVrfy" : "/SignVrfy";
        
        try {
            const { data } = await axios.post(endpoint, { otp: otpValue, fromsdata: formData });
            if (data.success) {
                toast.success(data.message);
                setDockterData(data.userData || data.useData);
                navigate(formType === "Login" ? "/hostpiyalshow" : "/DokcterLogin/CreateProfile");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f8faff] flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-8 md:p-10"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-2xl mb-4 text-[#1057EC]">
                        {isOtpSent ? <MailCheck size={24} /> : <ShieldCheck size={24} />}
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        {isOtpSent ? "Verification Required" : (formType === "Login" ? "Welcome Back" : "Join LifeShield")}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium mt-2">
                        {isOtpSent 
                            ? `We've sent a code to ${formData.email}` 
                            : "Enter your credentials to access the clinical portal."}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {!isOtpSent ? (
                        <motion.form 
                            key="credential-form"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            onSubmit={requestOtp} 
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Official Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="doctor@hospital.com"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-900"
                                        required
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>

                            {formType !== "Login" && (
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Contact Number</label>
                                    <div className="relative group">
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                        <input
                                            type="tel"
                                            name="Number"
                                            placeholder="+91 00000 00000"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-900"
                                            required
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loader}
                                className="w-full bg-[#1057EC] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-2 group"
                            >
                                {loader ? <Loader /> : (
                                    <>
                                        Get OTP Code
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-slate-400 text-sm font-medium">
                                    {formType === "Login" ? "New to the platform?" : "Already have an account?"}
                                    <Link 
                                        to={formType === "Login" ? "/DokcterLogin/CreatAccount" : "/DokcterLogin/Login"} 
                                        className="text-blue-600 font-bold ml-2 hover:underline"
                                    >
                                        {formType === "Login" ? "Create Account" : "Sign In"}
                                    </Link>
                                </p>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form 
                            key="otp-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={verifyOtp} 
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">6-Digit Verification Code</label>
                                <div className="relative group">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        maxLength="6"
                                        placeholder="0 0 0 0 0 0"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-black text-center text-xl tracking-[0.5em] text-blue-600"
                                        required
                                        value={otpValue}
                                        onChange={(e) => setOtpValue(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loader}
                                className="w-full bg-[#1057EC] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                            >
                                {loader ? <Loader /> : "Verify and Continue"}
                            </button>

                            <button 
                                type="button"
                                onClick={() => setIsOtpSent(false)}
                                className="w-full text-slate-400 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors"
                            >
                                Edit Email Address
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Security Footer */}
            <div className="mt-8 flex items-center gap-6 opacity-40 grayscale">
                <img src="/api-partner-1.png" alt="Partner" className="h-6" />
                <img src="/api-partner-2.png" alt="Partner" className="h-6" />
            </div>
        </div>
    );
};

export default LoginCreate;