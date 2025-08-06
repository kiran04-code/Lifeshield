import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDocAuth } from '../../context/dockAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../utils/Loader'
import { FaEnvelope } from "react-icons/fa";
const LoginCreate = () => {
    const { nameLogin } = useParams()
    const [froms, setFrom] = useState("Login")
    const [loginotp, setloginotp] = useState(false)
    const [signupotp, setsignupOTP] = useState(false)
    const [otpsignup, setotpsignup] = useState('')
    const [otplogin, setotplogin] = useState('')
    const [fromsdata, setFromdata] = useState({})
    const [loader, isloder] = useState(false)
    const { axios, setDockterData, docterdata, hostpitaldata } = useDocAuth()
    const navigate = useNavigate()
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFromdata({ ...fromsdata, [name]: value })
    }
    const handleSignupdata = async (e) => {
        e.preventDefault()
        isloder(true)
        try {
            const { data } = await axios.post("/Doclogin", fromsdata)
            if (data.success) {
                toast.success(data.message)
                setsignupOTP(true)
                isloder(false)
            }
            else {
                toast.error(data.message)
                isloder(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const hnadleSignupVerfy = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/SignVrfy", { otp: otpsignup, fromsdata })
            if (data.success) {
                toast.success(data.message)
                setDockterData(data.useData)
                navigate("/DokcterLogin/CreateProfile")
            }
            else {
                toast.error(data.message)
                setDockterData(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        isloder(true)
        try {
            const { data } = await axios.post("/loginDoc", { fromsdata })
            if (data.success) {
                toast.success(data.message)
                setloginotp(true)
                isloder(false)
            }
            else {
                toast.error(data.message)
                setDockterData(null)
                setloginotp(true)
                isloder(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const verfyLogin = async (e) => {
        e.preventDefault()
        isloder(true)
        try {
            const { data } = await axios.post("/loginVrfy", { otp: otplogin, fromsdata })
            if (data.success) {
                toast.success(data.message)
                setDockterData(data.userData)
                isloder(false)
                navigate("/hostpiyalshow")
            }
            else {
                toast.error(data.message)
                setDockterData(null)
                isloder(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(otplogin)
    useEffect(() => {
        setFrom(nameLogin)
    }, [nameLogin])
    return (
        <div className="w-full min-h-screen bg-white flex justify-center items-center px-4">
            {froms === "Login" ? (
                <div className="flex flex-col gap-5 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-blue-600 text-center">Lifeshield</h1>
                    <div className="p-6 sm:p-8 bg-white shadow-xl border border-gray-300 rounded-2xl w-full">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{nameLogin}</h2>

                        {!loginotp ? (
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <p className="text-base sm:text-lg text-gray-700 mb-2">Email</p>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                        name="email"
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 py-3 text-white rounded-xl font-semibold hover:bg-blue-600 transition duration-200 text-lg"
                                >
                                    {loader ? <Loader /> : "Login"}
                                </button>

                                <div className="text-center mt-5 text-base">
                                    <p>
                                        Don't have an Account?{" "}
                                        <Link className="text-blue-600 underline" to={"/DokcterLogin/CreatAccount"}>
                                            Signup
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={verfyLogin}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">OTP</label>
                                    <input
                                        type="tel"
                                        onChange={(e) => setotplogin(e.target.value)}
                                        placeholder="Enter your email OTP"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                        value={otplogin}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition duration-200"
                                >
                                    {loader ? <Loader /> : "Verify OTP"}
                                </button>

                                <div className="fixed top-28 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-lg flex items-center gap-3 animate-slide-in max-w-xs">
                                    <FaEnvelope className="text-xl" />
                                    <p className="text-sm font-bold text-blue-600">OTP is sent to your respective EMAIL</p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-300 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{nameLogin}</h2>

                    {signupotp ? (
                        <form onSubmit={hnadleSignupVerfy}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">OTP</label>
                                <input
                                    type="tel"
                                    onChange={(e) => setotpsignup(e.target.value)}
                                    placeholder="Enter your OTP"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                    name="otp"
                                    value={otpsignup}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition duration-200"
                            >
                                Verify Account
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupdata}>
                            <div className="mb-4">
                                <p className="text-base sm:text-lg text-gray-700 mb-2">Email</p>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                    name="email"
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="mb-4">
                                <p className="text-base sm:text-lg text-gray-700 mb-2">Number</p>
                                <input
                                    type="tel"
                                    placeholder="Enter your Number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                    name="Number"
                                    onChange={handleOnChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 py-3 text-white rounded-xl font-semibold hover:bg-blue-600 transition duration-200"
                            >
                                {loader ? <Loader /> : "Create Account"}
                            </button>

                            <div className="text-center mt-5 text-base">
                                <p>
                                    Already have an account?{" "}
                                    <Link className="text-blue-600 underline" to={"/DokcterLogin/Login"}>
                                        Signin
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>

    )
}

export default LoginCreate
