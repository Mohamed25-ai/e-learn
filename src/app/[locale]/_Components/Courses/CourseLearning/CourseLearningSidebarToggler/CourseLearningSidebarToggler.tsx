"use client"

import { useRouter } from "@/i18n/navigation"
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CourseLearningSidebarTogglerProps } from "../course.learning.types";
import { useAppDispatch } from "@/hooks/hooks";
import { steInitialState } from "@/store/redux/courselearninig/courselearning.slice";
import { useSearchParams } from "next/navigation";
import { toggleCourseLearningSidebar } from "@/store/redux/togglers/togglers.slice";
import { Progress } from "@/components/ui/progress";

export default function CourseLearningSidebarToggler({
    courseId,
    courseDetailsData,
    courseProgress
}: CourseLearningSidebarTogglerProps) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    function handleToggleSidebar() {
        dispatch(toggleCourseLearningSidebar());
    }

    function handleCloseCourseLesson() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("lessonID");
        router.push(`/course-details/${courseId}/overview`, { scroll: false });
        dispatch(steInitialState());
    }

    return (
        <div className="fixed right-0 left-0 z-50 px-4 py-2.5
                        bg-(--primary-color)/70
                        flex items-center justify-between gap-4">

            {/* Left — title + subtitle */}
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <h2 className="text-foreground font-semibold text-sm sm:text-base
                                leading-snug truncate">
                    {courseDetailsData.title}
                </h2>
                <h3 className="text-foreground text-xs hidden sm:block truncate">
                    {courseDetailsData.description}
                </h3>
            </div>

            {/* Center — progress */}
            <div className="hidden md:flex items-center gap-2 w-1/4">
                <Progress value={courseProgress.percent}
                            className={`h-1.5 transition-all duration-300 bg-(--primary-light)`}
                        />
                <span className="text-(--primary-light) text-xs font-bold shrink-0">
                    {courseProgress.percent}%
                </span>
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-4 shrink-0">
                <button
                    onClick={handleToggleSidebar}
                    className="text-(--primary-light) hover:text-white
                               transition-colors duration-200 cursor-pointer"
                    aria-label="Toggle sidebar"
                >
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>
                <button
                    onClick={handleCloseCourseLesson}
                    className="text-(--primary-light) hover:text-white
                               transition-colors duration-200 cursor-pointer"
                    aria-label="Close lesson"
                >
                    <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                </button>
            </div>

        </div>
    )
}