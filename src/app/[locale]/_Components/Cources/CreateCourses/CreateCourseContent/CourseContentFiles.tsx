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
        { value: "Pdf", label: "Pdf", faIcon: <FontAwesomeIcon size={"xl"} icon={faFile} /> },
        { value: "Image", label: "Image", faIcon: <FontAwesomeIcon size={"xl"} icon={faImage} /> },
    ];
export default function CourseContentFiles() {
    return (
        <div className="grid grid-cols-3 gap-3">
            {contentTypes.map(({ value, label, faIcon }) => {
                return (
                    <button
                        key={value}
                        type="button"
                        className={[
                            "flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200 bg-card",
                        ].join(" ")}
                    >
                        <span className='text-(--primary-color)'>{faIcon}</span>
                        <span className='text-foreground'>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
