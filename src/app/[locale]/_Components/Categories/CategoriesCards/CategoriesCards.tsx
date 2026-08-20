'use client'
import { CategorieCardsProps } from "./categorycards.type";
import CategoriesOverview from "../CategoriesOverview/CategoriesOverview";
import { faAngleLeft, faAngleRight, faArrowRight, faCode, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoursesByCategorieId } from "@/services/courses/courses.service";
import { getCoursesByCategorieIdAction } from "@/actions/courses/courses.actions";
import { useLocale } from 'next-intl';
import CoursesByCategoryId from "../../Courses/CoursesByCategoryId/CoursesByCategoryId";
import CategorieHeader from "../CategorieHeader/CategorieHeader";
export default function CategoriesCards({ categorie,inCoursesPage }: CategorieCardsProps) {
    const [pageNum, setpageNum] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const queryClient = useQueryClient();
    const { data: courses, isLoading } = useQuery({
        queryKey: ['getCourseByCategoryId', categorie.id, pageNum, pageSize],
        queryFn: () => getCoursesByCategorieIdAction(categorie.id, pageSize, pageNum)
    })
    const locale = useLocale();
    const isRtl = locale === 'ar';

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
        <section dir={isRtl ? "rtl" : "ltr"} id={categorie.id} className="w-full px-5 my-2">
            <CategorieHeader inCoursesPage={inCoursesPage}  categorie={categorie}  />
            <section className="py-3">
                <CoursesByCategoryId isLoading={isLoading} courseData={courses?.data} pageNum={pageNum}
                    handleNextPagination={handleNextPagination} handlePreviousPagination={handlePreviousPagination} key={categorie.id} categoryid={categorie.id} />
            </section>
        </section>
    )
}
