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
    const rawPathname = usePathname(); // e.g. /ar/courses
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    function changeLanguage(newLocale: Locale) {
        console.log(locale,newLocale)
        if (locale === newLocale) return;

        // Strip the leading locale segment manually
        const segments = rawPathname.split('/').filter(Boolean);
        const firstSegment = segments[0];
        const isLocalePrefix = (routing.locales as readonly string[]).includes(firstSegment);
        const cleanPathname = isLocalePrefix
            ? '/' + segments.slice(1).join('/')
            : rawPathname;

        console.log('cleanPathname:', cleanPathname);

        startTransition(() => {
            router.replace(
                // @ts-expect-error
                { pathname: cleanPathname || '/', params },
                { locale: newLocale }
            );
        });
    }

    return (
        <div>
            {locales.map((lang) => (
                <Button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    disabled={isPending || locale === lang.code}
                    style={{
                        fontWeight: locale === lang.code ? 'bold' : 'normal',
                        opacity: locale === lang.code ? 0.5 : 1,
                    }}
                >
                    {lang.code}
                </Button>
            ))}
        </div>
    );
}