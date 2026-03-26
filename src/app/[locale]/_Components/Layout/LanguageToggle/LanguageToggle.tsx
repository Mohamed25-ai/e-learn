'use client';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { usePathname } from 'next/navigation'; // 👈 next/navigation, not i18n
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';

type Locale = (typeof routing.locales)[number];

const locales = [
    { code: 'en' as Locale, label: 'English' },
    { code: 'ar' as Locale, label: 'العربية' },
];

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const rawPathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    function changeLanguage(newLocale: Locale) {
        if (locale === newLocale) return;

        const segments = rawPathname.split('/').filter(Boolean);
        const firstSegment = segments[0];
        const isLocalePrefix = (routing.locales as readonly string[]).includes(firstSegment);
        const cleanPathname = isLocalePrefix
            ? '/' + segments.slice(1).join('/')
            : rawPathname;

        startTransition(() => {
            router.replace(
                // @ts-expect-error
                { pathname: cleanPathname || '/', params },
                { locale: newLocale }
            );
        });
    }

    return (
        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5" style={{ background: "var(--input-background)" }}>
            {locales.map((lang) => {
                const isActive = locale === lang.code;
                return (
                    <Button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        disabled={isPending || isActive}
                        className={`relative px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 disabled:cursor-not-allowed
                            ${isActive
                                ? "text-white shadow-sm bg-(--primary-color)"
                                : "text-(--text-secondary) hover:text-(--primary-color)"
                            }`}
                        
                    >
                        {isPending && isActive
                            ? <span className="inline-block w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            : lang.code.toUpperCase()
                        }
                    </Button>
                );
            })}
        </div>
    );
}