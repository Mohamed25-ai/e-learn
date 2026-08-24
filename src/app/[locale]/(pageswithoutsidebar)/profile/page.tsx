import React from 'react'
import Profile from '../../_Components/Profile/Profile'
import { getServerSession } from 'next-auth'
import { nextAuthConfig } from '@/next-auth/nextauth.config';
import { getProfileUserData } from '@/services/application-user/application.user.service';
import { getEnrolledCoursesAction } from '@/actions/application-user/application-user.actions';
import { MyLearningProps } from '../../(main)/(My-Learning)/my-learning/my.learning.types';

export default async function page({searchParams}:MyLearningProps) {
  const {pageNumber}=await searchParams||1;
  const usersession = await getServerSession(nextAuthConfig);
  const userProfileData = await getProfileUserData(usersession?.id!);
  const enrolledCourses = await getEnrolledCoursesAction(pageNumber,3);

  return (
    <>
      <Profile data={userProfileData?.data} enrolledCoursesWithMetaData={enrolledCourses?.data} />
    </>
  )
}
