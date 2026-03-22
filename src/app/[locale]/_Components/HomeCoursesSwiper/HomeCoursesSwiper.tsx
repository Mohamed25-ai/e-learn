'use client'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import { MainSwiperType } from './mainswiper.type';
import CourseCard from '../Cources/CourseCard/CourseCard';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function HomeCoursesSwiper({ courseData }: MainSwiperType) {
    return (
        <>
            <Swiper
                className='group'
                spaceBetween={35}
                modules={[Navigation, Autoplay, EffectCoverflow]}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: true
                }}
                loop
                effect="coverflow"
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 5 },
                }}
            >
                {courseData?.map((course, index) => (
                    <SwiperSlide key={course.id} >
                        <CourseCard course={course} />
                    </SwiperSlide>
                ))}



                {/* Prev */}
                <Button
                    className=" swiper-button-prev  absolute left-2 top-1/2! z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border bg-card! text-foreground! border-border! shadow-md transition-all duration-200 hover:bg-(--primary-color)! hover:text-white! hover:border-(--primary-color)! group-hover:opacity-100 opacity-0"
                    >
                    <ChevronLeft size={18} />
                </Button>

                {/* Next */}
                <Button
                    className=" swiper-button-next  absolute right-2 top-1/2! z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border bg-card! text-foreground! border-border! shadow-md transition-all duration-200 hover:bg-(--primary-color)! hover:text-white! hover:border-(--primary-color)! group-hover:opacity-100 opacity-0 "
                    >
                    <ChevronRight size={18} />
                </Button>


            </Swiper >
        </>
    );
};

