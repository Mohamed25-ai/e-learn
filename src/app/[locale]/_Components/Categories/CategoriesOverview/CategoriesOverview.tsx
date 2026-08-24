import React from 'react'
import { faAward, faBookOpen, faGlobe, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTranslations } from 'next-intl/server'

export default async function CategoriesOverview() {
    const t = await getTranslations();

    const stats = [
        { icon: faGlobe, value: '8', label: t('Categories.overview.totalCategories') },
        { icon: faBookOpen, value: '124', label: t('Categories.overview.totalCourses') },
        { icon: faUserGroup, value: '3.2k', label: t('Categories.overview.activeStudents') },
        { icon: faAward, value: '48', label: t('Categories.overview.expertInstructors') },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ icon, value, label }) => (
                <div
                    key={label}
                    className="bg-white border-2 border-border rounded-2xl p-5
                    flex flex-col gap-3
                    transition-all duration-200
                    hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(73,187,189,0.12)] items-center "
                >
                    <div
                        className="w-11 h-11 rounded-xl bg-(--primary-light) text-(--primary-color) flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={icon} className="text-lg" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-semibold text-foreground">
                            {value}
                        </span>
                        <span className="text-sm text-(--text-secondary)">
                            {label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}