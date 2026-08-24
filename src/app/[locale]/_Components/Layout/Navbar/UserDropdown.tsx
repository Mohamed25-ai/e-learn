"use client"
import { UserDropdownProps } from './navbar.types'
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
export default function UserDropdown({ isUserAuthenticated, user, userRoles }: UserDropdownProps) {
  const t = useTranslations('Navbar.userDropdown');
  const router = useRouter();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.replace(`/login`);
    router.refresh();;
  }
  const userRole = Array.isArray(userRoles)
    ? userRoles
    : [userRoles || ""];
  return (
    <div>
      {isUserAuthenticated && (
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-2 py-1 rounded-xl transition-all duration-200 hover:bg-(--primary-light) outline-none cursor-pointer">
              {/* Avatar */}
              <div className="relative">
                {user?.image && <div className='w-7 h-7 rounded-full bg-(--primary-color) flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden'>
                  {<Image className='rounded-full ' fill src={user?.image} alt={user?.name ?? t('defaultName')} />}
                </div>}
              </div>
              <span className="hidden sm:block text-sm font-semibold max-w-24 truncate text-foreground">
                {user?.name ?? t('defaultName')}
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="hidden sm:block text-[10px] text-(--text-muted)" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-xl border-border bg-card shadow-lg p-1.5">
            {/* User info */}
            <div className="px-3 py-2 mb-1 space-y-0.5">
              <p className="text-sm font-bold truncate text-foreground">
                {user?.name ?? t('defaultName')}
              </p>
              <p className="text-xs truncate text-(--text-muted)">
                {user.email ?? ""}
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
                {t('profile')}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-border my-1" />

            <DropdownMenuItem asChild>
              <Button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-(--error) cursor-pointer transition-colors hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="text-xs w-3.5" />
                {t('logout')}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}