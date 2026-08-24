"use client"
import COURSE_STATIC_IMAGE from '@/assets/images/Static course image.jpg'
import { EnrolledCourseCardProps } from './enrolled.courses.types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Progress } from '@/components/ui/progress'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export default  function EnrolledCourseCard({ enrolledCourseData }: EnrolledCourseCardProps) {
    const t =  useTranslations();
    return (
        <Link href={`/course-learn/${enrolledCourseData.courseId}/play`}>
            <Card className=" lg:flex lg:flex-row mb-3 p-0 overflow-hidden gap-0
                            border border-border shadow-sm
                            transition-all duration-200 hover:-translate-y-0.5
                            hover:shadow-[0_6px_20px_rgba(73,187,189,0.12)]">
                {/* Thumbnail */}
                <CardHeader className=" w-full lg:w-1/4  p-0 shrink-0 gap-0">
                    <div className="relative aspect-video h-full ">
                        <Image
                            fill
                            className=" "
                            src={enrolledCourseData.thumbnail ?? COURSE_STATIC_IMAGE}
                            alt={enrolledCourseData.title || t('EnrolledCourses.card.defaultTitle')}
                        />
                    </div>
                </CardHeader>

                {/* Content */}
                <CardContent className="flex-1 p-3 flex flex-col  gap-3 min-w-0">
                    {/* Category badge */}
                    <div className='flex justify-between'>
                        <span className="bg-(--primary-light) text-(--primary-color)
                                 text-xs font-semibold px-3 py-0.5 rounded-full w-fit">
                            {t('EnrolledCourses.card.webDevelopment')}
                        </span>

                        <span className="bg-gray-200 text-(--text-secondary)
                                 text-xs font-semibold px-3 py-0.5 rounded-full w-fit">
                            <FontAwesomeIcon icon={faFireFlameCurved} />
                            <span>{t('EnrolledCourses.card.inProgress')}</span>
                        </span>
                    </div>
                    {/* Title + Instructor */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <h2 className="text-sm lg:text-2xl font-bold text-foreground
                                   leading-snug line-clamp-2">
                            {enrolledCourseData.title}
                        </h2>
                        <p className="text-xs text-(--text-secondary) truncate">
                            {enrolledCourseData.instructorName}
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div className="">
                        <div className='flex justify-end '>
                            <span className='text-foreground font-bold'>{enrolledCourseData.progressPercent}</span>
                            <span className='text-foreground font-bold'>%</span>
                        </div>
                        <Progress value={enrolledCourseData.progressPercent}
                            className={`h-1.5 transition-all duration-300 bg-(--primary-light)`}
                        />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}