"use client";

import { useCourseLearningSidebarToggler } from "@/store/Zustand/SidebarStore/sidebarstore";

export default function CourseLearningSidebarWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const isOpen = useCourseLearningSidebarToggler(
        (state) => state.isOpen
    );

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