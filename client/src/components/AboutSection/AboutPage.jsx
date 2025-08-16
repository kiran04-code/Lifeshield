import React from 'react'
import { FaTwitter, FaLinkedin } from "react-icons/fa";
const AboutPage = () => {

    const Team = [
        {
            name: "kiran Rathod",
            role: "Technical Lead",
            linkDEnLink: "https://www.linkedin.com/in/kiran-rathod-66b009331/",
            img:"kk-removebg-preview.png"
        },
        {
            name: "Vedant Polawar",
            role: "Research Lead",
            linkDEnLink: "https://www.linkedin.com/in/vedant-polawar-aa897a331/",
            img:"/vedant-removebg-preview.png"
        },
        {
            name: "Ganesh Rayphale",
            role: "Research Co-Lead",
            linkDEnLink: "https://www.linkedin.com/in/ganesh-rayphale/",
            img:"/ganu-removebg-preview.png"
        },
    ]
    return (
        <div>
            <div className='flex justify-center items-center mt-10 flex-col gap-5'>
                <h1 className='md:text-3xl text-xl text-center font-medium'>Innovators and caregivers working together for a healthier India</h1>
                <p className='text-blue-400 underline'>Founding Team!</p>
            </div>
            <div className=''>
                <div className='md:flex md:flex-row  flex-col flex justify-center items-center md:justify-center items-center mt-5'>
                    {
                        Team.map((data) => (
                            <div className="flex flex-col items-center rounded-2xl p-4 w-64">
                                {/* Image */}
                                <div className="w-52 h-52 rounded-xl overflow-hidden mb-3 bg-blue-100  ">
                                    <img src={data.img} alt={"img"} className="w-full h-full object-cover" />
                                </div>

                                {/* Name & Role */}
                                <h2 className="text-lg font-semibold">{data.name}</h2>
                                <p className="text-gray-500 text-sm mb-3">{data.role}</p>

                                {/* Social Icons */}
                                <div className="flex space-x-4 text-gray-600">

                                    <a href={`${data.linkDEnLink}`} className="hover:text-blue-700">
                                        <FaLinkedin size={20} />
                                    </a>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AboutPage
