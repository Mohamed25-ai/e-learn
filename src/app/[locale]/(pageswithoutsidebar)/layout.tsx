import React from 'react'
import Navbar from '../_Components/Layout/Navbar/Navbar'

export default function layout({children}:{children:React.ReactNode}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
