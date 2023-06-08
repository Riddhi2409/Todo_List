import React from 'react'
import {Routes,Route} from 'react-router-dom';


import Feed from './Feed'
import Navbar from './Navbar'

function Pins() {
  return (
    <div className='px-2 md:px-5 h-[100%]'>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Feed />} />
      </Routes>
    </div>

  )
}

export default Pins
