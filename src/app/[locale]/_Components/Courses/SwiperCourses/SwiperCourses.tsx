// 'use client'

import { HomeCoursesProps } from "./swipercourses.type";
import { getCoursesByCategorieId } from "@/services/courses/courses.service";
import { Link } from "@/i18n/navigation";
import HomeCoursesSwiper from "../../Swipers/HomeCoursesSwiper/HomeCoursesSwiper";


export default async function SwiperCourses({ id, name }: HomeCoursesProps) {
    const data=await getCoursesByCategorieId(id);
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

                <Link href={'/'}
                    className="MAIN_BUTTON px-3 text-nowrap "
                >
                    See All
                </Link>
            </header>

            <section className="px-5">
                {/* {isLoading ? (
                    <CardsLoader length={courseData?.length??10} />
                ) : (
                )} */}
                    <div className="rounded-(--radius) bg-background">
                        {/* <HomeCoursesSwiper courseData={courseData} /> */}
                    </div>
            </section>
        </section>
    );
}
