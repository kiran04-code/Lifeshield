import React from 'react'
import Left from './components/left'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const ProfilePage = () => {
    const { User } = useAuth()
    const firstName = User?.fullName ? User.fullName.split(" ")[0] : "User";

    return (
        <div className='flex flex-col md:flex-row w-full min-h-screen bg-[#F3F6FF]'>
            <aside className='md:w-72 w-full bg-white md:min-h-screen shadow-xl z-10'>
                <div className="p-6 border-b border-gray-100 hidden md:block">
                    <h2 className="text-xl font-bold text-blue-800 tracking-tight">LifeShield</h2>
                    <p className="text-xs text-gray-400">Patient Dashboard</p>
                </div>
                <Left />
            </aside>

            <main className='flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto'>
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">👋</span>
                            <h1 className='text-3xl font-extrabold text-gray-800'>
                                Hello, <span className="text-blue-600">{firstName}!</span>
                            </h1>
                        </div>
                        <p className="text-gray-500 text-sm">Welcome back to your health overview.</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full shadow-sm border border-gray-100 self-start">
                        <div className="bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                            {User?.fullName?.charAt(0)}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-bold text-gray-800 leading-tight">{User?.fullName}</p>
                            <p className="text-[10px] text-blue-600 uppercase font-semibold tracking-wider">Verified Account</p>
                        </div>
                    </div>
                </header>

                <div className='bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[70vh] p-6 md:p-8 relative overflow-hidden'>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -z-0 pointer-events-none"></div>
                    <div className="relative z-10">
                        <Outlet />
                    </div>
                </div>
                
                <footer className="mt-8 text-center text-gray-400 text-xs">
                    &copy; 2024 Lifeshield Health Systems • Privacy Protected
                </footer>
            </main>
        </div>
    )
}

export default ProfilePage