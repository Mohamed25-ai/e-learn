import React from 'react'
import Navbar from '../_Components/Navbar/Navbar'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='p-5 md:p-0'>
      {children}
    </div>
  )
}
