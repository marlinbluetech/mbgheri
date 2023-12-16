import React from 'react'
import { Link } from 'react-router-dom'

const Techdashboard = () => {
  return (
    <div>
        <div style={{display:"flex" , columnGap:"15px"}}>
      <Link to="/">
      <button className='btn btn-primary'>Back</button>
    </Link>
    <Link to="/">
      <button className='btn btn-primary'>Logout</button>
    </Link>
    </div>
    <h1 mt-4>Technical Dashboard</h1>
    </div>

  )
}

export default Techdashboard
