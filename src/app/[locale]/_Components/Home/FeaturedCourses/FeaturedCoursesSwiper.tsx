"use client"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FeaturedCoursesSwiperProps } from './featuredcourses.types'
import CourseCard from '../../Courses/CourseCard/CourseCard'
import CardsLoader from '../../Loaders/CardsLoader/CardsLoader'
import { ButtonLoader } from '../../Loaders/ButtonLoader/ButtonLoader'

export default function FeaturedCoursesSwiper({
    isCoursesLoading,
    coursesDetails,
    categoryId,
    getNextCoursePage,
    courseHasNextPage,
    isFetchingNextCoursesPage
}: FeaturedCoursesSwiperProps) {

    const previousNavigationElement = useRef<HTMLButtonElement>(null);
    const nextNavigationElement = useRef<HTMLButtonElement>(null);

    async function handleRefetchCourses() {
        if (courseHasNextPage && !isFetchingNextCoursesPage) {
            await getNextCoursePage();
        }
    }

    return (
        <div className="relative my-5 px-8">

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                onSlideChange={(swiper) => {
                    const isLastSlide =
                        swiper.activeIndex >= swiper.slides.length - Number(swiper?.params?.slidesPerView);
                    if (isLastSlide) handleRefetchCourses();
                }}
                onSwiper={(swiper) => {
                    setTimeout(() => {
                        if (
                            swiper.params.navigation &&
                            typeof swiper.params.navigation !== "boolean"
                        ) {
                            swiper.params.navigation.prevEl = previousNavigationElement.current;
                            swiper.params.navigation.nextEl = nextNavigationElement.current;
                            swiper.navigation.destroy();
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    });
                }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {coursesDetails?.map((course) => (
                    <SwiperSlide key={course.id} className="h-auto">
                        <CourseCard course={course} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Prev */}
            <button
                ref={previousNavigationElement}
                className="absolute top-1/2 -translate-y-1/2 left-0 z-10
                            w-10 h-10 md:w-12 md:h-12 rounded-full
                            flex items-center justify-center
                            bg-white border-2 border-border
                            text-foreground
                            hover:bg-(--primary-light)
                            hover:border-(--primary-color)
                            hover:text-(--primary-color)
                            transition-all duration-200
                            disabled:opacity-30 disabled:cursor-not-allowed
                            cursor-pointer"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {/* Next */}
            <button
                ref={nextNavigationElement}
                className="absolute top-1/2 -translate-y-1/2 right-0 z-10
                            w-10 h-10 md:w-12 md:h-12 rounded-full
                            flex items-center justify-center
                           bg-white border-2 border-border
                            text-foreground
                            hover:bg-(--primary-light)
                            hover:border-(--primary-color)
                            hover:text-(--primary-color)
                            transition-all duration-200
                            disabled:opacity-30 disabled:cursor-not-allowed
                            cursor-pointer"
            >
                {isFetchingNextCoursesPage
                    ? <ButtonLoader />
                    : <FontAwesomeIcon icon={faChevronRight} />
                }
            </button>

        </div>
    )
}