import React from 'react'
import { useParams } from 'react-router-dom'
const DashBoad = () => {
  const {id} = useParams()
  return (
    <div>
      <h1>DashBoard for {id}</h1>
    </div>
  )
}

export default DashBoad
