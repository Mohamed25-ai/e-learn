"use client"
import { Button } from '@/components/ui/button'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FeaturedCoursesSwiperProps } from './featuredcourses.types'
import CourseCard from '../../Courses/CourseCard/CourseCard'

export default function FeaturedCoursesSwiper({ courses }: FeaturedCoursesSwiperProps) {
    return (
        <div className="px-10 relative my-5">
            <>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    loop
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    // onBeforeInit={(swiper: SwiperType) => {
                    //     if (typeof swiper.params.navigation !== "boolean") {
                    //         swiper.params.navigation = {
                    //             ...swiper.params.navigation,
                    //             prevEl: prevRef.current,
                    //             nextEl: nextRef.current,
                    //         };
                    //     }
                    // }}
                    // onSwiper={(swiper) => {
                    //     setTimeout(() => {
                    //         swiper.navigation.init();
                    //         swiper.navigation.update();
                    //     });
                    // }}
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
                    {courses?.data?.map((course) => (
                        <SwiperSlide key={course.id} className="h-auto">
                            <CourseCard course={course} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className=''>
                    {/* {<Button
                        className="swiper-button-prev absolute top-3/4 right-0  z-10 "
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>}
                    {/* Next */}
                    {/* <Button
                        className=" swiper-button-next absolute top-3/4 right-0  z-10 ">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>  */}
                </div>

            </>
        </div>


    )
}
