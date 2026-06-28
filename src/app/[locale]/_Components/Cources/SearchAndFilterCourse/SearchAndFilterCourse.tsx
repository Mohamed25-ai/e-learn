"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SelectFilter } from "./SelectFilter";
import { useRef, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { SearchAndFilterCourseProps } from "./searchandfiltercourse.types";
import { Loader2 } from "lucide-react";

export function SearchAndFilterCourse({
    currentPage,
}: SearchAndFilterCourseProps) {
    const searchInput = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleSearchCourse() {
        const params = new URLSearchParams(searchParams.toString());
        const searchData = searchInput.current?.value;
        params.set("searchCourse", searchData || "");
        router.push(`?${params.toString()}`);
    }
    return (
        <div className="flex items-center p-2">
            <div className="w-2/3 md:w-3/4">
                <Field className="px-5 my-2 flex">
                    <ButtonGroup className="relative w-full">
                        <Input
                            ref={searchInput}
                            onChange={handleSearchCourse}
                            className="INPUT_STYLE bg-white py-5 pr-10"
                            placeholder="Search Courses..."
                        />
                        {/* {isPending && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />
                        )} */}
                    </ButtonGroup>
                </Field>
            </div>
            <div className="w-1/3 md:w-1/4">
                <SelectFilter />
            </div>
        </div>
    );
}