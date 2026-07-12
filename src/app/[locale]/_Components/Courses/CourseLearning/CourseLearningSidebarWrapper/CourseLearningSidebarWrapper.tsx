"use client";

import { useAppSelector } from "@/hooks/hooks";

export default function CourseLearningSidebarWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const {isOpen} = useAppSelector((state) => state.courseLearningSidebarSlice);


    return (
        <div
            className={`transition-all duration-300 overflow-hidden 
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                md:${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            {children}
        </div>
    );
}