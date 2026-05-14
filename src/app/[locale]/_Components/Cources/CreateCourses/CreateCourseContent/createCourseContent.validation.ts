// createCourseContent.validation.ts

import { RegisterOptions } from "react-hook-form";
import { SubmitContentFormType } from "./createcoursecontent.types";

export const titleRules: RegisterOptions<SubmitContentFormType, "Title"> = {
    required: "Lesson title is required",
    minLength: {
        value: 3,
        message: "Lesson title must be at least 3 characters",
    },
    maxLength: {
        value: 100,
        message: "Lesson title must be less than 100 characters",
    },
};

export const sectionRules: RegisterOptions<SubmitContentFormType, "SectionId"> = {
    required: "Section is required",
};

export const contentTypeRules: RegisterOptions<
    SubmitContentFormType,
    "ContentType"
> = {
    required: "Content type is required",
};
// export function validateFileType(
//     file: File,
//     selectedFileType: SubmitContentFormType["ContentType"]
// ) {
//     if (selectedFileType === "Quiz") return true;

//     if (selectedFileType === "Video") {
//         return file.type.startsWith("video/");
//     }

//     if (selectedFileType === "Image") {
//         return file.type.startsWith("image/");
//     }

//     if (selectedFileType === "Document") {
//         return [
//             "application/pdf",
//             "application/msword",
//             "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             "text/plain",
//         ].includes(file.type);
//     }

//     return false;
// }
export const getFileRules = (selectedFileType: SubmitContentFormType["ContentType"]):
    RegisterOptions<SubmitContentFormType, "File"> => ({
        required: selectedFileType === "Quiz" ? false : "File is required",

        validate: (file) => {
            if (selectedFileType === "Quiz") return true;

            if (!file) return "File is required";

            if (selectedFileType === "Video" && !file.type.startsWith("video/")) {
                return "Please upload a valid video file";
            }

            if (selectedFileType === "Image" && !file.type.startsWith("image/")) {
                return "Please upload a valid image file";
            }

            if (
                selectedFileType === "Document" &&
                ![
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "text/plain",
                ].includes(file.type)
            ) {
                return "Please upload a valid document file";
            }

            return true;
        },
    });