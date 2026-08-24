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
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
const selectValues = [
    { label: "All", value: "All" },
    { value: "Title", label: "Title" },
    { value: "Price", label: "Price" },
    { value: "AverageRating", label: "Average Rating" },
    { value: "NoOfStudents", label: "Number Of Students" }
]
export function FilterEnrolledCourses() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams()
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
        <Select disabled={isPending} onValueChange={handleGetFilterValue}  >
            <SelectTrigger className="w-full  bg-white py-5">
                <div className="flex w-full items-center justify-between">
                    <SelectValue placeholder="Filter" />
                    {isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                </div>
            </SelectTrigger>
            <SelectContent className="">
                <SelectGroup>
                    <SelectLabel>Filter</SelectLabel>
                    {selectValues.map((values) => (
                        <SelectItem key={values.value} value={values.value}>{values.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
