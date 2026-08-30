import React from 'react'
import { CourseDetailsHeaderProps } from './coursedetailsheader.types'
import Image from 'next/image'
import PROFILEIMAGE from '@/assets/images/blank-profile-picture-973460_960_720.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUsers, faClock, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function CourseDetailsHeader({ data }: CourseDetailsHeaderProps) {
    const t = await getTranslations();
    return (
        <>

            <div className='px-8 py-5'>
                <div className='mb-4 '>
                    <Link href={`/courses`} className='text-foreground hover:text-white'>
                        <FontAwesomeIcon className=' rtl:rotate-180 me-1 ' icon={faArrowLeft} />
                        {t('CourseDetails.backToCourses')}</Link>
                </div>
                {/* Title */}
                <h1 className='text-white font-extrabold text-3xl leading-snug max-w-3xl'>
                    {data?.title}
                </h1>
                {/* Description */}
                <p className='text-white/70 whitespace-normal wrap-break-word mt-3 text-sm leading-relaxed max-w-2xl'>
                    {data?.description}
                </p>
                {/* Overview */}
                <div className='flex items-center gap-5 mt-5 flex-wrap'>
                    {data?.averageRating != null && (
                        <div className='flex items-center gap-1.5 text-sm'>
                            <FontAwesomeIcon icon={faStar} className='text-(--warning)' />
                            <span className='text-white font-bold'>
                                {Number(data.averageRating).toFixed(1)}
                            </span>
                            {data?.ratingCount != null && (
                                <span className='text-white/60'>
                                    {t('CourseDetails.ratingsCount', { count: data?.ratingCount.toLocaleString() })}
                                </span>
                            )}
                        </div>
                    )}

                    {data?.noOfStudents != null && (
                        <div className='flex items-center gap-1.5 text-sm text-white/80'>
                            <FontAwesomeIcon icon={faUsers} className='text-white/60' />
                            <span>{t('CourseDetails.studentsCount', { count: data.noOfStudents.toLocaleString() })}</span>
                        </div>
                    )}

                    {/* {data?.duration && (
                    <div className='flex items-center gap-1.5 text-sm text-white/80'>
                        <FontAwesomeIcon icon={faClock} className='text-white/60' />
                        <span>{data.duration} total hours</span>
                    </div>
                )} */}

                </div>

                {/* Instructor */}
                <div className='flex items-center gap-3 mt-8'>
                    <div className='relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shrink-0'>
                        <Image
                            src={data?.instructorProfilePictureUrl || PROFILEIMAGE}
                            alt={data?.instructorName}
                            fill
                            className='object-cover'
                        />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <span className='text-white/60 text-xs'>{t('CourseDetails.instructor')}</span>
                        <span className='text-white font-semibold text-sm'>
                            {data?.instructorName}
                        </span>
                    </div>
                </div>

            </div>
        </>
    )
}