// import ConfirmEmail from '@/app/_Components/Auth/ConfirmEmail/ConfirmEmail'
import { getServerSession } from 'next-auth';
import { nextAuthConfig } from '@/next-auth/nextauth.config';
import { ConfirmEmailProps } from '../confirmemail.types'
import ConfirmEmail from '@/app/[locale]/_Components/Auth/ConfirmEmail/ConfirmEmail';


export default async function page({params}: ConfirmEmailProps) {
    // const userSession=await getServerSession();
    // console.log('userSessionnnn',userSession)
    const { email } = await params;
    return (
        <div className=' py-10  flex items-center justify-center '>
            <ConfirmEmail email={email} />
        </div>
    )
}
