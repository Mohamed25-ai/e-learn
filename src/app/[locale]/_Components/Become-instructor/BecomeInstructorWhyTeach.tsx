import { faDollarSign, faGlobe, faUsers, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const features: { icon: IconDefinition; iconBg: string; iconColor: string; title: string; description: string }[] = [
    {
        icon: faDollarSign,
        iconBg: 'bg-[#E8F8F0]',
        iconColor: 'text-[#22C55E]',
        title: 'Earn Revenue',
        description: 'Keep up to 70% of every sale. Set your own price and earn every time a student enrolls.',
    },
    {
        icon: faGlobe,
        iconBg: 'bg-[#E9F7F7]',
        iconColor: 'text-(--primary-color)',
        title: 'Global Reach',
        description: 'Teach students in 190+ countries. Your knowledge has no geographic limits.',
    },
    {
        icon: faUsers,
        iconBg: 'bg-[#EDE9FE]',
        iconColor: 'text-[#7C3AED]',
        title: 'Build Community',
        description: 'Grow a loyal audience, get reviews, and shape careers around the world.',
    },
    {
        icon: faArrowTrendUp,
        iconBg: 'bg-[#FEF9E7]',
        iconColor: 'text-[#F59E0B]',
        title: 'Grow With Us',
        description: 'Access marketing tools, analytics, and promotions to scale your courses.',
    },
]

export default function BecomeInstructorWhyTeach() {
  
    return (
        <section className="px-5 md:px-10 py-16 bg-background">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    Why Teach on EduPro?
                </h2>
                <p className="text-sm md:text-base text-(--text-secondary) max-w-md">
                    Everything you need to succeed as an online instructor
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map(({ icon, iconBg, iconColor, title, description }) => (
                    <div
                        key={title}
                        className="bg-white border border-border rounded-2xl p-6
                                   flex flex-col gap-5
                                   transition-all duration-200
                                   hover:-translate-y-1
                                   hover:shadow-[0_6px_20px_rgba(73,187,189,0.12)"
                    >
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}>
                            <FontAwesomeIcon icon={icon} className={`text-xl ${iconColor}`} />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-bold text-foreground">
                                {title}
                            </h3>
                            <p className="text-sm text-(--text-secondary) leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}