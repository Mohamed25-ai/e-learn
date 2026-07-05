'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faMagnifyingGlass, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from '@/store/Zustand/SidebarStore/sidebarstore';
import { signOut, useSession } from 'next-auth/react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { useLocale } from 'next-intl';
import {
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



const LINKS = [
    { href: "/courses", label: "Courses" },
    { href: "/categories", label: "Categories" },
    { href: "/createcourse", label: "Create Course" },
];

export default function Navbar() {
    const path = usePathname();
    const router = useRouter();
    const userSession = useSession();
    const sidebarToggle = useSidebar((state) => state.toggle);
    const [isOpen, setisOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const locale = useLocale(); // Detect locale
    const isRtl = locale === 'ar'; // Adjust to your RTL language code
    function navtoggle(open: boolean) {
        if (open) {
            if (path === '/') { setisOpen(false); return; }
            if (userSession.status === "unauthenticated") { setisOpen(false); return; }
        }
        if (userSession.status === "unauthenticated") { setisOpen(true); return; }
        if (path === '/') { setisOpen(true); return; }
    }
    async function handleLogout() {
        await signOut({ redirect: false });
        router.replace(`/login`);
        router.refresh();;
    }

    const isAuth = userSession.status === "authenticated";
    const user = userSession.data?.user;
    const userRole = Array.isArray(userSession?.data?.userRole)
        ? userSession.data.userRole
        : [userSession?.data?.userRole || ""];


    return (
        <nav className="relative mt-12 border-0">
            <div className="fixed top-0 left-0 z-40 w-full h-12 bg-(--primary-light)  border-b border-border shadow-sm">
                <div className="flex items-center gap-3 h-full px-4 md:px-6">

                    {/* Mobile toggler */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden w-8 h-8 rounded-lg text-(--primary-color) hover:bg-(--primary-light) shrink-0"
                        onClick={() => { sidebarToggle(); navtoggle(isOpen); }}
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
                    {isAuth && path == "/" && (
                        <ul className="hidden md:flex  items-center gap-1 ms-2">
                            {LINKS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                                            ${path === href
                                                ? "text-(--primary-color) bg-(--primary-light)"
                                                : "text-(--text-secondary) hover:text-(--primary-color) hover:bg-(--primary-light)"
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Search */}
                    {isAuth && (
                        <div className="flex-1 max-w-sm mx-auto hidden md:block">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 text-xs pointer-events-none text-(--text-muted)"
                                />
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search courses..."
                                    className="w-full h-8 rounded-lg border border-border bg-input text-foreground text-sm outline-none transition-all duration-200 ltr:pl-8 ltr:pr-3 rtl:pr-8 rtl:pl-3 focus-visible:border-(--primary-color) focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary-color)_15%,transparent)] focus-visible:ring-0"
                                />
                            </div>
                        </div>
                    )}

                    {/* Right side */}
                    <div className="flex items-center gap-2 ms-auto">
                        <LanguageToggle />

                        {!isAuth && (
                            <Link
                                href="/login"
                                className="MAIN_BUTTON px-4 py-1.5 text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        )}
                        {/* {User Profile} */}
                        {isAuth && (
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 px-2 py-1 rounded-xl transition-all duration-200 hover:bg-(--primary-light) outline-none cursor-pointer">
                                        {/* Avatar */}
                                        <div className="w-7 h-7 rounded-full bg-(--primary-color) flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
                                            {user?.image
                                                ? <img src={user.image} alt={user?.name ?? ""} className="w-full h-full object-cover" />
                                                : <span>{user?.name?.charAt(0).toUpperCase() ?? "U"}</span>
                                            }
                                        </div>
                                        <span className="hidden sm:block text-sm font-semibold max-w-24 truncate text-foreground">
                                            {user?.name ?? "User"}
                                        </span>
                                        <FontAwesomeIcon icon={faChevronDown} className="hidden sm:block text-[10px] text-(--text-muted)" />
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-56 rounded-xl border-border bg-card shadow-lg p-1.5">
                                    {/* User info */}
                                    <div className="px-3 py-2 mb-1 space-y-0.5">
                                        <p className="text-sm font-bold truncate text-foreground">
                                            {user?.name ?? "User"}
                                        </p>
                                        <p className="text-xs truncate text-(--text-muted)">
                                            {user?.email ?? ""}
                                        </p>
                                        {/* Roles */}
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {userRole?.map((role: string) => (
                                                <span
                                                    key={role}
                                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                                    style={{
                                                        background: "color-mix(in srgb, var(--primary-color) 12%, transparent)",
                                                        color: "var(--primary-color)",
                                                    }}
                                                >
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator className="bg-border my-1" />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-(--text-secondary) cursor-pointer transition-colors hover:bg-(--primary-light) hover:text-(--primary-color)"
                                        >
                                            <FontAwesomeIcon icon={faUser} className="text-xs w-3.5" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="bg-border my-1" />

                                    <DropdownMenuItem asChild>
                                        <Button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-(--error) cursor-pointer transition-colors hover:bg-red-50"
                                        >
                                            <FontAwesomeIcon icon={faRightFromBracket} className="text-xs w-3.5" />
                                            Log out
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                    </div>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {isAuth && isOpen && (
                <div className="fixed top-12 left-0 bg-white z-30 w-full bg-navbar border-b border-border shadow-md md:hidden">
                    <ul className="flex flex-col px-4 py-2 gap-1">
                        {LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => { sidebarToggle(); setisOpen(isOpen) }}
                                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                        ${path === href
                                            ? "text-(--primary-color) bg-(--primary-light)"
                                            : "text-(--text-secondary) hover:text-(--primary-color) hover:bg-(--primary-light)"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                        {/* Mobile search */}
                        <li className="pt-1 pb-2">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 text-xs pointer-events-none text-(--text-muted)"
                                />
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search courses..."
                                    className="w-full h-9 rounded-lg border border-border bg-input text-foreground text-sm outline-none ltr:pl-8 ltr:pr-3 rtl:pr-8 rtl:pl-3 focus-visible:border-(--primary-color) focus-visible:ring-0"
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
