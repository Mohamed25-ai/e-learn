import { faArrowRight, faPlay, faUserGraduate, faBookOpen, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LANDING_IMAGE from "@/assets/images/photo-1771408427146-09be9a1d4535.jpg"
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
    const stats = [
        { icon: faUserGraduate, value: '50k+', label: 'Students' },
        { icon: faBookOpen,     value: '200+', label: 'Courses'  },
        { icon: faStar,         value: '4.9',  label: 'Rating'   },
    ];

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-between
                        gap-10 px-5 md:px-8 py-10 md:py-16 min-h-[90vh]">

            {/* Left */}
            <div className="flex flex-col gap-6 w-full md:w-1/2">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white border border-border
                                rounded-full px-4 py-2 w-fit shadow-sm">
                    <span className="text-lg">🎉</span>
                    <span className="text-xs md:text-sm font-medium text-(--text-secondary)">
                        Join 50,000+ Students Learning Online
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold
                               text-foreground leading-tight">
                    Upgrade Your{' '}
                    <span className="text-(--primary-color)">Skills</span>{' '}
                    Online
                </h1>

                {/* Description */}
                <p className="text-(--text-secondary) text-sm md:text-base
                              leading-relaxed max-w-md">
                    Learn from industry experts with our comprehensive courses. Start your
                    journey to success today with flexible, affordable, and quality education.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link href="/courses" className="BUTTON_STYLE w-full sm:w-auto justify-center">
                        Explore Courses
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>

                    <button className="flex items-center gap-2.5 text-sm font-medium
                                       text-foreground hover:text-(--primary-color)
                                       transition-colors duration-200">
                        <span className="w-10 h-10 rounded-full bg-(--primary-light)
                                         text-(--primary-color) flex items-center justify-center
                                         hover:bg-(--primary-color) hover:text-white
                                         transition-all duration-200">
                            <FontAwesomeIcon icon={faPlay} className="text-xs ml-0.5" />
                        </span>
                        Learn More
                    </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-5 md:gap-8 mt-2 pt-6
                                border-t border-border flex-wrap">
                    {stats.map(({ icon, value, label }) => (
                        <div key={label} className="flex items-center gap-2.5">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl
                                            bg-(--primary-light) text-(--primary-color)
                                            flex items-center justify-center shrink-0">
                                <FontAwesomeIcon icon={icon} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm md:text-base font-bold text-foreground">
                                    {value}
                                </span>
                                <span className="text-xs text-(--text-secondary)">
                                    {label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Right — Image */}
            <div className="relative w-full md:w-1/2 h-65 sm:h-95 md:h-140
                            rounded-3xl overflow-hidden shrink-0">
                <Image
                    fill
                    src={LANDING_IMAGE}
                    alt="Landing page"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-tr from-(--primary-color)/20 to-transparent" />
            </div>

        </div>
    )
}