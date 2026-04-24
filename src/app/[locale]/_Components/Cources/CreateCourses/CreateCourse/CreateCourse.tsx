'use client'
import { useEffect, useState } from "react";
import CreateCourseSteps from "../CreateCourseSteps/CreateCourseSteps";
import CreateCourseBasicInformation from "../CreateCourseBasicInformation/CreateCourseBasicInformation";
import { useQuery } from "@tanstack/react-query";
import { listAllCategoriesAction } from "@/actions/categories/categories.actions";
import CreateSection from "../CourseSection/CreateSection/CreateSection";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/hooks";
import { setCreateStep } from "@/store/redux/createcourse/createcourseslice";
export default function CreateCourse() {
    const createCousreStore = useAppSelector((state) => state?.createCourse);
    const dispatch = useDispatch();
    const [sectionId, setsectionId] = useState("");
    const [courseId, setcourseId] = useState("");
    const { data } = useQuery({
        queryKey: ['catedories'],
        queryFn: listAllCategoriesAction,
    });
    function handleSectionId(id: string) {
        setsectionId(id);
    }
    function handlecourseId(id: string) {
        setcourseId(id);
    }
    
    return (
        <>
            <CreateCourseSteps currentStep={createCousreStore?.step} />
            {createCousreStore.step === 0 && <CreateCourseBasicInformation setSectionId={handleSectionId} data={data?.data} />}
            {createCousreStore.step === 1 && <CreateSection sectionID={sectionId} setCourseId={handlecourseId} />}
        </>
    )
}
