import { Link } from '@/i18n/navigation'
import React from 'react'

export default function StartLearning() {
    return (
        <div className='bg-(--primary-color) p-5 flex flex-col items-center justify-center gap-4'>
            <h2 className='mt-5 text-white font-bold text-2xl'>
                Ready to Start Learning?
            </h2>
            <p className='text-white flex justify-center md:text-xl'>Join thousands of students and transform your career today</p>
            <Link href={"/login"} className='px-5 py-3 bg-white text-(--primary-color) rounded-2xl'>
                Get Started for Free
            </Link>
        </div>
    )
}
