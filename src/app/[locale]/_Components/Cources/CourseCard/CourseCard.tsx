import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

} from "@/components/ui/card"
import { CourseCardProps } from "./courcecard.typs"
import Image from "next/image"

export default function CourseCard({ course }: CourseCardProps) {
    const progress = 65;
    const remainingTime = "4h 30m remaining";
    const hasImage = course.instructorImage;
    console.log("aaaaaaaaaaaaa",course)
    return (
        <Card className="group/card overflow-hidden rounded-(--radius) border border-border bg-card p-0 shadow-sm transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={course?.thumbnail || "/images/course-placeholder.png"}
                        alt={course?.title || "Course image"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                    />
                </div>
            </CardHeader>

            <CardContent className="group/card space-y-3 p-4">
                <CardTitle className="line-clamp-2 text-sm font-semibold text-foreground group-hover/card:text-(--primary-color) transition-colors">
                    {course?.title}
                </CardTitle>

                <CardDescription className="line-clamp-2 text-xs text-(--text-secondary)">
                    {course?.description}
                </CardDescription>

                <div className="flex items-center gap-x-2">
                    <div className="relative h-6 w-6 rounded-full border border-border overflow-hidden flex items-center justify-center bg-(--primary-light) text-(--primary-color) text-xs font-bold">
                        {hasImage ? (
                            <Image
                                src={course.instructorImage ?? ""}
                                alt={course.instructorName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            course?.instructorName?.charAt(0) || "U"
                        )}
                    </div>

                    <p className="text-xs font-medium text-(--text-secondary)">
                        {course?.instructorName || "Dr. Angela Yu"}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-(--warning)">
                        {course?.averageRating ?? "0.0"}
                    </span>
                    <span className="text-(--text-muted)">Rating</span>
                </div>

                <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-(--text-secondary)">Progress</span>
                        <span className="font-semibold text-foreground">{progress}%</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-border">
                        <div
                            className="h-full rounded-full bg-(--primary-color) transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-(--text-muted)">
                    <span>{remainingTime}</span>
                </div>
            </CardContent>
        </Card>
    );
}
