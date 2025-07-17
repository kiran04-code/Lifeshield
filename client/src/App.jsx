import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomaPage from './pages/HomaPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {

  return (
  <BrowserRouter>
      <Navbar/>
  <Routes>

    <Route path='/' element={<HomaPage/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App
