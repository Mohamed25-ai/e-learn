import STATIC_COURSE_IMAGE from "@/assets/images/static_product_image.jpg"
import { Card, CardContent } from "@/components/ui/card";
import { CartItemsProps } from "./cart.types";
import Image from "next/image";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveCourseBtn from "./RemoveCourseBtn";

export default function CartItems({ BasketItems }: CartItemsProps) {
    return (
        <div className="w-full lg:w-3/4 flex flex-col gap-3">
            {!BasketItems.length ? <div>
                <h2 className="text-foreground text-2xl font-bold flex items-center justify-center">Your Cart Is Empty</h2>
            </div> : <>
                {BasketItems.map((item) => (
                    <Card key={item.courseId}
                        className="border-2 border-border shadow-none
                               bg-white group/removeicon rounded-2xl overflow-hidden
                               transition-all duration-200 hover:shadow-sm">
                        <CardContent className="p-4 flex flex-col sm:flex-row
                                            justify-between items-start sm:items-center gap-4">

                            {/* Left — image + info */}
                            <div className="flex gap-4 flex-1 min-w-0">

                                {/* Thumbnail */}
                                <div className="relative w-32 sm:w-40 h-20 shrink-0 rounded-xl overflow-hidden">
                                    <Image
                                        fill
                                        className="object-cover"
                                        src={STATIC_COURSE_IMAGE}
                                        alt={item.courseTitle}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex flex-col gap-1.5 min-w-0">
                                    <span className="bg-(--primary-light) text-(--primary-color)
                                                 text-xs font-medium px-3 py-0.5 rounded-full w-fit">
                                        Web Development
                                    </span>
                                    <h3 className="text-foreground font-semibold text-base
                                               leading-snug line-clamp-2">
                                        {item.courseTitle}
                                    </h3>
                                    <span className="text-xs text-(--text-secondary) truncate">
                                        Instructor name
                                    </span>
                                </div>
                            </div>

                            {/* Right — price + delete */}
                            <div className="flex items-center gap-4 shrink-0">
                                {/* Price block */}
                                <div className="flex flex-col items-end gap-0.5">
                                    <span className="text-foreground font-bold text-base">
                                        ${item.basePrice}
                                    </span>
                                    <span className="text-xs text-(--text-muted) line-through">
                                        discount
                                    </span>
                                    <span className="text-xs font-semibold text-(--success)">
                                        discount %
                                    </span>
                                </div>

                                {/* Delete */}
                                <RemoveCourseBtn courseId={item.courseId} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </>}

        </div>
    )
}