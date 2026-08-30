'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateCourseContentFormPropsType } from "./createcoursecontent.types";
import CourseContentForm from "./CourseContentForm";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { resetCreateCourseState } from "@/store/redux/createcourse/createcourseslice";
import { useRouter } from "@/i18n/navigation";


export default function CreateCourseContentForm({ contentData }: CreateCourseContentFormPropsType) {
    const createCourseSote = useAppSelector((state) => state.createCourse);
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [contentCards, setcontentCards] = useState<number[]>(createCourseSote.createdContentuccessifuly);
    const maxNumInStore = contentCards.length ? Math.max(...contentCards) : 0;
    const createdContentSorted = [...contentCards].sort((a, b) => a - b);
    const [addedContent, setaddedContent] = useState<Record<number, boolean>>(() => {
        const map: Record<number, boolean> = {};
        contentCards.forEach((num) => {
            map[num] = true;
        });
        return map;
    });
    const [editCurrentCard, seteditCurrentCard] = useState<Record<number, boolean>>({});
    function getCardsDifference() {
        const max = createdContentSorted.length ? Math.max(...contentCards) : 0;
        return Array.from(
            { length: max + 1 },
            (_, index) => index + 1
        );
    }
    function handleEndCreateCourse() {
        dispatch(resetCreateCourseState())
        router.replace('/courses');
    }
    function handleSetEditCard(cardNumber: number, value: boolean) {
        seteditCurrentCard((prev) => ({
            ...prev,
            [cardNumber]: value,
        }));
    }
    function handleAddedSuccessContent(num: number, value: boolean) {
        setaddedContent((prev) => ({
            ...prev,
            [num]: value,
        }));
    }
    function handleAddNewContent() {
        const currentCards = getCardsDifference()
        setcontentCards(() => [...currentCards]);
        // handleAddedSuccessContent(maxNumInStore + 1, false)
        // handleSetEditCard(maxNumInStore + 1, false)
    }
    function handleRemoveContentCard(idx: number) {
        setcontentCards((prev) =>
            prev.filter((_, currentIdx) => currentIdx !== idx)
        );
    }
    return (
        <div className="space-y-5">
            {createdContentSorted.map((val, idx) => (
                <CourseContentForm cardIndex={idx}
                    removeCard={handleRemoveContentCard}
                    secionsData={contentData}
                    fromOrder={val}
                    key={val}
                    editCurrentCard={editCurrentCard}
                    handleSetEditCard={handleSetEditCard}
                    addedContent={addedContent}
                    handleAddedSuccessContent={handleAddedSuccessContent}
                />
            ))}
            {<Button
                onClick={handleAddNewContent}
                className="w-full flex justify-center py-5 bg-white border-dashed border-2 border-(--primary-color) cursor-pointer 
                text-(--primary-color) hover:bg-(--primary-light)"
            >
                <FontAwesomeIcon icon={faPlus} />
                Add New Lesson
            </Button>}
            {createCourseSote.createdContentuccessifuly.length > 0 && <Button
                onClick={handleEndCreateCourse}
                className="w-full flex justify-center py-5 bg-white border-dashed border-2 border-(--primary-color) 
                cursor-pointer text-(--primary-color) hover:bg-(--primary-light)"
            >
                End Task
            </Button>}
        </div>
    )
}
