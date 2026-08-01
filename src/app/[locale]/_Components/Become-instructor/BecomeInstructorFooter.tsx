import Link from 'next/link'

export default function BecomeInstructorFooter() {
    return (
        <section className="bg-(--primary-color) px-5 py-20
                            flex flex-col items-center justify-center text-center gap-6">

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to Start Teaching?
            </h2>

            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-lg">
                Join thousands of instructors who have already changed lives — and built
                theirs — on EduPro.
            </p>

            <Link
                href="/become-instructor/apply"
                className="mt-2 bg-white text-(--primary-color) font-bold
                            text-sm md:text-base px-10 py-4 rounded-2xl
                            hover:bg-(--primary-light)
                            transition-all duration-200
                            hover:-translate-y-0.5
                            hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)"
            >
                Apply to Become an Instructor
            </Link>

        </section>
    )
}