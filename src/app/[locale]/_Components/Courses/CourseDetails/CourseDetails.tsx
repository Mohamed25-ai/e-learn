import React from 'react'
import { CourseDetailsProps } from './coursedetails.types'
import CourseDetailsHeader from '../CourseDetailsHeader/CourseDetailsHeader'
import CourseDetailsCard from '../CourseDetailsCard/CourseDetailsCard'
import CourseDetailsContent from '../CourseDetailsContent/CourseDetailsContent'
import { Link } from '@/i18n/navigation'

export default function CourseDetails({ data }: CourseDetailsProps) {
    return (
        <>
            <div className='bg-(--primary-color) md:flex justify-between md:p-5'>

                <CourseDetailsHeader data={data} />
                <CourseDetailsCard data={data} />
            </div>
            <div className='px-5 mt-5'>
                <CourseDetailsContent data={data} />
            </div>
        </>
    )
}
