import { getPaidCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions';
import CourseDetailsOverview from '@/app/[locale]/_Components/Courses/CourseDetailsOverview/CourseDetailsOverview';

type layoutProps = {
    params: Promise<{ id: string }>
}
export default async function page({params}:layoutProps) {
      const { id } = await params;
      const courseDeatils = await getPaidCreatedCourseByCourseIdAction(id);
  return (
    <div>
      {<CourseDetailsOverview data={courseDeatils?.data}  />}
    </div>
  )
}
