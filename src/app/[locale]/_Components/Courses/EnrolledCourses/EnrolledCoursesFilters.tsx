"use client"
import { useState } from 'react'
import { EnrolledCoursesFiltersProps } from './enrolled.courses.types'
import { FilterEnrolledCourses } from './FilterEnrolledCourses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';





export default function EnrolledCoursesFilters({ certificates, completed,
    enrolledCourses, inProgress }: EnrolledCoursesFiltersProps) {

    const STATS = [
        { label: "All Courses", changeValue: "enrolledCourses", value: enrolledCourses },
        { label: "In Progress", changeValue: "inProgress", value: inProgress },
        { label: "Completed", changeValue: "completed", value: completed },
        { label: "Certificates", changeValue: "certificates", value: certificates },
    ]

    const [currentShow, setCurrentShow] = useState("enrolledCourses");

    function handleChangeShow(clickedShow: string) {
        setCurrentShow(clickedShow);
    }

    return (
        <div className="px-5 lg:flex items-center justify-between md:gap-4">

            <div className="bg-white border border-border rounded-2xl
                    flex items-center justify-between gap-1 p-1.5 mt-5 
                        w-full lg:w-3/4">

                {STATS.map((stat) => {
                    const isActive = currentShow === stat.changeValue;
                    return (
                        <button
                            key={stat.changeValue}
                            onClick={() => handleChangeShow(stat.changeValue)}
                            className={`flex flex-wrap-reverse lg:flex-nowrap justify-center lg:justify-start 
                                 items-center gap-2 px-3 sm:px-4 py-2 rounded-xl
                                text-sm font-medium transition-all duration-200
                                cursor-pointer
                                ${isActive
                                    ? 'bg-(--primary-color) text-white'
                                    : 'text-(--text-secondary) hover:bg-(--primary-light) hover:text-(--primary-color)'
                                }`}
                        >
                            <span className="">{stat.label}</span>
                            {/* <span className="sm:hidden text-xs">{stat.label.split(' ')[0]}</span> */}
                            <span className={`text-xs w-5 h-5 rounded-full flex items-center
                                        justify-center font-semibold transition-all duration-200
                                        ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-(--input-background) text-(--text-secondary)'}`}>
                                {stat.value ?? 0}
                            </span>
                        </button>
                    )
                })}
            </div>
            <div className="mt-5 flex items-center gap-2  w-full lg:w-1/4">
                <FontAwesomeIcon
                className='text-(--primary-color)'
                icon={faFilter} />
                <FilterEnrolledCourses />
            </div>
        </div>
    )
}