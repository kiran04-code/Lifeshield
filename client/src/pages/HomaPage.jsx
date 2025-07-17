import React from 'react'
import HeroSection from '../components/HeroSection'
import OurService from '../components/OurService'
import Docter from '../components/Docter'
import Parents from '../components/parents'
import Footer from '../components/Footer'
import WhyPage from '../components/WhyPage'

const HomaPage = () => {
  return (
    <div>
      <HeroSection/>
      <WhyPage/>
      <OurService/>
      <Docter/>
      <Parents/>
    </div>
  )
}

export default HomaPage
