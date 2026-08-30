'use client'
import { faBahai } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslations } from 'next-intl';

export default function BecomeInstructorShareKnowledge() {
    const t = useTranslations();

    const stats = [
        { value: '1.2M+', label: t('BecomeInstructor.shareKnowledge.stats.activeStudents') },
        { value: '70%', label: t('BecomeInstructor.shareKnowledge.stats.revenueShare') },
        { value: '190+', label: t('BecomeInstructor.shareKnowledge.stats.countriesReached') },
    ]


    return (
        <section className="bg-foreground px-5 py-16
                            flex flex-col items-center justify-center gap-10 text-center">

            {/* Badge */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <FontAwesomeIcon icon={faBahai} className="text-(--primary-color)" />
                <p className="text-sm text-white/70">
                    {t('BecomeInstructor.shareKnowledge.badge')}
                </p>
            </div>

            {/* Heading */}
            <header className="flex flex-col items-center gap-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    {t('BecomeInstructor.shareKnowledge.headingPart1')}<br />
                    <span className="text-(--primary-color)">{t('BecomeInstructor.shareKnowledge.headingHighlight')}</span>
                </h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                    {t('BecomeInstructor.shareKnowledge.description')}
                </p>
            </header>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 my-5">
                <button  className="BUTTON_STYLE">
                    {t('BecomeInstructor.shareKnowledge.startApplication')}
                </button>
                <button className="flex items-center gap-2 text-sm font-medium
                                    text-white/80 hover:text-white
                                    transition-colors duration-200 underline underline-offset-4">
                    {t('BecomeInstructor.shareKnowledge.howItWorks')}
                </button>
            </div>

            {/* Divider */}
            <div className="w-full max-w-xl border-t border-white/10" />

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center  gap-8 md:gap-16">
                {stats.map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                        <span className="text-3xl md:text-4xl font-extrabold text-(--primary-color)">
                            {value}
                        </span>
                        <span className="text-xs md:text-sm text-white/60">
                            {label}
                        </span>
                    </div>
                ))}
            </div>

        </section>
    )
}