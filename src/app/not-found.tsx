'use client'
import "./[locale]/globals.css";
import Error from 'next/error'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()
    function goHome() {
        
    }

    return (
        <html >
            <body >
                <div className="relative flex justify-center items-center">
                    <Error statusCode={404} />

                    <button
                        onClick={()=>router.replace(`/`)}
                        className="rounded bg-(--primary-color) cursor-pointer  absolute! top-3/5 px-4 py-2 text-white"
                    >
                        Go Home
                    </button>
                </div>
            </body>
        </html>
    )
}