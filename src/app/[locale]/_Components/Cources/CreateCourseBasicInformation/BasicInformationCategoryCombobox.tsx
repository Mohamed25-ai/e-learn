"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { CategoryComboboxProps } from "./createcoursecbasicinformation.types";
import { useLocale } from "next-intl";

type Category = {
    value: string;
    label: string;
};



const categories: Category[] = [
    { value: "3fa85f64-5717-4562-b3fc-2c963f66afa6", label: "Web Development" },
    { value: "8e12c144-9b11-4ad3-9c25-99fe1a203f01", label: "Mobile Development" },
    { value: "f6c2c5d2-3b18-49a6-8d7e-34bb1ffab124", label: "UI / UX Design" },
    { value: "b5e1d4aa-7d8b-48d7-98c1-a5dbcc81a221", label: "Data Science" },
];

export function CategoryCombobox({
    value,
    onChange,
    error,
    selectedLabel,
    data
}: CategoryComboboxProps) {
    const [open, setOpen] = useState(false);
    const locale=useLocale();
    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="INPUT_STYLE w-full justify-between shadow-none"
                    >
                        <span className="truncate">
                            {selectedLabel || `${locale=='en'?"Select category":"اختر الفئة"}`}
                        </span>
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                    <Command>
                        <CommandInput placeholder="Search category..." className="h-11" />
                        <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                                {data?.map((category) => (
                                    <CommandItem
                                        key={category.id}
                                        value={`${category.name} ${category.id}`}
                                        onSelect={() => {
                                            onChange(category.id);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === category.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <div className="flex flex-col">
                                            <span>{category.name}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

        </div>
    );
}