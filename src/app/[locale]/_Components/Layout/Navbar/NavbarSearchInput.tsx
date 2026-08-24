import { Input } from '@/components/ui/input'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslations } from 'next-intl'


export default function NavbarSearchInput() {
    const t = useTranslations('Navbar');
    return (
        <div className="flex-1 max-w-sm mx-auto hidden lg:block">
            <div className="relative">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 
                    text-xs pointer-events-none text-(--text-muted)"
                />
                <Input
                    type="text"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full h-8 rounded-lg border border-border bg-input text-foreground text-sm outline-none transition-all duration-200 ltr:pl-8 ltr:pr-3 rtl:pr-8 rtl:pl-3 focus-visible:border-(--primary-color) focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary-color)_15%,transparent)] focus-visible:ring-0"
                />
            </div>
        </div>
    )
}