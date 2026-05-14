import React, { useState } from 'react'
import { ContentType, CourseContentFilesProps } from './createcoursecontent.types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faFile, faImage } from "@fortawesome/free-regular-svg-icons";


const contentTypes: {
    value: ContentType;
    label: string;
    faIcon: React.ReactNode;
}[] = [
        { value: "Video", label: "Video", faIcon: <FontAwesomeIcon size={"xl"} icon={faCirclePlay} /> },
        { value: "Document", label: "Document", faIcon: <FontAwesomeIcon size={"xl"} icon={faFile} /> },
        { value: "Image", label: "Image", faIcon: <FontAwesomeIcon size={"xl"} icon={faImage} /> },
        { value: "Quiz", label: "Quiz", faIcon: <FontAwesomeIcon size={"xl"} icon={faFile} /> },
    ];
export default function CourseContentFiles({
    onChange,
    selectedField,
    SetSelectedFieldType,
    isFileExist,
    isContentAddedBefore,
}: CourseContentFilesProps) {
    const isDisabled = isFileExist || isContentAddedBefore;

    function handleFile(value: ContentType) {
        if (!isDisabled) {
            onChange(value);
            SetSelectedFieldType(value);
        }
    }

    return (
        <div className="grid grid-cols-4 gap-3">
            {contentTypes.map(({ value, label, faIcon }) => {
                const isActive = selectedField === value;

                return (
                    <button
                        disabled={isDisabled}
                        key={value}
                        type="button"
                        onClick={() => handleFile(value)}
                        className={[
                            "flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200 bg-card",
                            isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
                            isActive
                                ? "border-(--primary-color) bg-(--primary-light) text-(--primary-color)"
                                : !isDisabled
                                    ? "border-border text-(--text-secondary) hover:border-(--primary-color) hover:text-(--primary-color)"
                                    : "border-border text-(--text-secondary)",
                        ].join(" ")}
                    >
                        {faIcon}
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
