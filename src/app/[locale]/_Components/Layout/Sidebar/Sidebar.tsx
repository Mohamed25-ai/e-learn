'use client'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCartPlus, faGraduationCap, faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setSidebarState } from '@/store/redux/togglers/togglers.slice';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';


const SIDEBAR_LINKS = [
    { href: "/courses", label: "Courses", icon: faBook },
    { href: "/categories", label: "Categories", icon: faLayerGroup },
    { href: "/createcourse", label: "Create Course", icon: faPlus },
];

export default function Sidebar() {
    const sidebarTogglersStore = useAppSelector((state) => state.sidebarTogglerSlice);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const userSession = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const path = usePathname();
    function toggleSidebar() {
        dispatch(setSidebarState({ val: false }));
    }
    function handleBecomeInstructor() {
        router.push("/become-instructor")
    }

    useEffect(() => {
        function handleOutsideClick(e: MouseEvent) {
            e.preventDefault()
            e.stopPropagation()
            dispatch(setSidebarState({ val: false }));

        }
        if (sidebarRef.current) {
            sidebarRef.current.addEventListener("click", handleOutsideClick);
        }
        return () => {
            if (sidebarRef.current) {
                sidebarRef.current.removeEventListener("click", handleOutsideClick);
            }
        };
    }, []);

    return (
        <aside>
            <div className=''>
                <div className={`fixed top-12 ltr:left-0 rtl:right-0 z-50 h-[calc(100dvh-3rem)] 
                                left-0 right-[50%] lg:right-[75%] xl:right-[80%] 
                                bg-sidebar border-e border-border
                                flex flex-col gap-1 pt-4 px-3 pb-6
                                transition-transform duration-300 ease-in-out shadow-xl 
                                ${sidebarTogglersStore.isOpen ? "block " : "hidden xl:block"} `}>
                    <nav className="flex flex-col  gap-1">
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
                    {!userSession.data?.userRole.includes('Instructor') && <div className="mt-auto ">
                        <div className="bg-foreground rounded-2xl p-5 flex flex-col gap-4">

                            <div className="w-12 h-12 rounded-xl bg-(--primary-light) flex items-center justify-center">
                                <FontAwesomeIcon icon={faGraduationCap} className="text-(--primary-color) text-xl" />
                            </div>

                            <h4 className="text-white font-semibold">
                                Become an Instructor
                            </h4>

                            <p className="text-white/60 text-sm leading-relaxed">
                                Share your knowledge and earn revenue
                            </p>

                            <button onClick={handleBecomeInstructor} className="BUTTON_STYLE w-full justify-center">
                                Apply Now
                            </button>

                        </div>                    <div className='pt-4 mt-5 border-t border-border'>
                            <p className="text-xs text-center text-(--text-muted) " >
                                EduCore v1.0
                            </p>
                        </div>
                    </div>}
                </div>
                {/* Backdrop */}
                <div ref={sidebarRef}
                    className={`fixed inset-0 z-20 bg-black/30
                                backdrop-blur-sm transition-opacity 
                duration-300 xl:hidden
                ${sidebarTogglersStore.isOpen ? "opacity-100 pointer-events-auto" :
                            "opacity-0 pointer-events-none"}`}
                >
                </div>
            </div>
            {/* Links */}


        </aside>
    );
}

 // <aside  className={`${sidebarTogglersStore.isOpen?"block ":"hidden lg:block"} `}>
        //     {/* Backdrop */}
        //     <div ref={sidebarRef}
        //         className={`fixed inset-0 z-20 bg-black/30 backdrop-blur-sm transition-opacity 
        //             duration-300 xl:hidden
        //             ${sidebarTogglersStore.isOpen ? "opacity-100 pointer-events-auto" :
        //                 "opacity-0 pointer-events-none"}`}
        //     />

        //     {/* Panel */}
        //     <div
        //         // className={`fixed top-12 ltr:left-0 rtl:right-0 z-40 h-[calc(100dvh-3rem)] 
        //         //       bg-sidebar border-e border-border
        //         //     flex flex-col gap-1 pt-4 px-3 pb-6
        //         //     transition-transform duration-300 ease-in-out shadow-xl
        //         //     ${sidebarTogglersStore.isOpen ?
        //         //      "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"}
        //         //     xl:ltr:translate-x-0 xl:rtl:translate-x-0`}

        //     >



        //         {/* Links */}
        //         <nav className="flex flex-col  gap-1">
        //             {SIDEBAR_LINKS.map(({ href, label, icon }) => {
        //                 const isActive = path === href;
        //                 return (
        //                     <Link
        //                         key={href}
        //                         href={href}
        //                         onClick={toggleSidebar}
        //                         className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        //                             ${isActive
        //                                 ? "text-white shadow-sm bg-(--primary-color)"
        //                                 : "text-(--text-secondary) hover:text-(--primary-color) hover:bg-(--primary-light)"
        //                             }`}

        //                     >
        //                         <span
        //                             className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs transition-all
        //                                 ${isActive ? "bg-white/20" : "bg-(--primary-light) text-(--primary-color)"}`}
        //                         >
        //                             <FontAwesomeIcon icon={icon} />
        //                         </span>
        //                         {label}

        //                         {/* Active indicator dot */}
        //                         {isActive && (
        //                             <span className="ms-auto w-1.5 h-1.5 rounded-full bg-white/70" />
        //                         )}
        //                     </Link>
        //                 );
        //             })}
        //         </nav>
        //         {/* Bottom divider + version */}
        //         {!userSession.data?.userRole.includes('Instructor') && <div className="mt-auto ">
        //             <div className="bg-foreground rounded-2xl p-5 flex flex-col gap-4">

        //                 <div className="w-12 h-12 rounded-xl bg-(--primary-light) flex items-center justify-center">
        //                     <FontAwesomeIcon icon={faGraduationCap} className="text-(--primary-color) text-xl" />
        //                 </div>

        //                 <h4 className="text-white font-semibold">
        //                     Become an Instructor
        //                 </h4>

        //                 <p className="text-white/60 text-sm leading-relaxed">
        //                     Share your knowledge and earn revenue
        //                 </p>

        //                 <button onClick={handleBecomeInstructor} className="BUTTON_STYLE w-full justify-center">
        //                     Apply Now
        //                 </button>

        //             </div>                    <div className='pt-4 mt-5 border-t border-border'>
        //                 <p className="text-xs text-center text-(--text-muted) " >
        //                     EduCore v1.0
        //                 </p>
        //             </div>




        //         </div>}




        //     </div>
        // </aside>