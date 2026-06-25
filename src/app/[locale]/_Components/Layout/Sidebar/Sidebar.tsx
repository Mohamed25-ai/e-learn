'use client'
import { useSidebar } from '@/store/Zustand/SidebarStore/sidebarstore'
import { Link, usePathname } from '@/i18n/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';


const SIDEBAR_LINKS = [
    { href: "/courses",       label: "Courses",       icon: faBook },
    { href: "/categories",    label: "Categories",    icon: faLayerGroup },
    { href: "/createcourse", label: "Create Course", icon: faPlus },
];

export default function Sidebar() {
    const isOpen = useSidebar((state) => state.isOpen);
    const toggle = useSidebar((state) => state.toggle);
    const path   = usePathname();
    function toggleSidebar(){
        toggle();
    }
    return (
        <aside>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-20 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Panel */}
            <div
                className={`fixed top-12 ltr:left-0 rtl:right-0 z-30 h-[calc(100dvh-3rem)]
                    w-64 md:w-1/5 bg-sidebar border-e border-border
                    flex flex-col gap-1 pt-4 px-3 pb-6
                    transition-transform duration-300 ease-in-out shadow-xl
                    ${isOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"}
                    md:ltr:translate-x-0 md:rtl:translate-x-0`}
            >
                {/* Links */}
                <nav className="flex flex-col gap-1">
                    {SIDEBAR_LINKS.map(({ href, label, icon }) => {
                        const isActive = path === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={toggleSidebar}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? "text-white shadow-sm bg-(--primary-color)"
                                        : "text-(--text-secondary) hover:text-(--primary-color) hover:bg-(--primary-light)"
                                    }`}
                                
                            >
                                <span
                                    className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs transition-all
                                        ${isActive ? "bg-white/20" : "bg-(--primary-light) text-(--primary-color)"}`}
                                >
                                    <FontAwesomeIcon icon={icon} />
                                </span>
                                {label}

                                {/* Active indicator dot */}
                                {isActive && (
                                    <span className="ms-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom divider + version */}
                <div className="mt-auto pt-4 border-t border-border">
                    <p className="text-xs text-center text-(--text-muted) " >
                        EduCore v1.0
                    </p>
                </div>
            </div>
        </aside>
    );
}

