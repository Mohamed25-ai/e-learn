import React from 'react'
import { CategoriesPageHeaderProps } from './categories.page.header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@/i18n/navigation'
import CategoriesOverview from '../CategoriesOverview/CategoriesOverview'
import ListAllCategoriesBadges from '../ListAllCategoriesBadges/ListAllCategoriesBadges'
import { getTranslations } from 'next-intl/server'

export default async function CategoriesPageHeader({categories,inCategoriesPage,inHomePage}: CategoriesPageHeaderProps) {
    const t = await getTranslations();
    return (
        <section>
            <header className="p-5 flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-bold leading-tight text-foreground">
                        {t('Categories.pageHeader.title')}
                    </h2>
                    <p className="mt-1.5 text-sm text-(--text-secondary)">
                        {t('Categories.pageHeader.subtitle')}
                    </p>
                </div>

                {inHomePage&&<Link
                    href={"/categories"}
                    className="MAIN_BUTTON gap-2 whitespace-nowrap group"
                >
                    {t('Categories.pageHeader.browseAll')}
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>}
            </header>
            <div className="px-5 mb-10">
                <CategoriesOverview />
                {inCategoriesPage&&<ListAllCategoriesBadges categories={categories} />}
            </div>
        </section>
    )
}