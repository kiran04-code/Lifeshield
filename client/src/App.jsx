import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import {ToastContainer} from "react-toastify"
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
import HostpitalAdded from './components/DockerLogin/HostpitalAdded'
import HospitalRegisterForm from './components/DockerLogin/HostpitalAdded'

function App() {
  const {User} = useAuth()
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Navbar />
      <Routes>
         
        <Route path='/' element={<HomaPage />} />
        <Route path='/DokcterLogin' element={<DockerLogin/>} />
        <Route path='/hostpiyalshow' element={<HostShowPage/>} />
        <Route path='/DokcterLogin/CreateProfile' element={<ProtechRouteToDocterPage/>} />
        <Route path='/DokcterLogin/:nameLogin' element={<LoginCreate/>} />
        <Route path='/DokcterdashBord/:id/register-hospital' element={<HospitalRegisterForm/>} />
        <Route path='/DokcterdashBord/:id' element={<DashBoad/>}>
        <Route index element={<Homepage/>}/>
        <Route path='/DokcterdashBord/:id/patient' element={<Patient/>}/>
        <Route path='/DokcterdashBord/:id/Chat' element={<Chat/>}/>
        <Route path='/DokcterdashBord/:id/Profile' element={<Profile/>}/>
        <Route path='/DokcterdashBord/:id/Reports' element={<Report/>}/>
        <Route path='/DokcterdashBord/:id/Appointments' element={<Appoinments/>}/>
        </Route>
        <Route path='/docter' element={<DocterPage />} />
        <Route path='/parent/NearVaccineCenter' element={<NearVaccineCenter />} />
        <Route path='/hospital/:name' element={<Hospitaldetail />} />
        <Route path='/login' element={<Login />} />
        
         <Route path='/profile' element={<ProtectedRoute />} >
         <Route index element={<UserInfo/>} />
         <Route path='SlotInfo' element={<SlotInfo/>} />
        </Route>
    
        <Route path='/parent' element={<ParentPage />}>
          <Route index element={<NearCenterInfo />} />
          <Route path="DocterCalls" element={<NeareByVideoClles />} />
  
        </Route>
      </Routes>
      <Footer />
      
    </BrowserRouter>
  )
}

export default App
