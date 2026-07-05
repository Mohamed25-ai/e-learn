import { getLocale } from 'next-intl/server';
import CourseLearningSidebarToggler from '@/app/[locale]/_Components/Cources/CourseLearning/CourseLearningSidebarToggler/CourseLearningSidebarToggler';
import CourseLearningSidebarWrapper from '@/app/[locale]/_Components/Cources/CourseLearning/CourseLearningSidebarWrapper/CourseLearningSidebarWrapper';
import CourseLearningSidebar from '@/app/[locale]/_Components/Cources/CourseLearning/CourseLearningSidebar/CourseLearningSidebar';
import React from 'react';
import VideoLearningWrapper from '@/app/[locale]/_Components/Cources/CourseLearning/CourseLearningSidebar/VideoLearningWrapper/VideoLearningWrapper';
import { getCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions';
import CourseDeatils3Buttons from '@/app/[locale]/_Components/Cources/CourseDeatils3Buttons/CourseDeatils3Buttons';
import CourseLearningVideoScreen from '@/app/[locale]/_Components/Cources/CourseLearningVideoScreen/CourseLearningVideoScreen';

type layoutProps = {
    children: React.ReactNode,
    params: Promise<{ id: string, locale: string }> // Added locale to params if available
}

export default async function Layout({ children, params }: layoutProps) {
    const { id } = await params;
    const locale = await getLocale();
    const courseDeatils = await getCreatedCourseByCourseIdAction(id);

    // Define your RTL locales here
    const isRtl = locale === 'ar';

    return (
        <section dir={isRtl ? 'rtl' : 'ltr'}>
            <CourseLearningSidebarToggler courseId={id} />
            {/* Using flex ensures that items are ordered correctly based on the 'dir' attribute.
                Tailwind's 'flex-row' will automatically flip to 'row-reverse' in RTL mode
                when using logical properties or standard flex containers.
            */}
            <div className='flex flex-row'>
                <VideoLearningWrapper>
                    <CourseLearningVideoScreen />
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