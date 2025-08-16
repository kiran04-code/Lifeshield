import React from 'react'
import { useNavigate } from 'react-router-dom'
const HowTOcreateWrokSpace = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="bg-gray-50 py-16 px-6 md:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-blue-600">How It Works</h2>
                    <p className="mt-3 text-gray-600 text-lg">
                        A simple 3-step process to get started with our app
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
                        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                            1
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Sign Up</h3>
                        <p className="mt-2 text-gray-600">
                            Create your account with just a few details to get started.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
                        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                            2
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Create Profile as Docter</h3>
                        <p className="mt-2 text-gray-600">
                            Doctors are verified through official medical licenses and Aadhaar numbers.
                            Only eligible and certified doctors can join and provide healthcare services.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
                        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                            3
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Regsiter Hospital</h3>
                        <p className="mt-2 text-gray-600">
                            Hospitals are verified through APIs to ensure authenticity and trust.
                            Once verified, within 5 minutes you get your workplace ready to start working.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button onClick={() => { navigate("/DokcterLogin"); scrollTo(0, 0) }} className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HowTOcreateWrokSpace
