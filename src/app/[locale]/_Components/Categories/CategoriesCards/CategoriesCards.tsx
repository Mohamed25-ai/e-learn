'use client'
import { CategorieCardsProps } from "./categorycards.type";
import CoursesByCategoryId from "../../Cources/CoursesByCategoryId/CoursesByCategoryId";
import CategoriesOverview from "../CategoriesOverview/CategoriesOverview";
import { faAngleLeft, faAngleRight, faArrowRight, faCode, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoursesByCategorieId } from "@/services/courses/courses.service";
import { getCoursesByCategorieIdAction } from "@/actions/courses/courses.actions";

export default function CategoriesCards({ categorie }: CategorieCardsProps) {
    const [pageNum, setpageNum] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const queryClient = useQueryClient();
    const { data: courses, isLoading } = useQuery({
        queryKey: ['getCourseByCategoryId', categorie.id, pageNum, pageSize],
        queryFn: () => getCoursesByCategorieIdAction(categorie.id, pageSize, pageNum)
    })
    console.log("object", courses)

    function handlePreviousPagination() {
        if (courses.data?.hasPreviousPage) {
            setpageNum((prev) => prev - 1)
        }
    }
    function handleNextPagination() {
        if (courses.data?.hasNextPage) {
            setpageNum((prev) => prev + 1)
        }
    }
    useEffect(() => {
        const updatePageSize = () => {
            if (window.innerWidth >= 1280) {
                setPageSize(4);
            } else if (window.innerWidth >= 768) {
                setPageSize(2);
            } else {
                setPageSize(1);
            }
        };

        updatePageSize();
        window.addEventListener("resize", updatePageSize);

        return () => window.removeEventListener("resize", updatePageSize);
    }, []);
    useEffect(() => {
    setpageNum(1);
}, [pageSize]);
    return (
        <section id={categorie.id} className="w-full px-5 my-2">
            <header>
                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">
                        {/* Icon / Thumbnail */}
                        {categorie.thumbnailUrl != null
                            ? <img
                                src={categorie.thumbnailUrl}
                                alt={categorie.name}
                                className="w-14 h-14 rounded-2xl object-cover"
                            />
                            : <span className="w-14 h-14 rounded-2xl bg-(--primary-light) text-(--primary-color) flex items-center justify-center text-xl shrink-0">
                                <FontAwesomeIcon icon={faCode} />
                            </span>
                        }

                        {/* Title + stats */}
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-foreground font-bold md:text-xl leading-snug">
                                {categorie.name.trim()}
                            </h2>
                            <div className="flex items-center gap-3 text-sm text-(--text-secondary)">
                                <span>{courses?.data?.totalCount} courses</span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span className="flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faUserGroup} className="text-xs" />
                                    students
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* See all */}
                    <Link
                        href={`/categorizedcourse/${categorie.id}?pageNumber=1`}
                        className="MAIN_BUTTON text-nowrap"
                    >
                        See All
                        <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>

                </div>
            </header>

            <section className="py-3">
                <CoursesByCategoryId isLoading={isLoading} courseData={courses?.data} pageNum={pageNum}
                    handleNextPagination={handleNextPagination} handlePreviousPagination={handlePreviousPagination} key={categorie.id} categoryid={categorie.id} />
            </section>
        </section>
    )
}
