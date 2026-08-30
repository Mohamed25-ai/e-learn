import { Link } from '@/i18n/navigation'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FeaturedCoursesProps } from './featuredcourses.types'
import CategorieHeader from '../../Categories/CategorieHeader/CategorieHeader'
import FeaturedCategoryCourses from './FeaturedCategoryCourses/FeaturedCategoryCourses'
import { getTranslations } from 'next-intl/server'

export default async function FeaturedCourses({ categories }: FeaturedCoursesProps) {
    const t = await getTranslations();
    const { data } = categories;
    return (
        <section className="px-2 lg:px-5 py-10">
            {/* Header */}
            <header className="p-5 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl sm:text-xl md:text-4xl font-bold
                                   leading-tight text-foreground">
                        {t('FeaturedCourses.title')}
                    </h2>
                    <p className="mt-1.5 text-sm text-(--text-secondary)">
                        {t('FeaturedCourses.subtitle')}
                    </p>
                </div>

                <Link
                    href={"/courses"}
                    className="MAIN_BUTTON gap-2 whitespace-nowrap group"
                >
                    {t('FeaturedCourses.browseAll')}
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </header>
            {/* Categories */}
            <div className="md:px-5 mt-8 flex flex-col gap-10">
                {data?.data?.map((categorie) => (
                    <div key={categorie.id} className="flex flex-col gap-4">
                        <CategorieHeader inHomePage categorie={categorie} />
                        <FeaturedCategoryCourses categorie={categorie} />
                    </div>
                ))}
            </div>
        </section>
    )
}