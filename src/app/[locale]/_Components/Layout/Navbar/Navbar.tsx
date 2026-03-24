'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from '@/store/SidebarStore/sidebarstore';
import { signOut, useSession } from 'next-auth/react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { useLocale } from 'next-intl';

export default function Navbar() {
    const path = usePathname();
    const router = useRouter();
    const userSession = useSession();
    // console.log('userSession', userSession)
    const sidebarToggle = useSidebar((state) => state.toggle);
    const [isOpen, setisOpen] = useState(false);
    function navtoggle(open: boolean) {
        if (open) {
            if (path === '/') {
                setisOpen(false);
                return;
            }
            if (userSession.status === "unauthenticated") {
                setisOpen(false);
                return;
            }
        }
        if (userSession.status === "unauthenticated") {
            setisOpen(true);
            return;
        }
        if (path==='/') {
            setisOpen(true);
            return;
        }
    }
    async function handleLogout() {
        await signOut({redirect:false});
        router.replace(`/login`);
    }
    return (
        <nav className="relative mt-12  border-0  ">
            <div className="fixed top-0 left-0 z-40 border-b border-border w-full h-12 bg-navbar ">
                <div className='flex md:items-center md:justify-between px-5   h-full'>
                    <div className='md:flex w-full md:justify-between'>
                        {/* Logo */}
                        <div className="logo">
                            <Link href={'/'}>ddfdf</Link>
                        </div>
                        {/* Links list */}
                        <div className={`${isOpen ? " block " : " hidden "} md:block bg-amber-300  `}>
                            <ul className='md:flex items-center  justify-end gap-5 px-3'>
                                {userSession.status === "unauthenticated" && <li><Link href={`/login`}>Get Started</Link></li>}
                                {userSession.status === "authenticated" && <li><Link href={`/courses`}>courses</Link></li>}
                                {userSession.status === "authenticated" && <li><Link href={`/categories`}>categories</Link></li>}
                                {userSession.status === "authenticated" && <li><Link href={`/create-course`}>Create Course</Link></li>}
                                <li><LanguageToggle /></li>
                                {userSession.status === "authenticated" && <li className='cursor-pointer' onClick={handleLogout}>Log out</li>}
                            </ul>
                        </div>
                    </div>
                    {/* Toggler */}
                    <div className=" bg-red-200 flex h-full items-center px-4 md:hidden">
                        <FontAwesomeIcon icon={faBars} onClick={() => { sidebarToggle(); navtoggle(isOpen) }} className="text-xl" />
                    </div>
                </div>
            </div>
        </nav>
    )
}
