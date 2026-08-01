'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { TopCategoriesSwiperProps } from '../../home.types';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import CategorieCard from '../../../Categories/CategorieCard/CategorieCard';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopCategoriesSwiper({ categories }: TopCategoriesSwiperProps) {
    return (
        <div className="px-10! relative mt-5 pb-10!">
            <Swiper
                className='group'
                spaceBetween={24}

                modules={[Navigation, Autoplay, Pagination]}
                // pagination
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: true
                }}
                loop
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                    1280: {
                        slidesPerView: 5,
                    },
                }}
                onSwiper={(swiper) => console.log(swiper)}

            >
                {categories?.data?.map((categorie) => (
                    <SwiperSlide key={categorie.id} className="h-auto">
                        <CategorieCard fromSwiper categorie={categorie} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className=' hidden md:block'>
                <Button
                    className="swiper-button-prev absolute top-3/4 right-0  z-10 "
                >
                    <FontAwesomeIcon size='sm' icon={faChevronLeft} />

                </Button>

                {/* Next */}
                <Button
                    className=" swiper-button-next absolute top-3/4 right-0  z-10 ">
                    <FontAwesomeIcon size='sm' icon={faChevronRight} />

                </Button>
            </div>
        </div>
    )
}