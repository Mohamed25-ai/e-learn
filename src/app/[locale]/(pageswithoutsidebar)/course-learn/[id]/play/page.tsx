import { getCourseContentByIdAction } from '@/actions/courses/courses.actions';
import React from 'react'
type PlayPageProps={
  searchParams:Promise<{lessonId:string}>
}
export default async function page({searchParams}:PlayPageProps) {
  const {lessonId}=await searchParams;
  // const currentLession=await getCourseContentByIdAction(lessonId);
  // console.log("lessionId",currentLession)
  return (
    <div>
      
    </div>
  )
}
