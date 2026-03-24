'use client'

import BasicInformationForm from "./BasicInformationForm";
import { BasicInformationProps } from "./createcoursecbasicinformation.types";


export default function CreateCourseBasicInformation({setstep,data}:BasicInformationProps) {
    

    return (
        <section className="space-y-6">
            <header className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>
                <p className="text-(--text-secondary)">
                    Fill in the essential details about your course
                </p>
            </header>
                <BasicInformationForm setstep={setstep} data={data} />

        </section>
    );
}
