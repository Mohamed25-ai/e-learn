'use client'
import React from 'react'
import Navbar from '../_Components/Navbar/Navbar'
import Sidebar from '../_Components/Sidebar/Sidebar'
import { useSidebar } from '@/store/SidebarStore/sidebarstore'

export default function layout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <Navbar />
            <div className="flex  justify-between ">
                <div className='md:w-1/4'>
                <Sidebar />
                </div>
                <main className="bg-blue-400 min-h-dvh w-full ">
                    {children}
                </main>
            </div>
        </div>
    )
}
