"use client"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

function FooterAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-border md:border-none">
            {/* Mobile toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 md:py-0
                        md:cursor-default md:pointer-events-none"
            >
                <h4 className="text-sm font-bold text-foreground">{title}</h4>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-xs text-(--text-muted) transition-transform duration-200
                                md:hidden ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Links */}
            <ul className={`flex flex-col gap-3 overflow-hidden transition-all duration-300
                            md:max-h-none md:opacity-100 md:pb-0
                            ${open ? 'max-h-60 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                {links.map(({ label, href }) => (
                    <li key={label}>
                        <Link
                            href={href}
                            className="text-sm text-(--text-secondary)
                                       hover:text-(--primary-color)
                                       transition-colors duration-200"
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Footer() {
    const t = useTranslations();

    const footerLinks = [
        {
            title: t('Footer.sections.company.title'),
            links: [
                { label: t('Footer.sections.company.aboutUs'), href: '' },
                { label: t('Footer.sections.company.careers'), href: '' },
                { label: t('Footer.sections.company.press'), href: '' },
                { label: t('Footer.sections.company.contact'), href: '' },
            ],
        },
        {
            title: t('Footer.sections.resources.title'),
            links: [
                { label: t('Footer.sections.resources.blog'), href: '' },
                { label: t('Footer.sections.resources.helpCenter'), href: '' },
                { label: t('Footer.sections.resources.community'), href: '' },
                { label: t('Footer.sections.resources.support'), href: '' },
            ],
        },
        {
            title: t('Footer.sections.legal.title'),
            links: [
                { label: t('Footer.sections.legal.termsOfService'), href: '' },
                { label: t('Footer.sections.legal.privacyPolicy'), href: '' },
                { label: t('Footer.sections.legal.cookiePolicy'), href: '' },
                { label: t('Footer.sections.legal.gdpr'), href: '' },
            ],
        },
    ]

    return (
        <footer className="border-t border-border mt-10">

            {/* Main */}
            <div className="px-5 md:px-8 py-8 md:py-12
                            flex flex-col md:grid md:grid-cols-4 gap-0 md:gap-10">

                {/* Brand */}
                <div className="flex flex-col gap-4 pb-6 md:pb-0
                                border-b border-border md:border-none">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-(--primary-color)
                                        flex items-center justify-center shrink-0">
                            <FontAwesomeIcon icon={faBookOpen} className="text-white text-base" />
                        </div>
                        <span className="text-xl font-extrabold text-foreground">
                            EduPro
                        </span>
                    </div>
                    <p className="text-sm text-(--text-secondary) leading-relaxed max-w-50">
                        {t('Footer.tagline')}
                    </p>
                </div>

                {/* Link columns — accordion on mobile, normal on desktop */}
                {footerLinks.map(({ title, links }) => (
                    <div key={title} className="md:flex md:flex-col md:gap-4">
                        {/* Desktop heading (hidden on mobile, shown via accordion) */}
                        <div className="hidden md:block">
                            <h4 className="text-sm font-bold text-foreground mb-4">
                                {title}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-(--text-secondary)
                                                       hover:text-(--primary-color)
                                                       transition-colors duration-200"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile accordion */}
                        <div className="md:hidden">
                            <FooterAccordion title={title} links={links} />
                        </div>
                    </div>
                ))}

            </div>

            {/* Bottom bar */}
            <div className="border-t border-border px-5 md:px-8 py-5">
                <p className="text-center text-sm text-(--text-secondary)">
                    {t('Footer.copyright', { year: new Date().getFullYear() })}
                </p>
            </div>

        </footer>
    )
}