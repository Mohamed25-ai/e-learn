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
// export const getTitleRules = (
//     isEdit: boolean
// ): RegisterOptions<SubmitContentFormType, "Title"> => ({
//     required: isEdit ? false : "Lesson title is required",
//     minLength: {
//         value: 3,
//         message: "Lesson title must be at least 3 characters",
//     },
//     maxLength: {
//         value: 100,
//         message: "Lesson title must be less than 100 characters",
//     },
// });
export const sectionRules: RegisterOptions<SubmitContentFormType, "SectionId"> = {
    required: "Section is required",
};
// export const getSectionRules = (
//     isEdit: boolean
// ): RegisterOptions<SubmitContentFormType, "SectionId"> => ({
//     required: isEdit ? false : "Section is required",
// });
// export const contentTypeRules: RegisterOptions<
//     SubmitContentFormType,
//     "File"
// > = {
//     required: "Content type is required",
// };
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
// export const getFileRules = (): RegisterOptions<
//     SubmitContentFormType,
//     "File"
// > => ({
//     required: "File is required",

//     validate: (file) => {
//         if (!file) return "File is required";

//         const type = file.type;

//         if (type.startsWith("image/")) {
//             return true;
//         }

//         if (type.startsWith("video/")) {
//             return true;
//         }

//         if (type === "application/pdf") {
//             return true;
//         }

//         return "Only PDF, image, or video files are allowed.";
//     },
// });
export const getFileRules = (
    isEdit: boolean
): RegisterOptions<SubmitContentFormType, "File"> => ({
    required: isEdit ? false : "File is required",

    validate: (file) => {
        if (!file) {
            // No file selected during edit -> valid
            if (isEdit) return true;

            // No file selected during create -> invalid
            return "File is required";
        }

        const type = file.type;

        if (
            type.startsWith("image/") ||
            type.startsWith("video/") ||
            type === "application/pdf"
        ) {
            return true;
        }

        return "Only PDF, image, or video files are allowed.";
    },
});