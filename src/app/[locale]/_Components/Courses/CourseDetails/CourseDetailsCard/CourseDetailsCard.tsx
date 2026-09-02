import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import COURSEIMAGE from '@/assets/images/Static course image.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CourseDetailsProps } from '../coursedetails.types'
import {
    faVideo,
    faClock,
    faCertificate,
    faDownload,
    faHeart,
    faPlay
} from '@fortawesome/free-solid-svg-icons'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function CourseDetailsCard({ data,isUserEnrolledCourse }: CourseDetailsProps) {
    const t = await getTranslations();
    const price = data?.price ?? 0;
    const discountPercentage = data?.discountPercentage ?? 0;
    const hasDiscount = discountPercentage > 0;
    const discountedPrice = hasDiscount
        ? price - (price * discountPercentage) / 100
        : price;

    const features = [
        // { icon: faVideo,       label: data?.lecturesCount ? `${data.lecturesCount} lectures`      : null },
        // { icon: faClock,       label: data?.duration      ? `${data.duration} hours total`        : null },
        { icon: faCertificate, label: t('CourseDetails.certificateOfCompletion') },
        { icon: faDownload, label: t('CourseDetails.downloadableResources') },
    ]

    return (
        <div className=' p-5  md:px-5 '>
            <Card className="overflow-hidden border border-border shadow-md rounded-2xl p-0">
                {/* Thumbnail */}
                <CardHeader className="p-0">
                    <div className="relative w-full aspect-video overflow-hidden group">
                        <Image
                            fill
                            src={data?.thumbnailUrl || COURSEIMAGE}
                            alt={data?.title || 'Course thumbnail'}
                            className="object-cover"
                        />
                        {/* Play overlay */}
                        {!isUserEnrolledCourse&&<div className="absolute inset-0 flex items-center justify-center
                                    bg-black/30 opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300">
                            <div className="w-14 h-14 rounded-full border-2 border-white
                                        flex items-center justify-center
                                        bg-white/20 backdrop-blur-sm">
                                <FontAwesomeIcon icon={faPlay} className="text-white text-xl ml-1" />
                            </div>
                        </div>}
                        {isUserEnrolledCourse&&<Link
                        href={`/course-learn/${data.id}/play`} 
                        className="absolute inset-0 flex items-center justify-center
                                    bg-black/30 opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300">
                            <div className="w-14 h-14 rounded-full border-2 border-white
                                        flex items-center justify-center
                                        bg-white/20 backdrop-blur-sm">
                                <FontAwesomeIcon icon={faPlay} className="text-white text-xl ml-1" />
                            </div>
                        </Link>}
                    </div>
                </CardHeader>

                <CardContent className="p-5 flex flex-col gap-5">
                    {/* Price */}
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-extrabold text-(--primary-color)">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {hasDiscount ? <>
                            <span className="text-lg text-(--text-muted) line-through">
                                ${price.toFixed(2)}
                            </span>
                            <span className="text-sm font-semibold text-(--success) bg-(--primary-light) px-2 py-0.5 rounded-full">
                                {t('CourseDetails.discountOff', { percent: discountPercentage })}
                            </span>
                        </>
                            : <>  <span className="text-lg text-(--text-muted) line-through">
                                ${0}
                            </span>
                                <span className="text-sm font-semibold text-(--success) bg-(--primary-light) px-2 py-0.5 rounded-full">
                                    {t('CourseDetails.discountOff', { percent: discountPercentage })}
                                </span>
                            </>}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        {isUserEnrolledCourse&&<button className="BUTTON_STYLE w-full justify-center text-base">
                            {t('CourseDetails.startLearning')}
                        </button>}
                        {!isUserEnrolledCourse&&<button className="BUTTON_STYLE w-full justify-center text-base">
                            {t('CourseDetails.enrollNow')}
                        </button>}
                        <button className="MAIN_BUTTON w-full justify-center py-3 text-base">
                            <FontAwesomeIcon icon={faHeart} />
                            {t('CourseDetails.addToWishlist')}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Features */}
                    <ul className="flex flex-col gap-3">
                        {features.map(({ icon, label }) =>
                            label ? (
                                <li key={label} className="flex items-center gap-3 text-sm text-(--text-secondary)]">
                                    <FontAwesomeIcon
                                        icon={icon}
                                        className="text-(--primary-color) w-4 shrink-0"
                                    />
                                    {label}
                                </li>
                            ) : null
                        )}
                    </ul>

                </CardContent>

            </Card>
        </div>
    )
}