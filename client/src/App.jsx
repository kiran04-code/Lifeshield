import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomaPage from './pages/HomaPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DocterPage from './pages/DocterPage'
import ParentPage from './pages/ParentPage'
import FeatureLayout from './components/parent/FeatureLayout'
import NearCenterInfo from './components/parent/NearCenterInfo'
import NeareByVideoClles from './components/parent/VideoCallConsultationInfo'
import { useAuth } from './context/auth'
import Login from './components/Login'
import ProfilePage from './components/Profile/ProfilePage'
import UserInfo from './components/Profile/components/UserInfo'
import SlotInfo from './components/Profile/components/SlotInfo'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound/NotFound'
import ProtectedRoute from './privteRoute/p01'
import 'react-toastify/dist/ReactToastify.css';
import NearVaccineCenter from './pages/NearVaccineCenter'
import Hospitaldetail from './components/NearByCenter/components/hospitaldetail'
import DockerLogin from './components/DockerLogin/DockerLoginpage'
import LoginCreate from './components/DockerLogin/LoginCreate'
import CreatAccount from './components/DockerLogin/DashBoad'
import CreateProfile from './components/DockerLogin/Hospitalregister'
import DashBoad from './components/DockerLogin/DashBoad'
import ProtechRouteToDocterPage from './privteRoute/P02'
import HostShowPage from './components/DockerLogin/HostShowPage'
import Homepage from './components/DockerLogin/docterAdminComponents/Homepage'
import Appoinments from './components/DockerLogin/docterAdminComponents/Appoinments'
import Chat from './components/DockerLogin/docterAdminComponents/Chat'
import Report from './components/DockerLogin/docterAdminComponents/Report'
import Patient from './components/DockerLogin/docterAdminComponents/Patient'
import Profile from './components/DockerLogin/docterAdminComponents/Profile/Profile'
import HospitalRegisterForm from './components/DockerLogin/HostpitalAdded'
import VaccinationSlot from './components/BookSlotforUser/VaccinationSlot'
import Admin from './LifeshieldAdmin/Admin'
import Vefypage from './components/DockerLogin/vefypage'
import MeetBooking from './components/Profile/components/meetBooking'
import Index from './components/DockerLogin/Room/Index'
import AboutPage from './components/AboutSection/AboutPage'


function App() {
  const { User } = useAuth()
  const isAdmin = location.pathname === '/lifeshield/admin';
  console.log(isAdmin)
  return (

    <BrowserRouter>
      <ToastContainer />

      {
        isAdmin ? null : <Navbar />
      }
      <Routes>

        <Route path='/' element={<HomaPage />} />
        <Route path='/DokcterLogin' element={<DockerLogin />} />
        <Route path='/hostpiyalshow' element={<HostShowPage />} />
        <Route path='/DokcterLogin/CreateProfile' element={<ProtechRouteToDocterPage />} />
        <Route path='/DokcterLogin/:nameLogin' element={<LoginCreate />} />
        <Route path='/DokcterdashBord/:id/register-hospital' element={<HospitalRegisterForm />} />
        <Route path='/DokcterdashBord/:id' element={<DashBoad />}>
          <Route index element={<Homepage />} />
          <Route path='/DokcterdashBord/:id/patient' element={<Patient />} />
          <Route path='/DokcterdashBord/:id/Chat' element={<Chat />} />
          <Route path='/DokcterdashBord/:id/Profile' element={<Profile />} />
          <Route path='/DokcterdashBord/:id/Reports' element={<Report />} />
          <Route path='/DokcterdashBord/:id/Appointments' element={<Appoinments />} />
        </Route>
        {/*  verfy page */}
        <Route path='/DokcterdashBord/:id/docter/verfyDocter' element={<Vefypage />} />
        {/*  ABOUTE THE BOOKING OR CREATE  SLOT  */}
        <Route path='/docter' element={<DocterPage />} />
        <Route path='/lifeshield/admin' element={<Admin />} />
        <Route path='/hospital/:name/VaccinationSlot' element={<VaccinationSlot />} />
        <Route path='/parent/NearVaccineCenter' element={<NearVaccineCenter />} />
        <Route path='/hospital/:name' element={<Hospitaldetail />} />
        <Route path='/AboutPage' element={<AboutPage/>} />
        <Route path='/login' element={<Login />} />
        {/*  profile oulter */}
        <Route path='/profile' element={<ProtectedRoute />} >
          <Route index element={<UserInfo />} />
          <Route path='SlotInfo' element={<SlotInfo />} />
          <Route path='meetBooking' element={<MeetBooking />} />
        </Route>

        <Route path='/parent' element={<ParentPage />}>
          <Route index element={<NearCenterInfo />} />
          <Route path="DocterCalls" element={<NeareByVideoClles />} /> 
        </Route>
         {/* Room Routes */}
          <Route path="/Room/:roomId" element={<Index />} />
      </Routes>
      {
        isAdmin ? null : <Footer />
      }

    </BrowserRouter>
  )
}

export default App
