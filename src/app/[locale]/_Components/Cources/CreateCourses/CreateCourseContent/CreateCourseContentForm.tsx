'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateCourseContentFormPropsType } from "./createcoursecontent.types";
import CourseContentForm from "./CourseContentForm";
import { useAppSelector } from "@/hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default function CreateCourseContentForm({ contentData }: CreateCourseContentFormPropsType) {
    const createCourseSote = useAppSelector((state) => state.createCourse);
    const [contentCards, setcontentCards] = useState<number[]>(createCourseSote.createdContentuccessifuly);
    const createdContentSorted=[...contentCards].sort((a, b) => a - b)
    const [editCurrentCard, seteditCurrentCard] = useState(Array(createCourseSote.createdContentuccessifuly.length).fill(false))
    const [addedContent, setaddedContent] = useState<boolean[]>(() => {
        const arr: boolean[] = [];
        contentCards.forEach((num) => {
            arr[num] = true;
        });
        return arr;
    });
    function getCardsDifference() {
        const createdContentSorted=[...contentCards].sort((a, b) => a - b)
        const copy=[...createdContentSorted]
        createdContentSorted.forEach((val,idx)=>{
            const next=createdContentSorted[idx+1]
            if(next!== undefined){
                for (let i = val+1; i <next; i++) {
                    copy.push(i)
                }
            }
            
        })
        return copy.sort((a, b) => a - b)
    }
    function handleAddNewContent() {
        const currentCards=getCardsDifference()
        const maxVal=Math.max(...currentCards)||1
        const max = currentCards.length ? Math.max(...currentCards) : 0;
        setcontentCards(()=>[...currentCards,max+1]);
    }
    function handleSetEditCard(cardNumber:number,value:boolean){
        seteditCurrentCard((prev)=>{
            const copy=[...prev]
            copy[cardNumber]=value
            return copy;
        })
    }
    function handleAddedSuccessContent(num:number,value:boolean) {
        setaddedContent((prev) => {
            const copy=[...prev]
            prev[num]=true
            return copy
        });
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
                className="w-full flex justify-center py-5 bg-white border-dashed border-2 border-(--primary-color) cursor-pointer text-(--primary-color) hover:bg-(--primary-light)"
            >
                <FontAwesomeIcon icon={faPlus} />
            Add New Lesson
            </Button>}
        </div>
    )
}
