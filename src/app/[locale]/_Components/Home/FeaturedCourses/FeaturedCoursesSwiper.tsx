"use client"
import { Button } from '@/components/ui/button'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FeaturedCoursesSwiperProps } from './featuredcourses.types'
import CourseCard from '../../Courses/CourseCard/CourseCard'
import CardsLoader from '../../Loaders/CardsLoader/CardsLoader'
import { getCoursesByCategorieIdAction } from '@/actions/courses/courses.actions'
import { useQueryClient } from '@tanstack/react-query'
import { ButtonLoader } from '../../Loaders/ButtonLoader/ButtonLoader'

export default function FeaturedCoursesSwiper({ isCoursesLoading, coursesDetails,
    categoryId, getNextCoursePage, courseHasNextPage, isFetchingNextCoursesPage }: FeaturedCoursesSwiperProps) {
    const previousNavigationElement = useRef<HTMLButtonElement>(null);
    const nextNavigationElement = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient()
    async function handleRefetchCourses() {
        if (courseHasNextPage && !isFetchingNextCoursesPage) {
            await getNextCoursePage();
        }
    }
    return (
        <div className="px-10 relative my-5">
            <>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    onSlideChange={(swiper) => {
                        const isLastSlide =
                            swiper.activeIndex >= swiper.slides.length - Number(swiper?.params?.slidesPerView);
                        if (isLastSlide) {
                            handleRefetchCourses()
                        }
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
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {/* {isCoursesLoading&&courses?.data?.map((course) => (
                        <SwiperSlide key={course.id} className="h-auto">
                            <CardsLoader length={courses.data.length}/>
                        </SwiperSlide>
                    ))} */}
                    {coursesDetails?.map((course) => (
                        <SwiperSlide key={course.id} className="h-auto">
                            <CourseCard course={course} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className=''>
                    {<Button
                        ref={previousNavigationElement}
                        className="custom-swiper-navigation w-12 h-12  absolute top-1/2 
                        -translate-y-1/2  left-0  z-10  cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />

                    </Button>}
                    {/* Next*/}
                    {<Button
                        ref={nextNavigationElement}
                        className=" custom-swiper-navigation w-12 h-12 absolute top-1/2 
                        -translate-y-1/2  right-0  z-10 cursor-pointer">
                        {isFetchingNextCoursesPage?<ButtonLoader />:
                        <FontAwesomeIcon icon={faChevronRight} />}
                    </Button>}
                </div>

            </>
        </div>


    )
}
