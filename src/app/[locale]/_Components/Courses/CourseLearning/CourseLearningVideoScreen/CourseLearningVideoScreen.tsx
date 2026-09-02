"use client"
import { changeProgressStatusByContentIdAction } from "@/actions/courses/courses.actions";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { useRouter } from "@/i18n/navigation";
import { steInitialState } from "@/store/redux/courselearninig/courselearning.slice";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const VIDEO_EXTENSIONS = ["mp4", "mov", "avi"]
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "gif", "webp", "png"]
const PDF_EXTENSIONS = ["pdf"]

export default function CourseLearningVideoScreen() {
    const router = useRouter();
    const params = useSearchParams();
    const lessonId = useAppSelector((state) => state.courseLearning.lessionId);
    const { isOpen } = useAppSelector((state) => state.courseLearningSidebarSlice);
    const lessonUrl = useAppSelector(
        (state) => state.courseLearning.selectedLessionUrl[lessonId]
    );
    const locale = useLocale();
    const dispatch = useAppDispatch();
    const currentLessionExtension = lessonUrl?.split('.').pop()?.toLowerCase();
    const videaoUrl = VIDEO_EXTENSIONS?.includes(currentLessionExtension!);
    const imageUrl = IMAGE_EXTENSIONS?.includes(currentLessionExtension!);
    const pdfUrl = PDF_EXTENSIONS?.includes(currentLessionExtension!);
    async function handleUpdateProgress(status: boolean) {
        const res = await changeProgressStatusByContentIdAction(lessonId, status);
        if (res.status == 200) {
            router.refresh();
            return
        }
    }
useEffect(() => {
    return () => {
        
        dispatch(steInitialState());
    };
}, [dispatch]);
    return (
        <div className="" dir={locale === "ar" && "rtl" || ""}>
            {videaoUrl && (
                <div
                    className={`mt-11 md:mt-14 w-full px-3 sm:px-5 py-3 bg-(--primary-light)
                        rounded-xl ${isOpen ? "" :
                            "flex items-center justify-center transition-all duration-300"
                        }`}
                >
                    <div className="w-full max-w-4xl aspect-video mx-auto">
                        <video
                            onEnded={() => handleUpdateProgress(true)}
                            controls
                            src={lessonUrl}
                            className="w-full h-full rounded-xl border object-cover shadow-sm"
                        />
                    </div>
                </div>
            )}

            {imageUrl && (
                <div
                    className={`mt-15 md:mt-14 w-full px-3 sm:px-5 py-3 bg-(--primary-light) rounded-xl ${isOpen ? "" :
                        "flex items-center justify-center transition-all duration-300"
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
                <div className="mt-15 md:mt-14 w-full px-3 sm:px-5 py-3 bg-(--primary-light) rounded-xl">
                    <iframe
                        src={lessonUrl}
                        className="w-full h-[70vh] max-h-187.5 min-h-100 rounded-xl border"
                    />
                </div>
            )}
        </div>
    )
}