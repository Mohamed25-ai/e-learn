'use client'
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react'
import { CourseDetailsProps } from '../CourseDetails/coursedetails.types';


export default function CourseDeatils3Buttons({ data, inPlayPage }: CourseDetailsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const currentPath = pathname.split("/").at(-1);
    function handleShowOverview() {
        router.push(`/coursedetails/${data.id}/overview`)
    }
    function handleDetailsButtons(inPlayPaths?: string) {
        if (inPlayPage) {
            {/* Reusable in play page and course Details page */ }
            if (inPlayPaths == "notes" && currentPath != "notes") {
                router.push(`/courselearn/${data.id}/notes`)
                return
            }
            if (inPlayPaths == "play" && currentPath != "play") {
                router.push(`/courselearn/${data.id}/play`)
                return
            }
            return
        }
        if (inPlayPaths == "overview" && currentPath != "overview") {
            router.push(`/coursedetails/${data.id}/overview`)
            return
        }
        if (inPlayPaths == "curriculum" && currentPath != "curriculum") {
            router.push(`/coursedetails/${data.id}/curriculum`)
            return
        }
        // router.push(`/coursedetails/${data.id}/curriculum`)
    }

    return (
        <div>
            <div>
                <div className='border-b'>
                    {!inPlayPage && <button onClick={() => handleDetailsButtons("overview")} className={`${currentPath == "overview" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3" :
                        "font-bold p-3 text-(--text-secondary) text-lg"}  `}>Overview</button>}
                    {!inPlayPage && <button onClick={() => handleDetailsButtons("curriculum")} className={`${currentPath == "curriculum" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3 " :
                        "font-bold p-3 text-(--text-secondary) text-lg"}   `}>Curriculum</button>}
                    {/* Reusable in play page and course Details page */}
                    {inPlayPage && <button onClick={() => handleDetailsButtons("play")} className={`${currentPath == "play" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3 " :
                        "font-bold p-3 text-(--text-secondary) text-lg"}   `}>Overview</button>}
                    {inPlayPage && <button onClick={() => handleDetailsButtons("notes")} className={`${currentPath == "notes" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3 " :
                        "font-bold p-3 text-(--text-secondary) text-lg"}   `}>Notes</button>}
                    <button onClick={() => handleDetailsButtons("reviews")} className={`${currentPath == "reviews" ? "font-bold border-b-2 border-(--primary-color) text-lg text-(--primary-color) p-3 " :
                        "font-bold p-3 text-(--text-secondary) text-lg"}`}>Reviews</button>
                </div>
            </div>
        </div>
    )
}
