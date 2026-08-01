"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { AccordionDemoProps } from "./Accordion.demo.types"
import {
    faCirclePlay,
    faFile,
    faFileLines,
    faFilePdf,
    faImage,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouter } from "@/i18n/navigation";
import AccordionDemoInPlay from "./AccordionDemoInPlay";
import { useAppDispatch } from "@/hooks/hooks";
import { setLessonId, setSelectedLesson, setSelectedLessonSection, setSelectedLessonUrl } from "@/store/redux/courselearninig/courselearning.slice";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

const fileIcons: Record<string, IconDefinition> = {
    mp4: faCirclePlay,
    mov: faCirclePlay,
    avi: faCirclePlay,
    png: faImage,
    jpg: faImage,
    jpeg: faImage,
    gif: faImage,
    webp: faImage,
    pdf: faFilePdf,
};

export function AccordionDemo({ contentData, section, inPlay }: AccordionDemoProps) {
    const [accordionValue, setAccordionValue] = useState("");
    const dispatch = useAppDispatch();
    const sectionId = section.id ?? "";
    const locale = useLocale();
    const isOpen = accordionValue === sectionId;

    function handleSelectedLesson(sectionId: string, lessionId: string, lessionUrl: string) {
        dispatch(setSelectedLesson({ sectionId: sectionId, lessionId: lessionId }));
        dispatch(setSelectedLessonUrl({ lessionId: lessionId, lessionUrl: lessionUrl }))
        dispatch(setSelectedLessonSection(section.id))
        dispatch(setLessonId(lessionId));
    }
    useEffect(() => {

        
    }, [])
    return (
        <div dir={locale === "ar" && "rtl" || ""}>
            {!inPlay && <Accordion
                type="single"
                collapsible
                key={section.id}
                onValueChange={setAccordionValue}
                className={`w-full ${inPlay ? "w-full" : "md:w-3/4"}`}
            >
                <AccordionItem
                    value={sectionId}
                    className={`border-2 border-border overflow-hidden ${!inPlay && "my-2 rounded-xl"}`}
                >
                    {/* Trigger */}
                    <AccordionTrigger
                        className={`${inPlay && "customaccordiontrigger"} px-4 py-3 outline-none 
                            focus-visible:ring-0 transition-colors duration-200
                                        hover:no-underline
                                        ${isOpen
                                ? 'bg-(--primary-light)'
                                : 'bg-white hover:bg-(--input-background)'
                            }`}
                    >
                        <div className="flex items-start gap-3 text-right">
                            <FontAwesomeIcon
                                icon={faFileLines}
                                className={`mt-0.5 text-lg shrink-0 transition-colors duration-200
                                        ${isOpen
                                        ? 'text-(--primary-color)'
                                        : 'text-(--text-secondary)'
                                    }`}
                            />
                            <div className="flex flex-col gap-0.5">
                                <h3 className={`text-sm font-semibold transition-colors duration-200
                                ${isOpen
                                        ? 'text-(--primary-color)'
                                        : 'text-foreground'
                                    }`}>
                                    {section.title || ""}
                                </h3>
                                <span className="text-xs text-(--text-muted)">
                                    {contentData.length} lectures
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>

                    {/* Content items */}
                    <div className="divide-y divide-border">
                        {!inPlay && contentData.map((content) => {
                            const urlExtension = content.url.split(".").pop()?.toLowerCase();
                            const icon = fileIcons[urlExtension ?? ""] ?? faFile;

                            return (
                                <div key={content.id}>
                                    <Link onClick={() => handleSelectedLesson(section.id, content.id, content.url)}
                                        href={`/course-learn/${section.courseId}/play?lessonId=${content.id}`}>
                                        <AccordionContent
                                            className="p-0 bg-white"
                                        >
                                            <div className="flex items-center justify-between gap-3 px-4 py-3
                                                    hover:bg-(--primary-light) group/item
                                                    transition-colors duration-200 cursor-pointer">

                                                <div className="flex items-center gap-3">
                                                    <FontAwesomeIcon
                                                        icon={icon}
                                                        className="text-(--text-secondary) group-hover/item:text-(--primary-color)
                                                            transition-colors duration-200 shrink-0"
                                                    />
                                                    <span className="text-sm text-(--text-secondary) group-hover/item:text-(--primary-color)
                                                            transition-colors duration-200">
                                                        {content.title || ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </AccordionItem>
            </Accordion>}
            {inPlay && <AccordionDemoInPlay contentData={contentData} section={section} inPlay={inPlay} />}
        </div>
    )
}