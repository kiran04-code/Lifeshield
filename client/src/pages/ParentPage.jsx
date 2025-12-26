import React from 'react'
import { Outlet } from 'react-router-dom'
import DocterHroSection from '../components/DocterHroSection'
import ParentHreoSection from '../components/ParentHreoSection'
import Card from '../components/parent/Card'
import FeatureLayout from '../components/parent/FeatureLayout'


const ParentPage = () => {
  return (
    <div >
      <ParentHreoSection/>
      <FeatureLayout/>
    </div>
  )
}

export default ParentPage
