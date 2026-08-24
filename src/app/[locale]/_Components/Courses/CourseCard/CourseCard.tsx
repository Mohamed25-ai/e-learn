'use client'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { CourseCardProps } from "./courcecard.typs"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faCartShopping, faSignal, faChalkboardUser } from "@fortawesome/free-solid-svg-icons"
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons"
import COURSEIMAGE from '@/assets/images/Static course image.jpg'
import PROFILEIMAGE from '@/assets/images/blank-profile-picture-973460_960_720.png'
import { Link } from "@/i18n/navigation"
import AddToCartBtn from "../../Cart/AddToCartBtn"
import { useSession } from "next-auth/react"
import { useTranslations, useLocale } from "next-intl"
// import { Link } from "@/i18n/navigation"
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5 text-(--warning)">
            {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon={
                        rating >= star
                            ? faStar
                            : rating >= star - 0.5
                                ? faStarHalfStroke
                                : faStarEmpty
                    }
                    className="text-xs"
                />
            ))}
        </div>
    )
}

export default function CourseCard({ course }: CourseCardProps) {
    const t = useTranslations();
    const locale = useLocale();
    const userSession = useSession();
    const title = course?.title ?? t('CourseCard.untitledCourse');
    const id = course?.id ?? "";
    const price = course?.price ?? 0;
    const discountPercentage = course?.discountPercentage ?? 0;
    const hasDiscount = discountPercentage > 0;
    const discountedPrice = hasDiscount
        ? price - (price * discountPercentage) / 100 : price;
    const instructorName = course?.instructorName ?? t('CourseCard.unknownInstructor');
    const instructorImage = course?.instructorProfilePictureUrl ?? PROFILEIMAGE;
    const courseImage = course?.thumbnailUrl ?? COURSEIMAGE;
    const courseDescripition = course.description ?? ""
    const courseStatus = course.status ?? "";
    const averageRating = course.averageRating ?? null;
    const ratingCount = course.ratingCount ?? null;
    const noOfStudents = course.noOfStudents ?? null;
    const updatedAt = course.updatedAt ?? null;
    const isUserInstructorAndCreatedThisCourse = userSession.data?.userRole.includes("Instructor") &&
        course.instructorId == userSession.data.id;
    return (
        <Card className="group/card overflow-hidden rounded-radius border border-border  
            bg-card p-0 pb-4 shadow-sm transition-all duration-300 hover:shadow-lg 
            hover:-translate-y-1 cursor-pointer ">
            <Link className="py-0!"
                scroll={false} href={`/course-details/${id}/overview`}>
                {/* Thumbnail */}
                <CardHeader className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={courseImage}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                        />
                        {/* Level badge */}
                        {/* {course?.level && (
                                <span className="absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-(--primary-color) border border-(--primary-color)">
                                {course.level}
                                </span>
                                )} */}
                    </div>
                </CardHeader>
                <CardContent className="px-4 flex flex-col gap-3">
                    {/* Title */}
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover/card:text-(--primary-color) transition-colors leading-snug">
                        {course?.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="relative h-5 w-5 rounded-full border border-border overflow-hidden flex items-center justify-center bg-(--primary-light) text-(--primary-color) text-xs font-bold shrink-0">
                                {instructorImage ? (
                                    <Image
                                        src={instructorImage}
                                        alt={instructorName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    instructorName.charAt(0) || "U"
                                )}
                            </div>
                            <p className="text-xs text-(--primary-color) font-medium truncate">
                                {instructorName}
                            </p>
                        </div>
                        {hasDiscount && <div>
                            <span className="text-xs font-semibold text-(--success)">
                                {t('CourseCard.discountOff', { percent: discountPercentage })}
                            </span>
                        </div>}
                    </div>

                    {/* Rating */}
                    {averageRating != null && (
                        <div className="flex items-center gap-1.5 text-xs">
                            <span className="font-bold text-(--warning)">
                                {Number(averageRating).toFixed(1)}
                            </span>
                            <StarRating rating={averageRating} />
                            {course?.ratingCount != null && (
                                <span className="text-(--text-muted)">
                                    ({averageRating.toLocaleString()})
                                </span>
                            )}
                        </div>
                    )}

                    {/* Meta: duration, lectures, students */}
                    {/* <div className="flex items-center gap-3 text-xs text-(--text-secondary) flex-wrap">
                            {course?.duration && (
                                <span className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faClock} className="text-[10px]" />
                                    {course.duration}
                                </span>
                            )}
                            {course?.lecturesCount != null && (
                                <span className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faChalkboardUser} className="text-[10px]" />
                                    {course.lecturesCount} lectures
                                </span>
                            )}
                            {course?.noOfStudents != null && (
                                <span className="flex items-center gap-1">
                                    {course.noOfStudents.toLocaleString()}k
                                </span>
                            )}
                        </div> */}

                    {/* Tags */}
                    {/* {course?.tags && course.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {course.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2.5 py-0.5 rounded-full border border-(--border) text-(--text-secondary) bg-(--input-background)"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )} */}

                    {/* Divider */}

                </CardContent>
            </Link>



            <CardFooter className="border-t border-border px-3 pt-3 pb-0 flex flex-col gap-2">
                {/* Price + Add button */}
                <div className="flex items-center justify-between gap-2 w-full min-h-8">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-bold text-foreground">
                            ${hasDiscount ? discountedPrice?.toFixed(2) : price.toFixed(2)}
                        </span>
                        {hasDiscount && (
                            <>
                                <span className="text-xs text-(--text-muted) line-through">
                                    ${price.toFixed(2)}
                                </span>

                            </>
                        )}
                    </div>

                    {/* Always reserve space — invisible placeholder when instructor owns the course */}
                    <div className="shrink-0 min-w-15 flex justify-end">
                        {!isUserInstructorAndCreatedThisCourse
                            ? <AddToCartBtn courseId={course.id!} />
                            : <span className="text-xs font-medium text-(--primary-color)
                                   bg-(--primary-light) px-2.5 py-1 rounded-full whitespace-nowrap">
                                {t('CourseCard.yourCourse')}
                            </span>
                        }
                    </div>
                </div>

                {/* Updated at */}
                {updatedAt && (
                    <p className="text-[10px] text-(--text-muted) flex items-center gap-1">
                        <FontAwesomeIcon icon={faSignal} className="text-[10px]" />
                        {t('CourseCard.updatedOn', {
                            date: new Date(updatedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'long', year: 'numeric' })
                        })}
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}