import { Card, CardContent } from "@/components/ui/card";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FEED_IMAGE from "@/assets/images/avatar.svg"
import Image from "next/image";
function transformRating(numOfStars: number) {
    const stars = Array.from({ length: numOfStars })
    return stars.map((star, i) => <FontAwesomeIcon key={i} icon={faStar} />)

}
export default function TestimonialContent() {
    return (
        <section className=" bg-white">
            <header className="flex flex-col items-center justify-center pt-3">
                <h2 className="text-4xl  font-bold leading-tight text-foreground">
                    What Our Students Say</h2>
                <p className="mt-1.5 text-sm text-(--text-secondary)">
                    Real stories from real learners</p>
            </header>
            <div className="grid gap-4 md:grid-cols-3 p-4">
                <Card className="shadow-none border rounded-xl">
                    <CardContent className="flex  gap-4">
                        <div className=" flex flex-col gap-2">
                            <span className="text-[#F59E0B]">{transformRating(5)}</span>
                            <p className="text-(--text-secondary) ">"This platform transformed my career. The courses are practical,
                                well-structured, and the instructors are top-notch. I've gained
                                skills that directly apply to my job."</p>
                            <div className="flex items-center gap-x-3 ">
                                <div className="relative h-15 w-15 rounded-full bg-amber-500">
                                    <Image className="object-contain rounded-full" fill src={FEED_IMAGE} alt="Person Feedback" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-bold">Person Name</h4>
                                    <span className="text-(--text-secondary)">Person Position</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-none border rounded-xl">
                    <CardContent className="flex  gap-4">
                        <div className=" flex flex-col gap-2">
                            <span className="text-[#F59E0B]">{transformRating(3)}</span>
                            <p className="text-(--text-secondary) ">"This platform transformed my career. The courses are practical,
                                well-structured, and the instructors are top-notch. I've gained
                                skills that directly apply to my job."</p>
                            <div className="flex items-center gap-x-3 ">
                                <div className="relative h-15 w-15 rounded-full bg-amber-500">
                                    <Image className="object-contain rounded-full" fill src={FEED_IMAGE} alt="Person Feedback" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-bold">Person Name</h4>
                                    <span className="text-(--text-secondary)">Person Position</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-none border rounded-xl">
                    <CardContent className="flex  gap-4">
                        <div className=" flex flex-col gap-2">
                            <span className="text-[#F59E0B]">{transformRating(4)}</span>
                            <p className="text-(--text-secondary) ">"This platform transformed my career. The courses are practical,
                                well-structured, and the instructors are top-notch. I've gained
                                skills that directly apply to my job."</p>
                            <div className="flex items-center gap-x-3 ">
                                <div className="relative h-15 w-15 rounded-full bg-amber-500">
                                    <Image className="object-contain rounded-full" fill src={FEED_IMAGE} alt="Person Feedback" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-bold">Person Name</h4>
                                    <span className="text-(--text-secondary)">Person Position</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
