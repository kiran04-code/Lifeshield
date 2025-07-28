import React from 'react';
import { useState } from 'react';
import { FaUserMd, FaRegChartBar, FaComments, FaUserInjured, FaCalendarAlt } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlineVaccines } from "react-icons/md";
const Sider = () => {
    const {id} = useParams()
    const [state,setState] = useState('')
    const sidebarLinks = [
        { name: `DokcterdashBord`, path: `/DokcterdashBord/${id}`, icon: <FaUserMd className="w-5 h-5" /> },
        { name: "Meeting Appointments", path: `/DokcterdashBord/${id}/patient `, icon: <IoVideocamOutline className="w-5 h-5" /> },
        { name: "Vaccine Appointments", path: `/DokcterdashBord/${id}/Appointments`, icon: <MdOutlineVaccines className="w-5 h-5" /> },
        // { name: "Chat", path: `/DokcterdashBord/${id}/Chat`, icon: <FaComments className="w-5 h-5" /> },
        // { name: "Reports", path: `/DokcterdashBord/${id}/Reports`, icon: <FaRegChartBar className="w-5 h-5" /> },
    ];

    return (
        <>

            {/* Sidebar */}
            <div className="md:w-64 w-16 h-[calc(100vh-56px)] hidden border-r border-gray-200 bg-white text-base pt-4 md:flex md:flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        onClick={()=>setState(item.name)}
                        className={`flex items-center py-3 px-4 gap-4 
                            ${index === 0
                                ? "bg-indigo-100 text-indigo-600 font-semibold border-r-4 border-indigo-500"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        {item.icon}
                        <span className="md:block hidden">{item.name}</span>
                        
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sider;
