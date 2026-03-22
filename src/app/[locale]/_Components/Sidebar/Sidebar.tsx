'use client'
import { useSidebar } from '@/store/SidebarStore/sidebarstore'
import { Link } from '@/i18n/navigation'


export default function Sidebar() {
    const handleside = useSidebar((state) => state.isOpen)

    return (
        <aside className="relative flex  md:block">
            <div
                className={`fixed top-12 ltr:left-0 rtl:right-0 z-30 h-[calc(100dvh-3rem)] bg-amber-600 w-1/2 md:w-1/5 transition-transform duration-300
                    ${handleside ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"} md:rtl:translate-x-0 md:ltr:translate-x-0  `}
            >
                <Link href="/courses" className="block w-full">
                    courses
                </Link>

                <Link href="/courses" className="block w-full">
                    courses
                </Link>
            </div>
        </aside>
    )
}

