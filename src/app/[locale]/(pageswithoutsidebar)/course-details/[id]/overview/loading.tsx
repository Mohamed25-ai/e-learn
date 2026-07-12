import FormLoader from '@/app/[locale]/_Components/Loaders/FormLoader/FormLoader'
import { InlineLoader } from '@/app/[locale]/_Components/Loaders/InlineLoader/InlineLoader'
import MainLoader from '@/app/[locale]/_Components/Loaders/MainLoader/MainLoader'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (
        // <div className='flex items-center justify-center'>
        //     <Loader2 size={50} className='text-(--primary-color)' />
        // </div>
        <>
        <FormLoader/>
        </>
    )
}
