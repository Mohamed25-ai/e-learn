import dynamic from 'next/dynamic';
import { getLocale } from 'next-intl/server';
import {getCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions';
import CourseLearningSidebar from '@/app/[locale]/_Components/Courses/CourseLearning/CourseLearningSidebar/CourseLearningSidebar';
import CourseLearningSidebarToggler from '@/app/[locale]/_Components/Courses/CourseLearning/CourseLearningSidebarToggler/CourseLearningSidebarToggler';
import CourseLearningSidebarWrapper from '@/app/[locale]/_Components/Courses/CourseLearning/CourseLearningSidebarWrapper/CourseLearningSidebarWrapper';
import VideoLearningWrapper from '@/app/[locale]/_Components/Courses/CourseLearning/VideoLearningWrapper/VideoLearningWrapper';
import CourseLearningVideoScreen from '@/app/[locale]/_Components/Courses/CourseLearning/CourseLearningVideoScreen/CourseLearningVideoScreen';
import FormLoader from '@/app/[locale]/_Components/Loaders/FormLoader/FormLoader';
import CourseDeatils3Buttons from '@/app/[locale]/_Components/Courses/CourseDetails/CourseDeatils3Buttons/CourseDeatils3Buttons';
const CourseLearningVideoScreenComponent = dynamic(
    () => import('@/app/[locale]/_Components/Courses/CourseLearning/CourseLearningVideoScreen/CourseLearningVideoScreen'),
{
    loading:()=><FormLoader />
}
)

type layoutProps = {
    children: React.ReactNode,
    params: Promise<{ id: string, locale: string }> // Added locale to params if available
}

export default async function Layout({ children, params }: layoutProps) {
    const { id } = await params;
    const locale = await getLocale();
    const courseDeatils = await getCreatedCourseByCourseIdAction(id);
    console.log("courseDeatils",courseDeatils)
    // Define your RTL locales here
    const isRtl = locale === 'ar';

    return (
        <section dir={isRtl ? 'rtl' : 'ltr'}>
            <CourseLearningSidebarToggler courseId={id} />
            <div className='flex flex-row'>
                <VideoLearningWrapper>
                    <CourseLearningVideoScreenComponent />
                </VideoLearningWrapper>

                <CourseLearningSidebarWrapper>
                    <CourseLearningSidebar courseId={id} />
                </CourseLearningSidebarWrapper>
            </div>
            <div className='px-5'>
                <CourseDeatils3Buttons data={courseDeatils?.data} inPlayPage />
                {children}
            </div>
        </section>
    )
}