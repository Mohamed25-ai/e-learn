import CourseDetailsCurriculum from "@/app/[locale]/_Components/Courses/CourseDetailsContent/CourseDetailsCurriculum/CourseDetailsCurriculum";

type layoutProps = {
    params: Promise<{ id: string }>
}

export default async function page({params}:layoutProps) {
    const {id}=await params;
    return (
        <div>
            {<CourseDetailsCurriculum courdeId={id} withHeader inPlay={false} />}
        </div>
    )
}
