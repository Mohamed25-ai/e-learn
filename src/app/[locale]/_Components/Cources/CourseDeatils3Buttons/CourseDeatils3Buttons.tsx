'use client'
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react'
import { CourseDetailsProps } from '../CourseDetails/coursedetails.types';


export default function CourseDeatils3Buttons({ data }: CourseDetailsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const currentPath=pathname.split("/").at(-1);
    function handleShowOverview() {
        router.push(`/coursedetails/${data.id}/overview`)
    }
    function handleShowCurriculum() {
        router.push(`/coursedetails/${data.id}/curriculum`)
    }
    function handleShowReviews() {

    }
    return (
        <div>
            <div>
                <div className='border-b'>
                    <button onClick={handleShowOverview} className={`${currentPath == "overview" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3" :
                        "font-bold p-3 text-(--text-secondary) text-lg"}  `}>Overview</button>
                    <button onClick={handleShowCurriculum} className={`${currentPath == "curriculum" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3 " :
                        "font-bold p-3 text-(--text-secondary) text-lg"}   `}>Curriculum</button>
                    <button onClick={handleShowReviews} className={`${currentPath == "reviews" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3 " :
                        "font-bold p-3 text-(--text-secondary) text-lg"}`}>Reviews</button>
                </div>
            </div>
        </div>
    )
}
