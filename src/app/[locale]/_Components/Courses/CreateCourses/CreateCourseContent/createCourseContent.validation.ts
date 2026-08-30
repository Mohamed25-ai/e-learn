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
const MAX_FILE_SIZE = 100 * 1024 * 1024;
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
        if(file.size>MAX_FILE_SIZE){
            return "Maximum size is 100 MB";
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