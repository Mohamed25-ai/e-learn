'use client'
import { useEffect, useState } from "react";
import CreateCourseContentForm from "./CreateCourseContentForm";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useGetCreatedSectionsByCourseIdQuery } from "@/store/redux/api/createCourseApi";

export default function CreateCourseContent() {
    const courseStore=useAppSelector((state)=>state.createCourse)
    const {data:createdSections}=useGetCreatedSectionsByCourseIdQuery(courseStore.createdCourseId,{
        skip:!courseStore.createdCourseId
    });
    return (
        <section className='px-5 md:px-0 w-full mx-auto lg:w-3/4 space-y-5'>
            <header>
                <h2 className="text-foreground font-bold">Course Content</h2>
                <p className="text-(--text-secondry)">Add lessons and learning materials to your sections</p>
            </header>
            <CreateCourseContentForm  contentData={createdSections?.data} />
        </section>
    )
}
