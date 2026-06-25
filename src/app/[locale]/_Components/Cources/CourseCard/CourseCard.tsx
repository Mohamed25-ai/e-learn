// import {
//     Card,
//     CardAction,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,

// } from "@/components/ui/card"
// import { CourseCardProps } from "./courcecard.typs"
// import Image from "next/image"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { Button } from "@/components/ui/button";

// export default function CourseCard({ course }: CourseCardProps) {
//     const progress = 65;
//     const remainingTime = "4h 30m remaining";
//     const hasImage = course.instructorImage;
//     return (
//         <Card className="group/card  overflow-hidden rounded-(--radius) border border-border bg-card p-0 shadow-sm transition-all duration-300 hover:shadow-lg">
//             <CardHeader className="p-0">
//                 <div className="relative aspect-video w-full overflow-hidden">
//                     <Image
//                         src={course?.thumbnail || "/images/course-placeholder.png"}
//                         alt={course?.title || "Course image"}
//                         fill
//                         className="object-cover transition-transform duration-300 group-hover/card:scale-105"
//                     />
//                 </div>
//             </CardHeader>

//             <CardContent className="group/card space-y-3 p-4">
//                 <CardTitle className="px-0.5 line-clamp-2 text-sm font-semibold text-foreground group-hover/card:text-(--primary-color) transition-colors">
//                     {course?.title}
//                 </CardTitle>

//                 <CardDescription className="line-clamp-2 text-xs text-(--text-secondary)">
//                     {course?.description}
//                 </CardDescription>

//                 <div className="flex items-center gap-x-2">
//                     <div className="relative h-6 w-6 rounded-full border border-border overflow-hidden flex items-center justify-center bg-(--primary-light) text-(--primary-color) text-xs font-bold">
//                         {hasImage ? (
//                             <Image
//                                 src={course.instructorImage ?? ""}
//                                 alt={course.instructorName}
//                                 fill
//                                 className="object-cover"
//                             />
//                         ) : (
//                             course?.instructorName?.charAt(0) || "U"
//                         )}
//                     </div>

//                     <p className="text-xs font-medium text-(--text-secondary)">
//                         {course?.instructorName || "Dr. Angela Yu"}
//                     </p>
//                 </div>

//                 <div className="flex items-center gap-2 text-xs">
//                     <span className="font-semibold text-(--warning)">
//                         {course?.averageRating ?? "0.0"}
//                     </span>
//                     <span className="text-(--text-muted)">Rating</span>
//                 </div>

//                 <div className="space-y-1 pt-2">
//                     <div className="flex items-center justify-between text-xs">
//                         <span className="text-(--text-secondary)">Progress</span>
//                         <span className="font-semibold text-foreground">{progress}%</span>
//                     </div>

//                     <div className="h-2 w-full rounded-full bg-border">
//                         <div
//                             className="h-full rounded-full bg-(--primary-color) transition-all"
//                             style={{ width: `${progress}%` }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-(--text-muted)">
//                     <span>{remainingTime}</span>
//                 </div>
//             </CardContent>

//         </Card>
//     );
// }
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { CourseCardProps } from "./courcecard.typs"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faCartShopping, faSignal, faChalkboardUser } from "@fortawesome/free-solid-svg-icons"
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons"

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
        ? price - (price * discountPercentage) / 100
        : price;

    const instructorName = course?.instructorName ?? "Unknown Instructor";
    const instructorImage = course?.instructorProfilePictureUrl??"";

    const slug = title.toLowerCase().replace(/\s+/g, "-");
    return (
        <Link href={`/courses/${course.id}-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Card className="group/card overflow-hidden rounded-(--radius) border border-border bg-card p-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">

                {/* Thumbnail */}
                <CardHeader className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={course?.thumbnail || "/images/course-placeholder.png"}
                            alt={course?.title || "Course image"}
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
                                    src={course.instructorProfilePictureUrl??""}
                                    alt={course.instructorName}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                course?.instructorName?.charAt(0) || "U"
                            )}
                        </div>
                        <p className="text-xs text-(--primary-color) font-medium truncate">
                            {course?.instructorName}
                        </p>
                    </div>

                    {/* Rating */}
                    {course?.averageRating != null && (
                        <div className="flex items-center gap-1.5 text-xs">
                            <span className="font-bold text-(--warning)">
                                {Number(course.averageRating).toFixed(1)}
                            </span>
                            <StarRating rating={course.averageRating} />
                            {course?.ratingCount != null && (
                                <span className="text-(--text-muted)">
                                    ({course.ratingCount.toLocaleString()})
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
                    {course?.updatedAt && (
                        <p className="text-[10px] text-(--text-muted) flex items-center gap-1">
                            <FontAwesomeIcon icon={faSignal} className="text-[10px]" />
                            Updated {new Date(course.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    )}

                </CardContent>
            </Card>
        </Link>
    )
}