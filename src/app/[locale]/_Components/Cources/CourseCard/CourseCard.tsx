import {
    Card,
    CardContent,
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
    const title = course?.title ?? "Untitled Course";
    const id = course?.id ?? "";
    const price = course?.price ?? 0;
    const discountPercentage = course?.discountPercentage ?? 0;
    const hasDiscount = discountPercentage > 0;
    const discountedPrice = hasDiscount
        ? price - (price * discountPercentage) / 100 : price;
    const instructorName = course?.instructorName ?? "Unknown Instructor";
    const instructorImage = course?.instructorProfilePictureUrl ??PROFILEIMAGE;
    const courseImage = course?.thumbnailUrl ?? COURSEIMAGE;
    const courseDescripition = course.description ?? ""
    const courseStatus = course.status ?? "";
    const averageRating = course.averageRating ?? null;
    const ratingCount = course.ratingCount ?? null;
    const noOfStudents = course.noOfStudents ?? null;
    const updatedAt = course.updatedAt ?? null;
    return (
        <Link href={`/coursedetails/${id}/overview`}>
            <Card className="group/card overflow-hidden rounded-(--radius) border border-border bg-card p-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
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

                <CardContent className="p-4 flex flex-col gap-3">

                    {/* Title */}
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover/card:text-(--primary-color) transition-colors leading-snug">
                        {course?.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2">
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
                    <div className="border-t border-border" />

                    {/* Price + Add button */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base font-bold text-foreground">
                                ${hasDiscount ? discountedPrice?.toFixed(2) : price.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-xs text-(--text-muted) line-through">
                                        ${price.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-semibold text-(--success)">
                                        {discountPercentage}% off
                                    </span>
                                </>
                            )}
                        </div>

                        <button className="MAIN_BUTTON text-xs px-3 py-1.5 shrink-0">
                            <FontAwesomeIcon icon={faCartShopping} />
                            Add
                        </button>
                    </div>

                    {/* Updated at */}
                    {updatedAt && (
                        <p className="text-[10px] text-(--text-muted) flex items-center gap-1">
                            <FontAwesomeIcon icon={faSignal} className="text-[10px]" />
                            Updated {new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    )}

                </CardContent>
            </Card>
        </Link>
    )
}