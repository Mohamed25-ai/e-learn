"use client"

import { usePathname, useRouter } from "@/i18n/navigation"
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CourseLearningSidebarTogglerProps } from "../course.learning.types";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { steInitialState } from "@/store/redux/courselearninig/courselearning.slice";
import { useSearchParams } from "next/navigation";
import { toggleCourseLearningSidebar } from "@/store/redux/togglers/togglers.slice";

export default function CourseLearningSidebarToggler({ courseId }: CourseLearningSidebarTogglerProps) {
    const router = useRouter();
    const searchParams=useSearchParams();
    const dispatch = useAppDispatch();
    function handleToggleSidebar() {
        dispatch(toggleCourseLearningSidebar());
    }
    function handleCloseCourseLesson() {
        const params=new URLSearchParams(searchParams.toString());
        params.delete("lessonID")
        router.push(`/course-details/${courseId}/overview`,{
            scroll:false
        });
        dispatch(steInitialState());
    }

    return (
        <div className="flex justify-between  items-center fixed right-0 left-0 z-25 px-2 bg-(--primary-hover)">
            <div className="right">
                <p>Completeness</p>
            </div>
            <div className="left flex items-center gap-2">
                <header>
                    <h2>Course Title</h2>
                    <h3>Welcome to the Course</h3>
                </header>
                <div className=" flex gap-3">
                    <FontAwesomeIcon onClick={handleToggleSidebar} className="select-none cursor-pointer" size="lg" icon={faBars} />
                    <FontAwesomeIcon onClick={handleCloseCourseLesson} size="lg" icon={faCircleXmark} />
                </div>
            </div>
        </div>
    )
}
