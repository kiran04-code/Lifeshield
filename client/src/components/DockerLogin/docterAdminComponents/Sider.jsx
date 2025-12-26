import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Syringe, 
  MessageSquare, 
  BarChart3, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sider = () => {
    const { id } = useParams();
    const location = useLocation();

    const sidebarLinks = [
        { 
            name: "Dashboard", 
            path: `/DokcterdashBord/${id}`, 
            icon: <LayoutDashboard size={20} /> 
        },
        { 
            name: "Telehealth Meetings", 
            path: `/DokcterdashBord/${id}/patient`, 
            icon: <Video size={20} /> 
        },
        { 
            name: "Vaccine Inventory", 
            path: `/DokcterdashBord/${id}/Appointments`, 
            icon: <Syringe size={20} /> 
        },
    ];

    return (
        <div className="w-20 md:w-72 h-screen border-r border-slate-100 bg-white flex flex-col sticky top-0">
            {/* Logo Section */}
            <div className="p-6 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <span className="font-black text-xl">L</span>
                    </div>
                    <span className="hidden md:block font-black text-slate-800 tracking-tight text-xl">
                        LifeShield<span className="text-blue-600">.</span>
                    </span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-2">
                {sidebarLinks.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            to={item.path}
                            key={index}
                            className={`flex items-center py-3.5 px-4 rounded-2xl transition-all duration-200 group gap-4
                                ${isActive 
                                    ? "bg-blue-50 text-blue-600 shadow-sm" 
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <div className={`${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                                {item.icon}
                            </div>
                            <span className="hidden md:block font-bold text-sm tracking-wide flex-1">
                                {item.name}
                            </span>
                            {isActive && <ChevronRight size={14} className="hidden md:block" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section: Profile/Logout */}
            <div className="p-4 border-t border-slate-50">
                <button className="w-full flex items-center py-3.5 px-4 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all gap-4 group">
                    <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-300" />
                    <span className="hidden md:block font-bold text-sm uppercase tracking-widest">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sider;