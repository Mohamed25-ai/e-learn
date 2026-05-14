import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faCirclePlay, faFile, faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { ContentType, FilesFieldPropsType } from './createcoursecontent.types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Watch } from 'react-hook-form';
const uploadConfig: { type: string, label: string; hint: string, icon: React.ReactNode }[] = [
    { type: "Video", label: "Click to upload video", hint: "MP4, MOV, or AVI (max 2GB)", icon: <FontAwesomeIcon size={"xl"} icon={faCirclePlay} /> },
    { type: "Document", label: "Click to upload document", hint: "PDF, DOCX, or TXT (max 50MB)", icon: <FontAwesomeIcon size={"xl"} icon={faFile} /> },
    { type: "Image", label: "Click to upload image", hint: "Recommended size: 1280x720px (16:9 ratio)", icon: <FontAwesomeIcon size={"xl"} icon={faImage} /> },
    { type: "Quiz", label: "Click to upload quiz", hint: "PDF, DOCX, or TXT (max 50MB)", icon: <FontAwesomeIcon size={"xl"} icon={faFile} /> },
];
export default function FilesField({ onChange, selectedFileType, setfieldValue, isFieldHasError
    , setisFileExist, setFieldError,isContentAddedBefore }: FilesFieldPropsType) {
    const [filePreview, setfilePreview] = useState<string | null>(null)
    const [file, setfile] = useState<File | null>(null)
    const selectedConfig = uploadConfig.filter(
        (item) => item.type === selectedFileType
    );
    const disableCancel=!isContentAddedBefore
    function handleFilePreview(file: File) {
        const filePreview = URL.createObjectURL(file);
        setfilePreview(filePreview)
    }
    function handleSetFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;
        onChange(file);
        handleFilePreview(file);
        setfile(file);
        setisFileExist(true);
    }
    function handleClosePreview() {
        if (file) {
            setfieldValue("File", undefined);
            setFieldError("File", { message: "File is required" })
            setfilePreview(null);
            setfile(null)
            setisFileExist(false)
        }
    }
    return (
        <div className="relative  ">
            {file &&disableCancel&& <span
                onClick={handleClosePreview}
                className="z-50 absolute  text-foreground bg-(--error) right-0 top-0 flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition-colors"
            // style={{ backgroundColor: "", color: "var(--primary-foreground)" }}
            >
                {<FontAwesomeIcon icon={faXmark} size="sm" />}
            </span>
            }
            <Label className="LABEL_STYLE w-full  flex flex-col relative items-start gap-y-3">
                <div className="space-y-4 w-full flex justify-center items-center">
                    {selectedFileType === "Video" && filePreview && (
                        <video
                            controls
                            src={filePreview}
                            className="w-full rounded-xl border"
                        />
                    )}
                    {selectedFileType === "Image" && filePreview && (
                        <img
                            src={filePreview}
                            alt="Preview"
                            className="w-full max-h-75 object-cover rounded-xl border"
                        />
                    )}
                    {selectedFileType === "Document" && filePreview && (
                        <div className="flex items-center gap-3 rounded-xl border p-4">
                            <FontAwesomeIcon icon={faFile} />
                            <span>{setfile.name ?? ""}</span>
                        </div>
                    )}
                    {selectedFileType === "Quiz" && filePreview && (
                        <div className="rounded-xl border border-dashed p-6 text-center">
                            Quiz Builder Here
                        </div>
                    )}
                </div>
                {!filePreview && <Label className={` ${!isContentAddedBefore&& "hover:border-(--primary-color)"} ${isContentAddedBefore?" cursor-no-drop ":" cursor-pointer "}  w-full flex flex-col justify-center rounded-2xl border gap-y-1  border-dashed items-center py-6 px-4 transition-colors`}>
                    {selectedConfig && (
                        selectedConfig.map((conf) => (
                            <div key={conf.type} className={`${isContentAddedBefore&& "opacity-40"} flex flex-col items-center gap-2 text-center`}>
                                {conf.icon}
                                <span>{conf.label}</span>
                                <span className="text-sm text-(--text-muted)">
                                    {conf.hint}
                                </span>
                            </div>
                        ))
                    )}
                    <Input
                        type="file"
                        className="hidden"
                        disabled={isContentAddedBefore}
                        onChange={(e) => handleSetFile(e)}
                    />
                </Label>}
            </Label>
        </div>
    );
}
