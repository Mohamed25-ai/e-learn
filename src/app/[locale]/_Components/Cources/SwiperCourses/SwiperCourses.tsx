'use client'
import { getCoursesByCategorieIdAction } from "@/actions/courses/courses.actions";
import MainSwiper from "../../HomeCoursesSwiper/HomeCoursesSwiper";
import { CategoriesType } from "@/app/[locale]/(main)/categories/categories.type";
import { listAllCategoriesAction } from "@/actions/categories/categories.actions";
import { CategoriesListProps } from "../../Categories/CategoriesList/categorieslist.type";
import { HomeCoursesProps } from "./swipercourses.type";
import { getCoursesByCategorieId } from "@/services/courses/courses.service";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import HomeCoursesSwiper from "../../HomeCoursesSwiper/HomeCoursesSwiper";
import CardsLoader from "../../Loaders/CardsLoader/CardsLoader";
import { BUTTON_STYLE, MAIN_BUTTON } from "@/utils/utils";
import { CourseData } from "../CoursesByCategoryId/coursebycategoryId.type";


export default function SwiperCourses({ id, name }: HomeCoursesProps) {
    const { data, isLoading } = useQuery({
        queryKey: ["courses", id],
        queryFn: () => getCoursesByCategorieId(id),
    });
    const courseData=data?.data?.data;

    return (
        <section className="space-y-6">
            <header className="flex items-center justify-between px-5">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-foreground)">
                        {name}
                    </h1>
                    <p className="text-sm text-(--text-secondary)">
                        Explore top courses picked for you
                    </p>
                </div>

                <button
                    className="MAIN_BUTTON px-3 text-nowrap "
                >
                    See All
                </button>
            </header>

            <section className="px-5">
                {isLoading ? (
                    <CardsLoader length={courseData?.length??10} />
                ) : (
                    <div className="rounded-(--radius) bg-background">
                        <HomeCoursesSwiper courseData={courseData} />
                    </div>
                )}
            </section>
        </section>
    );
}
