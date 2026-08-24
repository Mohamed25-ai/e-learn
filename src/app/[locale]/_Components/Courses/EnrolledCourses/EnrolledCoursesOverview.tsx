import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { EnrolledCoursesOverviewProps } from "./enrolled.courses.types"
import { faAward, faBookOpen, faFireFlameCurved, faTrophy } from "@fortawesome/free-solid-svg-icons"
import { getTranslations } from "next-intl/server"





{/* <FontAwesomeIcon icon={faBookOpen} /> */ }
export default async function EnrolledCoursesOverview({ certificates, completed,
    enrolledCourses, inProgress }: EnrolledCoursesOverviewProps) {
    const t = await getTranslations();
    const STATS = [
        { icon: faBookOpen, label: t('EnrolledCourses.stats.enrolledCourses'), value: enrolledCourses },
        { icon: faFireFlameCurved, label: t('EnrolledCourses.stats.inProgress'), value: inProgress },
        { icon: faTrophy, label: t('EnrolledCourses.stats.completed'), value: completed },
        { icon: faAward, label: t('EnrolledCourses.stats.certificates'), value: certificates },
    ]

    return (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white border border-border rounded-2xl p-5
                               flex items-center gap-4 shadow-sm
                               transition-all duration-200 hover:-translate-y-0.5
                               hover:shadow-[0_6px_20px_rgba(73,187,189,0.12)]"
                >
                    <div className="w-12 h-12 rounded-xl bg-(--primary-light)
                                    text-(--primary-color) flex items-center
                                    justify-center text-lg shrink-0">
                        <FontAwesomeIcon icon={stat.icon} />
                    </div>

                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-xl font-bold text-foreground">
                            {stat.value ?? 0}
                        </span>
                        <span className="text-xs text-(--text-secondary) truncate">
                            {stat.label}
                        </span>
                    </div>
                </div>
            ))}
        </section>
    )
}