'use client'

import { useTranslations } from "next-intl";
import BasicInformationForm from "./BasicInformationForm";
import { BasicInformationProps } from "./createcoursecbasicinformation.types";


export default function CreateCourseBasicInformation({ data,setSectionId }: BasicInformationProps) {
    const t=useTranslations("Course");

    return (
        <section className="space-y-6 px-5 md:px-0">
            <header className="space-y-2 md:w-3/4 mx-auto">
                <h2 className="text-2xl font-bold text-foreground">
                    {t("createcourse.basicInformation.heading")}
                </h2>
                <p className="text-(--text-secondary)">
                    {t("createcourse.basicInformation.subheading")}
                </p>
            </header>
            <BasicInformationForm setSectionId={setSectionId} data={data} />

        </section>
    );
}
