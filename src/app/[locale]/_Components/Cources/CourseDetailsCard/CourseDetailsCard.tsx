import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import COURSEIMAGE from '@/assets/images/Static course image.jpg'
import { CourseDetailsProps } from '../CourseDetails/coursedetails.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faVideo,
    faClock,
    faCertificate,
    faDownload,
    faHeart,
    faPlay
} from '@fortawesome/free-solid-svg-icons'

export default function CourseDetailsCard({ data }: CourseDetailsProps) {
    const price = data?.price ?? 0;
    const discountPercentage = data?.discountPercentage ?? 0;
    const hasDiscount = discountPercentage > 0;
    const discountedPrice = hasDiscount
        ? price - (price * discountPercentage) / 100
        : price;

    const features = [
        // { icon: faVideo,       label: data?.lecturesCount ? `${data.lecturesCount} lectures`      : null },
        // { icon: faClock,       label: data?.duration      ? `${data.duration} hours total`        : null },
        { icon: faCertificate, label: 'Certificate of completion' },
        { icon: faDownload, label: 'Downloadable resources' },
    ]

    return (
        <div className='px-5 '>
            <Card className="overflow-hidden border border-border shadow-md rounded-2xl p-0">
                {/* Thumbnail */}
                <CardHeader className="p-0">
                    <div className="relative w-full aspect-video overflow-hidden group">
                        <Image
                            fill
                            src={data?.thumbnail || COURSEIMAGE}
                            alt={data?.title || 'Course thumbnail'}
                            className="object-cover"
                        />
                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center
                                    bg-black/30 opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300">
                            <div className="w-14 h-14 rounded-full border-2 border-white
                                        flex items-center justify-center
                                        bg-white/20 backdrop-blur-sm">
                                <FontAwesomeIcon icon={faPlay} className="text-white text-xl ml-1" />
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-5 flex flex-col gap-5">

                    {/* Price */}
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-extrabold text-(--primary-color)">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {hasDiscount?<>
                                <span className="text-lg text-(--text-muted) line-through">
                                    ${price.toFixed(2)}
                                </span>
                                <span className="text-sm font-semibold text-(--success) bg-(--primary-light) px-2 py-0.5 rounded-full">
                                    {discountPercentage}% off
                                </span>
                            </>
                            :<>  <span className="text-lg text-(--text-muted) line-through">
                                    ${0}
                                </span>
                                <span className="text-sm font-semibold text-(--success) bg-(--primary-light) px-2 py-0.5 rounded-full">
                                    {discountPercentage}% off
                                </span>
                            </>}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <button className="BUTTON_STYLE w-full justify-center text-base">
                            Enroll Now
                        </button>
                        <button className="MAIN_BUTTON w-full justify-center py-3 text-base">
                            <FontAwesomeIcon icon={faHeart} />
                            Add to Wishlist
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