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






export function CategoryCombobox({ value, onChange, selectedLabel,
    categoriesData, sectionsData, isStepone, isStepThree, isContentAddedBefore }: CategoryComboboxProps) {
    const [open, setOpen] = useState(false);
    const locale = useLocale();
    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    {(isStepone || isStepThree) && (
                        <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            disabled={isStepThree&&isContentAddedBefore}
                            aria-expanded={open}
                            className={cn(
                                "INPUT_STYLE h-11 w-full justify-between bg-card shadow-none",
                                "hover:bg-card hover:border-(--primary-color)",
                                "focus-visible:ring-0 focus-visible:border-(--primary-color)"
                            )}
                        >
                            <span className="truncate text-left">
                                {selectedLabel ||
                                    (locale == "en"
                                        ? isStepone
                                            ? "Select category"
                                            : "Select Section"
                                        : isStepone
                                            ? "اختر الفئة"
                                            : "اختر الجزء")}
                            </span>

                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    )}
                </PopoverTrigger>

                <PopoverContent className="w-(--radix-popover-trigger-width) p-2 rounded-xl border border-border bg-card shadow-lg">
                    <Command className="bg-card">
                        {isStepone && (
                            <CommandInput
                                placeholder="Search category..."
                                className="h-10 border border-border rounded-lg mb-2"
                            />
                        )}

                        {isStepThree && (
                            <CommandInput
                                placeholder="Search section..."
                                className="h-10 border border-border rounded-lg mb-2"
                            />
                        )}

                        <CommandList className="max-h-60 overflow-y-auto">
                            {isStepone && <CommandEmpty>No category found.</CommandEmpty>}
                            {isStepThree && <CommandEmpty>No Sections found.</CommandEmpty>}

                            <CommandGroup className="space-y-2 p-0">
                                {isStepone &&
                                    categoriesData?.map((category) => (
                                        <CommandItem
                                            key={category.id}
                                            value={`${category.name} ${category.id}`}
                                            onSelect={() => {
                                                onChange(category.id);
                                                setOpen(false);
                                            }}
                                            className={cn(
                                                "cursor-pointer rounded-lg px-3 py-3 transition-colors",
                                                "data-[selected=true]:bg-(--primary-light) data-[selected=true]:text-(--primary-color)",
                                                value === category.id && "bg-(--primary-light) text-(--primary-color)"
                                            )}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === category.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <span className="truncate">{category.name}</span>
                                        </CommandItem>
                                    ))}

                                {isStepThree &&
                                    sectionsData?.map((section) => (
                                        <CommandItem
                                            key={section.id}
                                            value={`${section.title} ${section.id}`}
                                            onSelect={() => {
                                                onChange(section.id);
                                                setOpen(false);
                                            }}
                                            className={cn(
                                                "cursor-pointer rounded-lg px-3 py-3 transition-colors",
                                                "data-[selected=true]:bg-(--primary-light) data-[selected=true]:text-(--primary-color)",
                                                value === section.id && "bg-(--primary-light) text-(--primary-color)"
                                            )}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === section.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <span className="truncate">{section.title}</span>
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