import React from 'react'
import Profile from '../../_Components/Profile/Profile'
import { getServerSession } from 'next-auth'
import { nextAuthConfig } from '@/next-auth/nextauth.config';
import { getProfileUserData } from '@/services/application-user/application.user.service';

export default async function page() {
  const usersession=await getServerSession(nextAuthConfig);
  const userProfileData=await getProfileUserData(usersession?.id!);
  console.log("userProfileData",userProfileData)
  return (
    <>
      <Profile data={userProfileData?.data} />
    </>
  )
}
