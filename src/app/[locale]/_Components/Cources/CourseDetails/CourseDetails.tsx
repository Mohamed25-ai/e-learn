import React from 'react'
import { CourseDetailsProps } from './coursedetails.types'
import CourseDetailsHeader from '../CourseDetailsHeader/CourseDetailsHeader'
import CourseDetailsCard from '../CourseDetailsCard/CourseDetailsCard'

export default function CourseDetails({data}:CourseDetailsProps) {
    return (
        <div className='bg-(--primary-color) md:flex justify-between md:p-5'>
            <CourseDetailsHeader data={data} />
            <CourseDetailsCard data={data} />
        </div>
    )
}
