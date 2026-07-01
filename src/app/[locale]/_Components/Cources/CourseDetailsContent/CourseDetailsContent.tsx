
import { CourseDetailsProps } from '../CourseDetails/coursedetails.types';
import CourseDeatils3Buttons from '../CourseDeatils3Buttons/CourseDeatils3Buttons';

export default function CourseDetailsContent({ data }: CourseDetailsProps) {
    return (
        <>
            <CourseDeatils3Buttons data={data} />
        </>
    )
}
