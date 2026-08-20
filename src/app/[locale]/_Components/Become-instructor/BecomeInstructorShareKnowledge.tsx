'use client'
import { applyToBecomeInstructorAction } from '@/actions/application-user/application-user.actions';
import { faBahai } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import toast from 'react-hot-toast';

const stats = [
    { value: '1.2M+', label: 'Active Students' },
    { value: '70%', label: 'Revenue Share' },
    { value: '190+', label: 'Countries Reached' },
]

export default function BecomeInstructorShareKnowledge() {
    const userSession=useSession();
    async function handleBecomeInstructor() {
        const res = await applyToBecomeInstructorAction();
        if (res.status == 200) {
            toast.success("Welcome, You are now an instructor");
            // await userSession.update();
        } else {
            toast.error(res.data?.error?.description);
        }
    }
    return (
        <section className="bg-foreground px-5 py-16
                            flex flex-col items-center justify-center gap-10 text-center">

            {/* Badge */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <FontAwesomeIcon icon={faBahai} className="text-(--primary-color)" />
                <p className="text-sm text-white/70">
                    Join 340+ instructors already earning on EduPro
                </p>
            </div>

            {/* Heading */}
            <header className="flex flex-col items-center gap-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    Share Your Knowledge,<br />
                    <span className="text-(--primary-color)">Build Your Income</span>
                </h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                    Turn your expertise into a thriving online course. EduPro gives
                    you the tools, audience, and support to teach what you love — on your schedule.
                </p>
            </header>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 my-5">
                <button onClick={handleBecomeInstructor} className="BUTTON_STYLE">
                    Start Your Application
                </button>
                <button className="flex items-center gap-2 text-sm font-medium
                                    text-white/80 hover:text-white
                                    transition-colors duration-200 underline underline-offset-4">
                    How it Works
                </button>
            </div>

            {/* Divider */}
            <div className="w-full max-w-xl border-t border-white/10" />

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center  gap-8 md:gap-16">
                {stats.map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                        <span className="text-3xl md:text-4xl font-extrabold text-(--primary-color)">
                            {value}
                        </span>
                        <span className="text-xs md:text-sm text-white/60">
                            {label}
                        </span>
                    </div>
                ))}
            </div>

        </section>
    )
}
