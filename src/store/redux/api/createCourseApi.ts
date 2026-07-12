import { createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SectionByCourseIdType } from "../createcourse/createcourseslice.types";

export const createCourseApi=createApi({
    reducerPath:"createCourseApi",
    tagTypes:["getCreatedSections"],
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_API_URL,
    }),
    endpoints:(builder)=>({
        getCreatedSectionsByCourseId:builder.query({
            query:(courseId:string)=>`/Section/List?CourseId=${courseId}`,
            providesTags:["getCreatedSections"]
        })
    })
})
export const { useGetCreatedSectionsByCourseIdQuery } = createCourseApi;