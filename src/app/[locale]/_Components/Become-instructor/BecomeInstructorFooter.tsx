"use client"
import { applyToBecomeInstructorAction } from '@/actions/application-user/application-user.actions';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';



export default function BecomeInstructorFooter() {
    const t = useTranslations();
    const userSession = useSession();


    async function handleBecomeInstructor() {
        const res = await applyToBecomeInstructorAction();
        if (res.status == 200) {
            toast.success(t('BecomeInstructor.shareKnowledge.applySuccess'));
            await userSession.update();
        } else {
            toast.error(res.data?.error?.description);
        }
    }
    return (
        <section className="bg-(--primary-color) px-5 py-20
                            flex flex-col items-center justify-center text-center gap-6">

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {t('BecomeInstructor.footer.title')}
            </h2>

            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-lg">
                {t('BecomeInstructor.footer.description')}
            </p>

            <button
                onClick={handleBecomeInstructor}
                className="mt-2 bg-white text-(--primary-color) font-bold
                            text-sm md:text-base px-10 py-4 rounded-2xl
                            hover:bg-(--primary-light)
                            transition-all duration-200
                            hover:-translate-y-0.5
                            hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)"
            >
                {t('BecomeInstructor.footer.applyButton')}
            </button>

        </section>
    )
}