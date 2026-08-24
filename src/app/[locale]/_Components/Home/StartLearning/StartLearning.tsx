import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function StartLearning() {
    const t = await getTranslations();
    return (
        <div className='bg-(--primary-color) p-5 flex flex-col items-center justify-center gap-4'>
            <h2 className='mt-5 text-white font-bold text-2xl'>
                {t('StartLearning.title')}
            </h2>
            <p className='text-white flex justify-center md:text-xl'>{t('StartLearning.subtitle')}</p>
            <Link href={"/login"} className='px-5 py-3 bg-white text-(--primary-color) rounded-2xl'>
                {t('StartLearning.cta')}
            </Link>
        </div>
    )
}