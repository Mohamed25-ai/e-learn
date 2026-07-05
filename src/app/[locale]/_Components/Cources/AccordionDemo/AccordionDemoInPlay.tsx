"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AccordionDemoInPlayProps, AccordionDemoProps } from './Accordion.demo.types'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faCirclePlay, faFile, faFileLines, faFilePdf, faImage, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect, useState } from 'react';
import { setLessonId, setSelectedLesson, setSelectedLessonSection, setSelectedLessonUrl, steInitialState } from '@/store/redux/courselearninig/courselearning.slice';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

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

export default function AccordionDemoInPlay({ contentData, section, inPlay }: AccordionDemoProps) {
    const courseLearningStore = useAppSelector((state) => state.courseLearning);
    const dispatch = useAppDispatch();
    const locale=useLocale();
    const router=useRouter();
    const searchParams=useSearchParams();
    const [accordionValue, setAccordionValue] = useState("");
    const isOpen = accordionValue === section.id;
    function setSelectedContent(sectionId: string, lessonId: string, lessionUrl: string) {
        if(searchParams.get("lessonId")==lessonId){
            return
        }
        dispatch(steInitialState());
        const params=new URLSearchParams(searchParams.toString())
        dispatch(setSelectedLessonUrl({ lessionId: lessonId, lessionUrl: lessionUrl }));
        dispatch(setSelectedLesson({ sectionId: sectionId, lessionId: lessonId }));
        dispatch(setSelectedLessonSection(sectionId));
        dispatch(setLessonId(lessonId));
        params.set("lessonId",lessonId.toString());
        router.push(`?${params.toString()}`)
    }

    useEffect(() => {
        setAccordionValue(courseLearningStore.lessonSection);
    }, [courseLearningStore.lessonSection])

    return (
        <div dir={locale==="ar"&&"rtl"||""}>
            <Accordion
                type="single"
                collapsible
                defaultValue={courseLearningStore.lessonSection}
                onValueChange={setAccordionValue}
                className={`w-full ${inPlay ? "w-full" : "md:w-3/4"}`}
            >
                <AccordionItem
                    key={section.id}
                    value={section.id}
                    className={`border-2 border-border overflow-hidden ${!inPlay && "my-2 rounded-xl"}`}
                >
                    {/* Trigger */}
                    <AccordionTrigger
                        className={`${inPlay && "customaccordiontrigger"} px-4 py-3 outline-none focus-visible:ring-0 transition-colors duration-200
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
                        {inPlay && contentData.map((content) => {
                            const urlExtension = content.url.split(".").pop()?.toLowerCase();
                            const icon = fileIcons[urlExtension ?? ""] ?? faFile;
                            const openContent = content.id == courseLearningStore.selectedLesson[section.id];
                            return (
                                <div key={content.id || ""}>
                                    <AccordionContent
                                        className={`p-0 ${openContent ? " bg-(--primary-color) " : "bg-white "} `}
                                        onClick={() => setSelectedContent(section.id, content.id, content.url)}
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
                                </div>
                            );
                        })}
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}