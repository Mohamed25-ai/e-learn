'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faMagnifyingGlass, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from 'next-auth/react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleNavbar, toggleSidebar } from '@/store/redux/togglers/togglers.slice';
import CartInNavbar from '../../Cart/CartInNavbar';
import UserDropdown from './UserDropdown';
import NavbarSearchInput from './NavbarSearchInput';
import NavbarInMobile from './NavbarInMobile';




const PAGES_WITHOUT_NAVBAR = ["/", "/cart", "/become-instructor", "/course-learn",
    "categorized-course", "/course-details", "/categorized-course"]
export default function Navbar() {
    const t = useTranslations('Navbar');
    const navbarTogglerStore = useAppSelector((state) => state.navbarTogglerSlice);
    const dispatch = useAppDispatch();
    const path = usePathname();
    const userSession = useSession();
    const locale = useLocale(); // Detect locale

    const LINKS = [
        { href: "/courses", label: t('links.courses') },
        { href: "/my-learning", label: t('links.myLearning') },
        { href: "/categories", label: t('links.categories') },
        { href: "/createcourse", label: t('links.createCourse') },
    ];

    function navtoggle() {
        if (navbarTogglerStore.isOpen) {
            if (path === '/' && userSession.status === "unauthenticated") { return; }
        }
        if (userSession.status === "authenticated" && path === '/') {
            dispatch(toggleNavbar());
            return;
        }
    }
    function toggleSide() {
        dispatch(toggleSidebar())
    }
    const isAuth = userSession.status === "authenticated";
    const userDataToDropdown = {
        name: userSession.data?.fullName ?? "",
        email: userSession.data?.email ?? "",
        image: userSession.data?.profilePictureUrl,
    }


    return (
        <nav className="relative mt-12 border-0">
            <div className="fixed top-0 left-0 z-40 w-full h-12 bg-(--primary-light)
              border-b border-border shadow-sm">
                <div className="flex items-center gap-3 h-full px-4 md:px-6">

                    {/* Mobile toggler */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="xl:hidden w-8 h-8 rounded-lg text-(--primary-color)
                         hover:bg-(--primary-light) shrink-0"
                        onClick={() => { toggleSide(); navtoggle(); }}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </Button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-7 h-7 bg-(--primary-color) rounded-lg flex items-center justify-center text-white text-xs font-black">
                            E
                        </div>
                        <span className="hidden sm:block text-lg font-bold tracking-tight text-foreground">
                            Edu<span className="text-(--primary-color)">Core</span>
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    {isAuth && PAGES_WITHOUT_NAVBAR.includes(path) && (
                        <ul className="hidden md:flex items-center gap-1 ms-2">
                            {LINKS.map(({ href, label }) => {
                                const isInstructor = userSession.data?.userRole?.includes("Instructor");
                                if (href === "/createcourse" && !isInstructor) {
                                    return null;
                                }

                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`px-3 py-1.5 text-nowrap text-sm font-medium rounded-lg transition-all duration-200
                                                ${path === href
                                                    ? "text-(--primary-color) bg-(--primary-light)"
                                                    : "text-(--text-secondary) hover:text-(--primary-color) hover:bg-(--primary-light)"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {/* Search */}
                    {isAuth && (
                        <NavbarSearchInput />
                    )}
                    {/* Right side */}
                    <div className="flex items-center gap-2 ms-auto">
                        {isAuth && <CartInNavbar />}
                        <LanguageToggle />
                        {!isAuth && (
                            <Link
                                href="/login"
                                className="MAIN_BUTTON px-4 py-1.5 text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5"
                            >
                                {t('getStarted')}
                            </Link>
                        )}
                        {/* {User Profile} */}
                        <UserDropdown isUserAuthenticated={isAuth} userRoles={userSession.data?.userRole}
                            user={userDataToDropdown} />
                    </div>
                </div>
            </div>
            {/* Mobile dropdown menu */}
            {isAuth && navbarTogglerStore.isOpen && (
                <NavbarInMobile currentPath={path}
                    navbarLinks={LINKS}
                    toggleNavbar={navtoggle}
                    toggleSidebar={toggleSide}
                />
            )}
        </nav>
    );
}