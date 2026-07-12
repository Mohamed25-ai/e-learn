
import { Link } from '@/i18n/navigation'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FeaturedCoursesProps } from './featuredcourses.types'
import CategorieHeader from '../../Categories/CategorieHeader/CategorieHeader'
import { CategoriesDataType } from '@/app/[locale]/(main)/(Categories)/categories/categories.type'
import FeaturedCategoryCourses from './FeaturedCategoryCourses/FeaturedCategoryCourses'


export default function FeaturedCourses({categories}:FeaturedCoursesProps) {
    const {data}=categories;
    return (
        <section className='px-5 mt-5'>
            <header className='flex items-center justify-between'>
                <div>
                    <h2 className='text-4xl font-bold leading-tight text-foreground'>Featured Courses</h2>
                    <p className='mt-1.5 text-sm text-(--text-secondary)'>Handpicked courses to help you reach your goals</p>
                </div>
                <div>
                    <Link
                        href={"/courses"}
                        className="MAIN_BUTTON gap-2 whitespace-nowrap group"
                    >
                        Browse All Courses
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </header>
            <div>
                {data?.data?.map((categorie)=>{
                    return (
                        <div key={categorie.id}>
                        <CategorieHeader key={categorie.id} categorie={categorie} />
                        <div>
                            <FeaturedCategoryCourses key={categorie.id} categorie={categorie} />
                        </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
