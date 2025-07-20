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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path='/' element={<HomaPage />} />
        <Route path='/docter' element={<DocterPage />} />
        <Route path='/profile' element={<ProfilePage />} >
         <Route index element={<UserInfo/>} />
         <Route path='SlotInfo' element={<SlotInfo/>} />
        </Route>
        <Route path='/parent' element={<ParentPage />}>
          <Route index element={<NearCenterInfo />} />
          <Route path="DocterCalls" element={<NeareByVideoClles />} />
          <Route path='h3' element={"h3"} />
        </Route>
      </Routes>
      <Footer />
      
    </BrowserRouter>
  )
}

export default App
