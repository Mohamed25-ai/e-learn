import React from 'react'
import Navbar from '../_Components/Navbar/Navbar'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
