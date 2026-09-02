'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "@/i18n/navigation"
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function FilterEnrolledCourses() {
    const t = useTranslations();
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const searchParams = useSearchParams()

    const selectValues = [
        { label: t('FilterEnrolledCourses.options.all'), value: "All" },
        { value: "Title", label: t('FilterEnrolledCourses.options.title') },
        { value: "Price", label: t('FilterEnrolledCourses.options.price') },
        { value: "AverageRating", label: t('FilterEnrolledCourses.options.averageRating') },
        { value: "NoOfStudents", label: t('FilterEnrolledCourses.options.noOfStudents') }
    ]

    function handleGetFilterValue(val: string) {
        const params = new URLSearchParams(searchParams.toString());
        // if (val === "All") {
        //     params.delete("filter");
        // } else {
        //     params.set("filter", val)
        // }
        // startTransition(() => {
        //     router.push(`?${params.toString()}`);
        // });
    }

    return (
        <Select dir={locale == "ar" ? "rtl" : "ltr"} disabled={isPending} onValueChange={handleGetFilterValue}  >
            <SelectTrigger className="w-full  bg-white py-5">
                <div className="flex justify-center w-full items-center ">
                    <SelectValue placeholder={t('FilterEnrolledCourses.placeholder')} />
                    {isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                </div>
            </SelectTrigger>
            <SelectContent className="">
                <SelectGroup>
                    <SelectLabel>{t('FilterEnrolledCourses.placeholder')}</SelectLabel>
                    {selectValues.map((values) => (
                        <SelectItem key={values.value} value={values.value}>{values.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}