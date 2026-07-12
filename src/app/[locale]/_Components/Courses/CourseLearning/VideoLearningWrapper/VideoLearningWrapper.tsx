"use client";

import { useAppSelector } from "@/hooks/hooks";
export default function VideoLearningWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const {isOpen} =useAppSelector((state) => state.courseLearningSidebarSlice);


    return (
        <div
            className={`transition-all duration-300 ${isOpen ? "md:w-3/4 w-full" : "w-full"
                }`}
        >
            {children}
        </div>
    );
}