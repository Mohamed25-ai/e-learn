import { Link } from '@/i18n/navigation'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FeaturedCoursesProps } from './featuredcourses.types'
import CategorieHeader from '../../Categories/CategorieHeader/CategorieHeader'
import FeaturedCategoryCourses from './FeaturedCategoryCourses/FeaturedCategoryCourses'

export default function FeaturedCourses({ categories }: FeaturedCoursesProps) {
    const { data } = categories;
    return (
        <section className="px-5 py-10">
            {/* Header */}
            <header className="p-5 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl sm:text-xl md:text-4xl font-bold
                                   leading-tight text-foreground">
                        Featured Courses
                    </h2>
                    <p className="mt-1.5 text-sm text-(--text-secondary)">
                        Handpicked courses to help you reach your goals
                    </p>
                </div>

                <Link
                    href={"/courses"}
                    className="MAIN_BUTTON gap-2 whitespace-nowrap group"
                >
                    {"Browse All Courses"}
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="transition-transform duration-200 group-hover:translate-x-1"
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