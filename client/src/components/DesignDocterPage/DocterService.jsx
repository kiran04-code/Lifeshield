import React from 'react'
import { useNavigate } from 'react-router-dom'

const DocterService = () => {
  const navigate = useNavigate()
  const services = [
    {
      h1: "Nearby Doctor Visibility",
      p1: "Get discovered by patients in your local area, increasing reach and trust.",
      p2: "Expand your practice by appearing in patient searches instantly.",
      p3: "Boost credibility with verified profiles and patient reviews.",
      path: "Nearby",
    },
    {
      h1: "Appointment Booking",
      p1: "Allow patients to book appointments online at their convenience, reducing scheduling conflicts.",
      p2: "Manage your availability with flexible time slots and instant updates.",
      p3: "Save time with automated reminders that lower no-shows.",
      path: "Appointment",
    },
    {
      h1: "Video Consultation",
      p1: "Offer secure online video consultations, making healthcare accessible anytime, anywhere.",
      p2: "Provide quick follow-ups, second opinions, and emergency guidance.",
      p3: "All calls are encrypted with digital prescriptions and patient history support.",
      path: "Video Consultation",
    },
    {
      h1: "Vaccine Management",
      p1: "Easily track available vaccines in your hospital and update stock in real time.",
      p2: "If vaccines are out of stock, connect with nearby hospitals to arrange supply.",
      p3: "Ensure patients never miss essential vaccinations through smart reminders.",
      path: "Vaccine",
    },
  ]

  return (
    <div className="flex flex-col bg-gray-50 px-6 py-10">
      {/* Heading */}
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-500 text-center">
          Services We Offer
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 place-items-center">
        {services.map((data, index) => (
          <div
            key={index}
            className="w-full max-w-xs bg-blue-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
          >
            <h1 className="text-lg md:text-xl font-bold text-blue-600 mb-2 text-center">
              {data.h1}
            </h1>
            <p className="text-[13px] md:text-sm text-gray-700 leading-relaxed mb-1">
              {data.p1}
            </p>
            <p className="text-[13px] md:text-sm text-gray-700 leading-relaxed mb-1">
              {data.p2}
            </p>
            <p className="text-[13px] md:text-sm text-gray-700 leading-relaxed mb-3">
              {data.p3}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate(`/docter/${data.path}`)}
                className="bg-blue-500 px-4 py-2 text-[13px] md:text-sm text-white rounded-xl shadow-lg hover:bg-blue-600 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocterService
