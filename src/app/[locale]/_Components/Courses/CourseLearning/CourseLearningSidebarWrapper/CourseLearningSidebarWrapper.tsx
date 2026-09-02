"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { steInitialState } from "@/store/redux/courselearninig/courselearning.slice";
import { useEffect } from "react";

export default function CourseLearningSidebarWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const {isOpen} = useAppSelector((state) => state.courseLearningSidebarSlice);
    //     const dispatch = useAppDispatch()

    // useEffect(() => {

    //     return () => {
    //         dispatch(steInitialState());
    //     }
    // }, [dispatch])
    return (
        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden 
                ${isOpen ? "max-h-250 opacity-100"
            : "max-h-0 opacity-0"}
               `
            }
        >
            {children}
        </div>
    );
}