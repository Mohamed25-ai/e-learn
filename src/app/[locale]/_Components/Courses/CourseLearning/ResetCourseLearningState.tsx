"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { steInitialState } from "@/store/redux/courselearninig/courselearning.slice";

export default function ResetCourseLearningState() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(steInitialState());
        };
    }, [dispatch]);

    return null;
}