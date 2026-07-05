"use client";

import { useCourseLearningSidebarToggler } from "@/store/Zustand/SidebarStore/sidebarstore";

export default function VideoLearningWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const isOpen = useCourseLearningSidebarToggler(
        (state) => state.isOpen
    );

    return (
        <div
            className={`transition-all duration-300 ${isOpen ? "md:w-3/4 w-full" : "w-full"
                }`}
        >
            {children}
        </div>
    );
}