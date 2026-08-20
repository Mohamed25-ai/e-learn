'use client'
import { CourseByCategoryIdProps, CourseData, CoursesType } from "./coursebycategoryId.types"
import { getCoursesByCategorieIdAction } from "@/actions/courses/courses.actions";
import CourseCard from "../CourseCard/CourseCard";
import { getCoursesByCategorieId } from "@/services/courses/courses.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CardsLoader from "../../Loaders/CardsLoader/CardsLoader";
import { useLocale } from 'next-intl';
import { AnimatePresence, motion } from "framer-motion";
type Direction = 'left' | 'right' | null;
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
};
export default function CoursesByCategoryId({ courseData, categoryid, handleNextPagination,
    handlePreviousPagination, isLoading }: CourseByCategoryIdProps) {
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const handleNext = () => {
        handleNextPagination();
    };
    const handlePrev = () => {
        handlePreviousPagination();
    };
    return (
        <div dir={isRtl ? "rtl" : "ltr"} className="relative">
            {/* Cards grid with fade transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${categoryid}-${courseData?.currentPage}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className={`rtl:grid-rows-none grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-4 gap-4 w-full `}
                >
                    {isLoading ? (
                        <CardsLoader length={courseData?.data.length ?? 4} />
                    ) : (
                        courseData?.data.map((course: CourseData) => (
                            <motion.div
                                key={course.id}
                                variants={itemVariants}
                                layout
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </AnimatePresence>

            {courseData?.hasPreviousPage && (
                <Button
                    className="absolute top-1/2 -translate-y-1/2 -start-3 md:-start-6
                                z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white border-2 border-border text-foreground hover:bg-(--primary-light) hover:border-(--primary-color) hover:text-(--primary-color) transition-all duration-200 shadow-sm cursor-pointer"
                    onClick={handlePreviousPagination}
                >
                    {/* Flip icon horizontally in RTL */}
                    <FontAwesomeIcon icon={faAngleLeft} className="rtl:scale-x-[-1]" />
                </Button>
            )}
            {courseData?.hasNextPage && (
                <Button
                    className="absolute top-1/2 -translate-y-1/2 -end-4 z-10 w-11 h-11 rounded-full 
                    flex items-center justify-center bg-white border-2 border-border text-foreground hover:bg-(--primary-light) hover:border-(--primary-color) hover:text-(--primary-color) transition-all duration-200 shadow-sm cursor-pointer"
                    onClick={handleNextPagination}
                >
                    {/* Flip icon horizontally in RTL */}
                    <FontAwesomeIcon icon={faAngleRight} className="rtl:scale-x-[-1]" />
                </Button>
            )}
        </div>
    );
}
