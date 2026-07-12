'use client'
import React from 'react'
import Navbar from '../_Components/Layout/Navbar/Navbar'
import Sidebar from '../_Components/Layout/Sidebar/Sidebar'

export default function layout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <Navbar />
            <div className="flex  justify-between ">
                <div className='md:w-1/4'>
                <Sidebar />
                </div>
                <main className=" min-h-dvh w-full ">
                    {children}
                </main>
            </div>
        </div>
    )
}
