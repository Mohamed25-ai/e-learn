"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarInMobileProps } from "./navbar.types"
import { Input } from "@/components/ui/input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/i18n/navigation";
import { toggleNavbar, toggleSidebar } from '@/store/redux/togglers/togglers.slice';
import NavbarSearchInput from "./NavbarSearchInput";
import { useTranslations } from "next-intl";



export default function NavbarInMobile({ navbarLinks, currentPath, toggleNavbar, toggleSidebar }: NavbarInMobileProps) {
    const t = useTranslations('Navbar');
    return (
        <div className="fixed top-12 left-0 bg-white z-30 w-full bg-navbar border-b border-border shadow-md md:hidden">
            <ul className="flex flex-col px-4 py-2 gap-1">
                {navbarLinks.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            onClick={(e) => { e.stopPropagation(); toggleSidebar(); toggleNavbar() }}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                        ${currentPath === href
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
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('searchPlaceholder')}
                            className="w-full h-9 rounded-lg border border-border bg-input text-foreground text-sm outline-none ltr:pl-8 ltr:pr-3 rtl:pr-8 rtl:pl-3 focus-visible:border-(--primary-color) focus-visible:ring-0"
                        />
                    </div>
                    {/* <NavbarSearchInput/> */}
                </li>
            </ul>
        </div>
    )
}