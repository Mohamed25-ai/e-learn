"use client"
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UpdateCourseProgressProps } from "../course.learning.types"
import { useState } from "react"
import { changeProgressStatusByContentIdAction } from "@/actions/courses/courses.actions"
import { useRouter } from "@/i18n/navigation"
import { ButtonLoader } from "../../../Loaders/ButtonLoader/ButtonLoader"



export default function UpdateCourseProgress({ contentId, isContentCompleted }: UpdateCourseProgressProps) {
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()
    async function handleUpdateProgress(status: boolean) {
        setisLoading(true)
        if (isContentCompleted) {
            const res = await changeProgressStatusByContentIdAction(contentId, status);
            if (res.status == 200) {
                setisLoading(false);
                router.refresh()
                return
            }
            console.log("Update progress res", res)
            setisLoading(false);
        }
        const res = await changeProgressStatusByContentIdAction(contentId, status);
        if (res.status == 200) {
            setisLoading(false);
            router.refresh();
            return
        }
        console.log("Update progress res", res)

    }
    return (
        <div className="w-5 h-5 flex items-center justify-center">
    {isLoading ? (
        <ButtonLoader />
    ) : (
        <FontAwesomeIcon
            onClick={() => handleUpdateProgress(!isContentCompleted)}
            icon={isContentCompleted ? faSquareCheck : faSquare}
            className={`w-4 h-4 cursor-pointer transition-all ${
                isContentCompleted
                    ? "text-(--primary-light) group-hover/item:text-(--primary-color)"
                    : "text-transparent! border border-(--primary-light) group-hover/item:border-(--primary-color)"
            }`}
        />
    )}
</div>
    )
}
