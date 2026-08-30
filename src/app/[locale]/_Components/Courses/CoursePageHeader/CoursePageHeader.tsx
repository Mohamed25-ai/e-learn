import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'lucide-react'
import React from 'react'
import CategoriesOverview from '../../Categories/CategoriesOverview/CategoriesOverview'
import { getTranslations } from 'next-intl/server'

export default async function CoursePageHeader() {
    const t = await getTranslations();
    return (
        <div>
            <header className="p-5 flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-bold leading-tight text-foreground">
                        {t('CoursesPage.header.title')}
                    </h2>
                    <p className="mt-1.5 text-sm text-(--text-secondary)">
                        {t('CoursesPage.header.subtitle')}
                    </p>
                </div>
            </header>
            <div className="px-5 mb-10">
                <CategoriesOverview />
            </div>
        </div>
    )
}