"use client"

import { useAppSelector } from "@/hooks/hooks"
import { RootState } from "@/store/redux/reduxstore";
import { useCourseLearningSidebarToggler } from "@/store/Zustand/SidebarStore/sidebarstore";
import { useLocale } from "next-intl";
import Image from "next/image";

const VIDEO_EXTENSIONS = ["mp4", "mov", "avi"]
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "gif", "webp"]
const PDF_EXTENSIONS = ["pdf"]

export default function CourseLearningVideoScreen() {
    const lessonId = useAppSelector((state) => state.courseLearning.lessionId);
    const isTogglerOpen = useCourseLearningSidebarToggler((state) => state.isOpen)
    const lessonUrl = useAppSelector(
        (state) => state.courseLearning.selectedLessionUrl[lessonId]
    );
    const locale = useLocale();
    const currentLessionExtension = lessonUrl?.split('.').pop()?.toLowerCase();
    const videaoUrl = VIDEO_EXTENSIONS.includes(currentLessionExtension!);
    const imageUrl = IMAGE_EXTENSIONS.includes(currentLessionExtension!);
    const pdfUrl = PDF_EXTENSIONS.includes(currentLessionExtension!);

    return (
        <div dir={locale === "ar" && "rtl" || ""}>
            {videaoUrl && (
                <div
                    className={`mt-11 md:mt-14 w-full px-3 sm:px-5 py-3 bg-(--primary-light) rounded-xl ${isTogglerOpen ? "" :
                        "flex items-center justify-center transition-all duration-300"
                        }`}
                >
                    <div className="w-full max-w-4xl aspect-video mx-auto">
                        <video
                            controls
                            src={lessonUrl}
                            className="w-full h-full rounded-xl border object-cover shadow-sm"
                        />
                    </div>
                </div>
            )}

            {imageUrl && (
                <div
                    className={`mt-8 md:mt-14 w-full px-3 sm:px-5 py-3 bg-(--primary-light) rounded-xl ${isTogglerOpen ? "" : "flex items-center justify-center transition-all duration-300"
                        }`}
                >
                    <div className="relative w-full max-w-4xl aspect-video mx-auto rounded-xl overflow-hidden">
                        <Image
                            src={lessonUrl}
                            alt="Lesson image"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 900px"
                        />
                    </div>
                </div>
            )}

            {pdfUrl && (
                <div className="mt-8 md:mt-14 w-full px-3 sm:px-5 py-3 bg-(--primary-light) rounded-xl">
                    <iframe
                        src={lessonUrl}
                        className="w-full h-[70vh] max-h-187.5 min-h-100 rounded-xl border"
                    />
                </div>
            )}
        </div>
    )
}