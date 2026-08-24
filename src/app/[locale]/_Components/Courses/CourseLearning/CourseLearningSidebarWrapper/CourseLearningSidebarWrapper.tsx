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