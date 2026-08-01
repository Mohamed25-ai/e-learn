import { faArrowUpFromBracket, faVideo, faShield, faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const steps: { icon: IconDefinition; number: string; title: string; description: string }[] = [
    {
        icon: faArrowUpFromBracket,
        number: '01',
        title: 'Apply',
        description: 'Fill out a short application telling us about your expertise and course idea.',
    },
    {
        icon: faVideo,
        number: '02',
        title: 'Create',
        description: 'Use our course builder to create your curriculum, record lessons, and add materials.',
    },
    {
        icon: faShield,
        number: '03',
        title: 'Review',
        description: 'Our team reviews your course for quality and helps you polish before publishing.',
    },
    {
        icon: faBolt,
        number: '04',
        title: 'Earn',
        description: 'Go live and start earning. Track performance in your instructor dashboard.',
    },
]

export default function BecomeInstructorHowItWorks() {
    return (
        <section className="px-5 md:px-10 py-16 bg-white">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    How It Works
                </h2>
                <p className="text-sm md:text-base text-(--text-secondary) max-w-md">
                    Four simple steps to launch your teaching career
                </p>
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">

                {steps.map(({ icon, number, title, description }, index) => (
                    <div key={title} className="relative flex flex-col items-center text-center gap-4">

                        {/* Connector line — hidden on mobile, shown between steps on lg */}
                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-9 left-1/2 w-full h-px
                                            bg-border z-0" />
                        )}

                        {/* Icon circle */}
                        <div className="relative z-10 w-18 h-18 rounded-full
                                        bg-(--primary-color) flex items-center justify-center
                                        shadow-[0_4px_16px_rgba(73,187,189,0.35)">
                            <FontAwesomeIcon icon={icon} className="text-white text-2xl" />
                        </div>

                        {/* Step number */}
                        <span className="text-sm font-semibold text-(--text-muted) tracking-widest">
                            {number}
                        </span>

                        {/* Title */}
                        <h3 className="text-lg font-extrabold text-foreground">
                            {title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-(--text-secondary) leading-relaxed max-w-50">
                            {description}
                        </p>

                    </div>
                ))}

            </div>

        </section>
    )
}