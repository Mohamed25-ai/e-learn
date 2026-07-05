import { getCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions';
import CourseDetailsOverview from '@/app/[locale]/_Components/Cources/CourseDetailsOverview/CourseDetailsOverview';
import React from 'react'
type layoutProps = {
    params: Promise<{ id: string }>
}
export default async function page({params}:layoutProps) {
      const { id } = await params;
      const courseDeatils = await getCreatedCourseByCourseIdAction(id);
  return (
    <div>
      {<CourseDetailsOverview data={courseDeatils?.data}  />}
    </div>
  )
}
