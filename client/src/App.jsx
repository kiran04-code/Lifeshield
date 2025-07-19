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
function App() {

  return (
  <BrowserRouter>
      <Navbar/>
  <Routes>

    <Route path='/' element={<HomaPage/>}/>
    <Route path='/docter' element={<DocterPage/>}/>
    <Route path='/parent' element={<ParentPage/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App
