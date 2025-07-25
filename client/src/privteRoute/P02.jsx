import React from 'react'
import { useDocAuth } from '../context/dockAuth'
import CreateProfile from '../components/DockerLogin/Hospitalregister'
import LoginCreate from '../components/DockerLogin/LoginCreate'
const ProtechRouteToDocterPage = () => {
    const {docterdata} = useDocAuth()
  return docterdata ? <CreateProfile/>:<LoginCreate/>
}

export default ProtechRouteToDocterPage
