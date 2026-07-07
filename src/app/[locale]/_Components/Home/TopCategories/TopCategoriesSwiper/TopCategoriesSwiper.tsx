'use client';

import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { TopCategoriesSwiperProps } from '../../home.types';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import CategorieCard from '../../../Categories/CategorieCard/CategorieCard';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopCategoriesSwiper({ categories }: TopCategoriesSwiperProps) {
    // const swiper=useSwiperSlide()
    return (
        <div className="px-10 relative">
            <Swiper
                className='group '
                spaceBetween={35}
                modules={[Navigation, Autoplay,Pagination]}
                // pagination
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                autoplay={{
                    delay: 1000,
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
                    0: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                }}
                onSwiper={(swiper)=>console.log(swiper)}
            >
                {categories.data.map((categorie) => (
                    <SwiperSlide key={categorie.id} className="h-auto">
                        <CategorieCard fromSwiper categorie={categorie} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className=''>
                <Button
                    className="swiper-button-prev absolute top-3/4 right-0  z-10 "
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    
                </Button>

                {/* Next */}
                <Button
                    className=" swiper-button-next absolute top-3/4 right-0  z-10 ">
                    <FontAwesomeIcon icon={faChevronRight} />
                    
                </Button>
            </div>
        </div>
    )
}