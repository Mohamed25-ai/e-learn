import React from 'react'
import { AccordionDemo } from '../../CoursesAccordionWrapper/AccordionDemo/AccordionDemo'
import { CourseDetailsCurriculumProps } from './coursedetailscurriculum.type'
import { getCourseSectionAction } from '@/actions/courses/courses.actions'
import { SectionData } from '../../CoursesByCategoryId/coursebycategoryId.types'
import CoursesDetailsAccordionWrapper from '../../CoursesAccordionWrapper/CoursesDetailsAccordionWrapper'
import { getTranslations } from 'next-intl/server'

export default async function CourseDetailsCurriculum({ courdeId, withHeader, inPlay }: CourseDetailsCurriculumProps) {
  const t = await getTranslations();
  const sections = await getCourseSectionAction(courdeId);
  return (
    <section className={`${!inPlay && "mt-5 px-5 "} `}>
      <header className='my-4'>
        <h2 className='text-foreground text-3xl font-bold'>
          {t('CourseCurriculum.title')}
        </h2>
        <p>{`${t('CourseCurriculum.sectionsCount', { count: sections.data.totalCount })}`}</p>
      </header>
      <>
        {sections?.data?.data.length == 0 ? <div>
          <h1>{t('CourseCurriculum.noSections')}</h1>
        </div> : sections?.data?.data.map((section: SectionData) => (<CoursesDetailsAccordionWrapper
          key={section.id} data={section} />))}
      </>
    </section>
  )
}