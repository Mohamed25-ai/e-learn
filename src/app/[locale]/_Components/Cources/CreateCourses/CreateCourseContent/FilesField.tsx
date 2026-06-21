import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faCirclePlay, faFile, faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { ContentType, FilesFieldPropsType } from './createcoursecontent.types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Watch } from 'react-hook-form';
const uploadConfig: { type: string, label: string; hint: string, icon: React.ReactNode }[] = [
    { type: "Document", label: "Click to upload File", hint: "Video, Pdf, or image (max 50MB)", icon: <FontAwesomeIcon size={"xl"} icon={faFile} /> },
];
export default function FilesField({ onChange, setfieldValue, isFieldHasError,isEditContent
    , setisFileExist, setFieldError, isContentAddedBefore }: FilesFieldPropsType) {
    const [filePreview, setfilePreview] = useState<string | null>(null)
    const [file, setfile] = useState<File | null>(null)
    // const selectedConfig = uploadConfig.filter(
    //     (item) => item.type === selectedFileType
    // );
    const fileType = file?.type.split("/")[0];
    const validType=file?.type.split("/")[0]=="video"||file?.type.split("/")[0]==="image"||file?.type=="application/pdf"
    const disableCancel = !isContentAddedBefore&&validType;
    function handleFilePreview(file: File) {
        const filePreview = URL.createObjectURL(file);
        if(file.type.split("/")[0]=="video"||file.type.split("/")[0]==="image"||file.type=="application/pdf"){
            setfilePreview(filePreview)
            return
        }
        return
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
        if(isEditContent){
            setFieldError("File",{type:undefined})
        }
    }
    return (
        <div className="relative  ">
            {file && disableCancel && <span
                onClick={handleClosePreview}
                className="z-50 absolute  text-foreground bg-(--error) right-0 top-0 flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition-colors"
            // style={{ backgroundColor: "", color: "var(--primary-foreground)" }}
            >
                {<FontAwesomeIcon icon={faXmark} size="sm" />}
            </span>
            }
            <Label className="LABEL_STYLE w-full  flex flex-col relative items-start gap-y-3">
                <div className="space-y-4 w-full flex justify-center items-center">
                    {fileType === "video" && (
                        <video
                            controls
                            src={filePreview!}
                            className="w-full rounded-xl border"
                        />
                    )}
                    {fileType === "image" && (
                        <img
                            src={filePreview!}
                            className="w-full rounded-xl border"
                        />
                    )}
                    {fileType === "application" && (
                        <iframe
                            src={filePreview!}
                            className="w-full rounded-xl border"
                            height="400px"
                        >
                        </iframe>
                    )}
                </div>
                {!filePreview && <Label className={` ${!isContentAddedBefore && "hover:border-(--primary-color)"} ${isContentAddedBefore ? " cursor-no-drop " : " cursor-pointer "}  w-full flex flex-col justify-center rounded-2xl border gap-y-1  border-dashed items-center py-6 px-4 transition-colors`}>
                    {uploadConfig && (
                        uploadConfig.map((conf) => (
                            <div key={conf.type} className={`${isContentAddedBefore && "opacity-40"} flex flex-col items-center gap-2 text-center`}>
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
