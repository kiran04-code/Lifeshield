import React from 'react'
import { useNavigate } from 'react-router-dom'
const DocterService = () => {
    const navigate = useNavigate()
    const services = [
        {
           h1:"Nearby Doctor Visibility",
           p1:"Get discovered by patients in your local area, increasing reach and trust",
           p2:" Expand your practice by appearing in patient searches instantly.",
           p3:"Boost credibility with verified profiles and patient reviews.",
           path:"Nearby"
        },
        {
           h1:"Appointment Booking",
           p1:"Allow patients to book appointments online at their convenience, reducing scheduling conflicts",
           p2:"Manage your availability with flexible time slots and instant updates.",
           p3:"Save time with automated reminders that lower no-shows.",
           path:"Appointment"
        },
        {
           h1:"Video Consultation",
           p1:"Offer secure online video consultations, making healthcare accessible anytime, anywhere.",
           p2:" Provide quick follow-ups, second opinions, and emergency guidance.",
           p3:"All calls are encrypted with digital prescriptions and patient history support.",
           path:"Video Consultation"
        },
        {
           h1:"Vaccine Management",
           p1:"Easily track available vaccines in your hospital and update stock in real time.",
           p2:"If vaccines are out of stock, connect with nearby hospitals to arrange supply.",
           p3:"Ensure patients never miss essential vaccinations through smart reminders.",
           path:"Vaccine"
        },
    ]


    return (
        <div className='flex flex-col p-3 bg-gray-50'>
            <div className='flex justify-center items-center'>
                <h1 className='text-2xl font-bold text-blue-500'>Services we offer</h1>
            </div>
            <div className='md:flex md:flex-row flex flex-col md:gap-5 gap-5 md:justify-center justify-center items-center mt-5'>
               {
                services.map((data)=>(
                    <div className="w-60 h-70 bg-blue-100 rounded-xl p-4 shadow-md">
                    <h1 className="text-xl font-bold text-blue-600 mb-2">
                    
                        {data.h1}
                    </h1>
                    <p className="text-[13px] text-gray-700 leading-relaxed">
                  
                     {data.p1}
                    </p>
                    <p className="text-[13px] text-gray-700 leading-relaxed">
                      
                        {data.p2}
                    </p>
                    <p className="text-[13px] text-gray-700 leading-relaxed">
                     
                      {data.p3}
                    </p>
                    <button onClick={()=>navigate(`/docter/${data.path}`)} className='bg-blue-500 p-2 text-[13px]  text-white rounded-xl shadow-lg'>Learn More </button>
                </div>
                ))
               }      
            </div>
        </div>
    )
}

export default DocterService
