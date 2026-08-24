import React from 'react'
import { AccordionDemo } from '../AccordionDemo/AccordionDemo'
import { CourseDetailsCurriculumProps } from './coursedetailscurriculum.type'
import { getCourseSectionAction } from '@/actions/courses/courses.actions'
import CoursesAccordionWrapper from '../CoursesAccordionWrapper/CoursesAccordionWrapper'
import { SectionData } from '../CoursesByCategoryId/coursebycategoryId.types'

export default async function CourseDetailsCurriculum({ courdeId, withHeader, inPlay }: CourseDetailsCurriculumProps) {
  const sections = await getCourseSectionAction(courdeId);
  return (
    <section className={`${!inPlay && "mt-5 px-5 "} `}>
      {withHeader && <header className='my-4'>
        <h2 className='text-foreground text-3xl font-bold'>
          Course Curriculum
        </h2>
        <p>{`${sections.data.totalCount} sections • 114 lectures • 30 hours total length"`}</p>
      </header>}
      {sections?.data?.data.map((section: SectionData) => (<CoursesAccordionWrapper
        inPlayPage={inPlay} key={section.id} data={section} />))}
    </section>
  )
}
