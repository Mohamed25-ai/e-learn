import { Link } from '@/i18n/navigation'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faBookOpen, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CategorizedCourseProps } from './categorizedcourse.types'


export default function CategorizedCourse({meta,totalCount}:CategorizedCourseProps) {
    return (
        <header>
            <div className='bg-foreground p-5'>
                <div className='my-3'>
                    <FontAwesomeIcon className='text-(--text-secondary) ' icon={faAngleLeft} />
                    <Link className='text-(--text-secondary) mb-4' href={'/categories'}>All Categories</Link>
                </div>
                <div className='flex gap-2.5 '>
                    <div>
                        {meta?.categoryThumbnailUrl != null
                            ? <img
                                src={meta?.categoryThumbnailUrl}
                                alt={meta?.categoryName}
                                className="w-14 h-14 rounded-2xl object-cover"
                            />
                            : <span className="w-14 h-14 rounded-2xl bg-(--primary-light) text-(--primary-color) flex items-center justify-center text-xl shrink-0">
                                <FontAwesomeIcon icon={faCode} />
                            </span>
                        }
                    </div>
                    <div className="logo flex flex-col  gap-2">
                        <div>
                            <h2 className='text-white text-2xl'>{meta?.categoryName}</h2>
                            <p className='text-(--text-secondary)'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, laboriosam!</p>
                        </div>
                    <div className=''>
                        <FontAwesomeIcon className='text-(--text-secondary) me-2' icon={faBookOpen} />
                        <span className=' text-(--text-secondary)'>{totalCount} Courses</span>
                    </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
