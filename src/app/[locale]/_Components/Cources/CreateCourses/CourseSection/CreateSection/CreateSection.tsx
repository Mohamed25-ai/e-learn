import { useEffect } from "react";
import { CreateSectionProps } from "../createsection.type";
import { setCreateStep } from "@/store/redux/createcourse/createcourseslice";
import { useAppSelector } from "@/hooks/hooks";
import { useDispatch } from "react-redux";


export default function CreateSection({sectionID,setCourseId}:CreateSectionProps) {
    const createCousreStore = useAppSelector((state) => state?.createCourse);
    const currentStep=createCousreStore.step;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCreateStep(1));
    }, [])
    return (
        <div>
            <h1>{sectionID}</h1>
        </div>
    )
}
