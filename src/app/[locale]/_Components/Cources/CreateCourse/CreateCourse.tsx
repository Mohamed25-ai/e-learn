'use client'
import { useState } from "react";
import CreateCourseSteps from "../CreateCourseSteps/CreateCourseSteps";
import CreateCourseBasicInformation from "../CreateCourseBasicInformation/CreateCourseBasicInformation";
import { useQuery } from "@tanstack/react-query";
import { listAllCategoriesAction } from "@/actions/categories/categories.actions";

export default function CreateCourse() {
    const [createSteps, setcreateSteps] = useState(0);
    const {data}=useQuery({
        queryKey:['catedories'],
        queryFn:listAllCategoriesAction,
    });
    function handleSetSteps(steps:number){
        setcreateSteps(steps);
    }
    return (
        <>
        <CreateCourseSteps currentStep={createSteps} />
        <CreateCourseBasicInformation setstep={handleSetSteps} data={data?.data} />
        </>
    )
}
