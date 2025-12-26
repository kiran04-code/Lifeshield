import React, { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { CiHospital1 } from "react-icons/ci";
import { RiParentFill } from "react-icons/ri";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showServiceDrop, setShowServiceDrop] = useState(false);
    const navigate = useNavigate();

    const NavLink = ({ to, children, hasArrow = true, ...props }) => (
        <Link 
            to={to} 
            className='group flex items-center gap-1.5 px-4 py-2 text-[#1057EC] font-semibold hover:bg-blue-50 rounded-xl transition-all duration-300'
            {...props}
        >
            {children}
            {hasArrow && (
                <motion.span animate={{ y: 0 }} whileHover={{ y: 3 }}>
                    <IoIosArrowDown className='text-sm group-hover:text-blue-700' />
                </motion.span>
            )}
        </Link>
    );

    return (
        <nav className='sticky top-0 z-[100] w-full bg-[#E0EAFF]/80 backdrop-blur-md border-b border-blue-100'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-20'>
                    <div className='flex-shrink-0'>
                        <img 
                            src="/logi2-removebg-preview.png" 
                            alt="Logo" 
                            className='w-48 h-auto cursor-pointer hover:opacity-80 transition' 
                            onClick={() => navigate("/")}
                        />
                    </div>

                    <div className='hidden md:flex items-center gap-2'>
                        <NavLink to="/" hasArrow={false}>Home</NavLink>
                        <NavLink to="#about" hasArrow={false}>About</NavLink>
                        <NavLink to="#contact" hasArrow={false}>Contact</NavLink>

                        <div 
                            className='relative'
                            onMouseEnter={() => setShowServiceDrop(true)}
                            onMouseLeave={() => setShowServiceDrop(false)}
                        >
                            <button className='flex items-center gap-1.5 px-4 py-2 text-[#1057EC] font-semibold hover:bg-blue-50 rounded-xl transition-all'>
                                Services <IoIosArrowDown className={`transition-transform duration-300 ${showServiceDrop ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showServiceDrop && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className='absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-blue-100 border border-blue-50 p-2 overflow-hidden'
                                    >
                                        <ServiceItem icon={<RiParentFill />} label="For Parents" onClick={() => { navigate("/parent"); setShowServiceDrop(false); }} />
                                        <ServiceItem icon={<CiHospital1 />} label="For Hospital" onClick={() => { navigate("/docter"); setShowServiceDrop(false); }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className='md:hidden'>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='p-2 text-[#1057EC] text-2xl hover:bg-blue-100 rounded-lg transition'>
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className='md:hidden bg-white border-b border-blue-100 overflow-hidden'>
                        <div className='flex flex-col p-4 gap-2'>
                            <MobileNavLink to="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavLink to="#about" label="About" onClick={() => setIsMobileMenuOpen(false)} />
                            <div className='py-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest'>Our Services</div>
                            <div className='grid grid-cols-2 gap-3 pb-4'>
                                <div onClick={() => { navigate("/parent"); setIsMobileMenuOpen(false); }} className='flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl text-[#1057EC] font-bold'>
                                    <RiParentFill size={24} /> <span className='text-xs'>Parents</span>
                                </div>
                                <div onClick={() => { navigate("/docter"); setIsMobileMenuOpen(false); }} className='flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl text-[#1057EC] font-bold'>
                                    <CiHospital1 size={24} /> <span className='text-xs'>Hospitals</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const ServiceItem = ({ icon, label, onClick }) => (
    <div onClick={onClick} className='flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl cursor-pointer text-gray-700 font-medium transition-colors group'>
        <span className='p-2 bg-blue-100 text-[#1057EC] rounded-lg group-hover:bg-[#1057EC] group-hover:text-white transition-colors'>{icon}</span>
        {label}
    </div>
);

const MobileNavLink = ({ to, label, onClick }) => (
    <Link to={to} onClick={onClick} className='w-full py-3 px-4 text-lg font-bold text-[#1057EC] hover:bg-blue-50 rounded-xl transition'>{label}</Link>
);

export default Navbar;