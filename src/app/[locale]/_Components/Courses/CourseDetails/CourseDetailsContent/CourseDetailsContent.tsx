
import CourseDeatils3Buttons from '../CourseDeatils3Buttons/CourseDeatils3Buttons';
import { CourseDetailsProps } from '../coursedetails.types';

export default function CourseDetailsContent({ data }: CourseDetailsProps) {
    return (
        <>
            <CourseDeatils3Buttons data={data} />
        </>
    )
}
